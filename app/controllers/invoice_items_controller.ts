import InvoiceItem from '#models/invoice_item'
import { HttpContext } from '@adonisjs/core/http'

export default class InvoiceItemsController {
  async index({ response }: HttpContext) {
    try {
      const invoiceItems = await InvoiceItem.all()
      return response.ok({ data: invoiceItems })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const invoiceItem = await InvoiceItem.find(params.id)
      if (!invoiceItem) {
        return response.notFound({ error: 'Invoice item not found' })
      }
      return response.ok({ data: invoiceItem })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = request.only(['invoice_id', 'description', 'quantity', 'price'])
      const invoiceItem = await InvoiceItem.create(payload)
      return response.created({ data: invoiceItem })
    } catch (error) {
      console.error(error)
      return response.status(400).send({ error: 'Invalid data provided' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const invoiceItem = await InvoiceItem.find(params.id)
      if (!invoiceItem) {
        return response.notFound({ error: 'Invoice item not found' })
      }
      const payload = request.only(['invoice_id', 'description', 'quantity', 'price'])
      invoiceItem.merge(payload)
      await invoiceItem.save()
      return response.ok({ data: invoiceItem })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const invoiceItem = await InvoiceItem.find(params.id)
      if (!invoiceItem) {
        return response.notFound({ error: 'Invoice item not found' })
      }
      await invoiceItem.delete()
      return response.noContent()
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
