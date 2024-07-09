import { HttpContext } from '@adonisjs/core/http'
import Invoice from '#models/invoice'

export default class InvoicesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return Invoice.query().preload('user').paginate(page, limit)
  }

  async show({ params, response }: HttpContext) {
    try {
      const invoice = await Invoice.query()
        .preload('user')
        .preload('items')
        .preload('issuerSociety')
        .where('id', params.id)
        .first()

      if (!invoice) {
        return response.notFound({ error: 'Invoice not found' })
      }

      return response.ok(invoice)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'amount',
        'description',
        'userId',
        'societyId',
        'issuerUserId',
        'issuerSocietyId',
      ])
      const invoice = await Invoice.create(data)
      return response.created(invoice)
    } catch (error) {
      return response.status(400).send({ error: 'Invalid data provided' })
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
        'description',
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
  async pay({ response }: HttpContext) {
    try {
      return response.ok({ message: 'Invoice paid successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
  async send({ response }: HttpContext) {
    try {
      return response.ok({ message: 'Invoice sent successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
  async sendReminder({ response }: HttpContext) {
    try {
      return response.ok({ message: 'Payment reminder sent successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
  async generatePDF({ response }: HttpContext) {
    try {
      return response.ok({ message: 'PDF generated successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
  async import({ response }: HttpContext) {
    try {
      return response.ok({ message: 'Invoices imported successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
  async export({ response }: HttpContext) {
    try {
      return response.ok({ message: 'Invoices exported successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
  async search({ response }: HttpContext) {
    try {
      return response.ok({ message: 'Invoices search results' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
  async stats({ response }: HttpContext) {
    try {
      return response.ok({ message: 'Invoice statistics' })
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
