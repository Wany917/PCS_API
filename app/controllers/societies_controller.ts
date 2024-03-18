import { HttpContext } from '@adonisjs/core/http'
import Society from '#models/society'

export default class SocietiesController {
    async index({ response }: HttpContext) {
        try {
            const societies = await Society.query()
                .with('user', (query) => {})
                .with('property', (query) => {})
                .with('providerServices', (query) => {})
            return response.ok(societies)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const society = await Society.query()
                .with('user', (query) => {})
                .with('property', (query) => {})
                .with('providerServices', (query) => {})
                .where('id', params.id)
                .first()

            if (!society) {
                return response.notFound({ error: 'Society not found' })
            }

            return response.ok(society)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async store({ request, response }: HttpContext) {
        try {
            const data = request.only(['name', 'siren', 'address', 'userId', 'propertyId'])
            const society = await Society.create(data)
            await society.load('user')
            await society.load('property')
            await society.load('providerServices')
            return response.created(society)
        } catch (error) {
            return response.status(400).send({ error: 'Invalid data provided' })
        }
    }

    async update({ params, request, response }: HttpContext) {
        try {
            const society = await Society.find(params.id)
            if (!society) {
                return response.notFound({ error: 'Society not found' })
            }
            const data = request.only(['name', 'siren', 'address', 'userId', 'propertyId'])
            society.merge(data)
            await society.save()
            return response.ok(society)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const society = await Society.find(params.id)
            if (!society) {
                return response.notFound({ error: 'Society not found' })
            }
            await society.delete()
            return response.noContent()
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }
}
