import { HttpContext } from '@adonisjs/core/http'
import Invoice from '#models/invoice'

export default class InvoicesController {
    async index({ response }: HttpContext) {
        try {
            const invoices = await Invoice.query()
                .preload('user')
                .preload('items')
                .preload('society')
                .preload('issuerUser')
                .preload('issuerSociety')
            return response.ok(invoices)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const invoice = await Invoice.query()
                .preload('user')
                .preload('items')
                .preload('society')
                .preload('issuerUser')
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
            const data = request.only(['amount', 'description', 'userId', 'societyId', 'issuerUserId', 'issuerSocietyId'])
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
            const data = request.only(['amount', 'description', 'userId', 'societyId', 'issuerUserId', 'issuerSocietyId'])
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
