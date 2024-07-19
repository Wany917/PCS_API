import { HttpContext } from '@adonisjs/core/http'
import Invoice from '#models/invoice'
import { DateTime } from 'luxon'
import User from '#models/user'
import Society from '#models/society'

export default class InvoicesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return Invoice.query()
      .preload('user')
      .preload('issuerUser')
      .preload('issuerSociety')
      .paginate(page, limit)
  }

  async show({ params, response }: HttpContext) {
    try {
      const invoiceId = Number(params.id)

      if (Number.isNaN(invoiceId)) {
        return response.badRequest({ error: 'Invalid invoice ID' })
      }

      const invoice = await Invoice.query()
        .preload('user')
        .preload('issuerUser')
        .preload('items')
        .preload('issuerSociety')
        .where('id', invoiceId)
        .firstOrFail()

      return response.ok(invoice)
    } catch (error) {
      console.error('Error in invoice show method:', error)
      return response.internalServerError({
        error: 'Internal server error',
        message: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'amount',
        'userId',
        'societyId',
        'issuerUserId',
        'issuerSocietyId',
        'dueAt',
      ])

      // Vérifiez que dueAt est présent et valide
      if (!data.dueAt) {
        return response.status(400).send({ error: 'dueAt is required' })
      }
      data.dueAt = DateTime.fromISO(data.dueAt)
      if (!data.dueAt.isValid) {
        return response.status(400).send({ error: 'Invalid dueAt format' })
      }

      // Vérifiez que l'utilisateur existe
      const user = await User.find(data.userId)
      if (!user) {
        return response.status(400).send({ error: 'Invalid userId' })
      }

      // Vérifiez que la société émettrice existe
      const issuerSociety = await Society.find(data.issuerSocietyId)
      if (!issuerSociety) {
        return response.status(400).send({ error: 'Invalid issuerSocietyId' })
      }

      // Vérifiez que l'utilisateur émetteur existe (si fourni)
      if (data.issuerUserId) {
        const issuerUser = await User.find(data.issuerUserId)
        if (!issuerUser) {
          return response.status(400).send({ error: 'Invalid issuerUserId' })
        }
      }

      const invoice = await Invoice.create(data)
      return response.created(invoice)
    } catch (error) {
      console.error('Invoice creation error:', error)
      return response.status(400).send({ error: 'Invalid data provided', details: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const invoice = await Invoice.find(params.id)
      if (!invoice) {
        return response.notFound({ error: 'Invoice not found' })
      }
      const data = request.only([
        'amount',
        'userId',
        'societyId',
        'issuerUserId',
        'issuerSocietyId',
      ])
      invoice.merge(data)
      await invoice.save()
      return response.ok(invoice)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const invoice = await Invoice.find(params.id)
      if (!invoice) {
        return response.notFound({ error: 'Invoice not found' })
      }
      await invoice.delete()
      return response.noContent()
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
