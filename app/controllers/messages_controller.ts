import { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'

export default class MessagesController {
  async index({ response }: HttpContext) {
      try {
          const messages = await Message.query()
              .with('senderUser', (query) => {
                  query.select('id', 'name');
              })
              .with('receiverUser', (query) => {
                  query.select('id', 'name');
              })
          return response.ok(messages);
      } catch (error) {
          return response.status(500).send({ error: 'Internal server error' });
      }
  }
    async show({ params, response }: HttpContext) {
      try {
          const message = await Message.query()
              .with('senderUser', (query) => {
                  query.select('id', 'name');
              })
              .with('receiverUser', (query) => {
                  query.select('id', 'name');
              })
              .where('id', params.id)
              .first();

          if (!message) {
              return response.notFound({ error: 'Message not found' });
          }

          return response.ok(message);
      } catch (error) {
          return response.status(500).send({ error: 'Internal server error' });
      }
  }

    async store({ request, response }: HttpContext) {
        try {
            const data = request.only(['content', 'senderUserId', 'receiverUserId'])
            const message = await Message.create(data)
            await message.load('senderUser')
            await message.load('receiverUser')
            return response.created(message)
        } catch (error) {
            return response.status(400).send({ error: 'Invalid data provided' })
        }
    }

    async update({ params, request, response }: HttpContext) {
        try {
            const message = await Message.find(params.id)
            if (!message) {
                return response.notFound({ error: 'Message not found' })
            }
            const data = request.only(['content', 'senderUserId', 'receiverUserId'])
            message.merge(data)
            await message.save()
            return response.ok(message)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const message = await Message.find(params.id)
            if (!message) {
                return response.notFound({ error: 'Message not found' })
            }
            await message.delete()
            return response.noContent()
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }
}
