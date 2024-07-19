import { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'

export default class TransactionsController {
  async index({ response }: HttpContext) {
    try {
      const transactions = await Transaction.query()
        .with('user', (query) => {})
        .with('society', (query) => {})
        .with('invoice', (query) => {})
      return response.ok(transactions)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const transaction = await Transaction.query()
        .with('user', (query) => {})
        .with('society', (query) => {})
        .with('invoice', (query) => {})
        .where('id', params.id)
        .first()

      if (!transaction) {
        return response.notFound({ error: 'Transaction not found' })
      }

      return response.ok(transaction)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['amount', 'dueAt', 'paidAt', 'userId', 'societyId', 'invoiceId'])
      const transaction = await Transaction.create(data)
      return response.created(transaction)
    } catch (error) {
      return response.status(400).send({ error: 'Invalid data provided' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const transaction = await Transaction.findOrFail(params.id)
      const data = request.only(['amount', 'dueAt', 'paidAt', 'userId', 'societyId', 'invoiceId'])
      transaction.merge(data)
      await transaction.save()
      return response.ok(transaction)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const transaction = await Transaction.find(params.id)
      if (!transaction) {
        return response.notFound({ error: 'Transaction not found' })
      }
      await transaction.delete()
      return response.noContent()
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
