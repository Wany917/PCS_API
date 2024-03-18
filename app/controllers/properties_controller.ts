import { HttpContext } from '@adonisjs/core/http'
import Property from '#models/property'

export default class PropertiesController {
    async index({ response }: HttpContext) {
        try {
            const properties = await Property.query()
                .preload('propertyImage')
                .preload('ownerPlanning')
                .preload('providerPlanning')
                .with('user', (query) => {})
                .with('society', (query) => {})
            return response.ok(properties)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const property = await Property.query()
                .preload('propertyImage')
                .preload('ownerPlanning')
                .preload('providerPlanning')
                .with('user', (query) => {})
                .with('society', (query) => {})
                .where('id', params.id)
                .first()

            if (!property) {
                return response.notFound({ error: 'Property not found' })
            }

            return response.ok(property)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async store({ request, response }: HttpContext) {
        try {
            const data = request.only([
                'type', 'name', 'address', 'country', 'squareMetersNumber', 
                'description', 'unitCost', 'hourCost', 'isdeclare', 'userId', 'societyId'
            ])
            const property = await Property.create(data)

            await property.load('propertyImage');
            await property.load('ownerPlanning');
            await property.load('providerPlanning');
            await property.load('user');
            await property.load('society');

            return response.created(property)
        } catch (error) {
            return response.status(400).send({ error: 'Invalid data provided' })
        }
    }

    async update({ params, request, response }: HttpContext) {
        try {
            const property = await Property.find(params.id)
            if (!property) {
                return response.notFound({ error: 'Property not found' })
            }
            const data = request.only([
                'type', 'name', 'address', 'country', 'squareMetersNumber', 
                'description', 'unitCost', 'hourCost', 'isdeclare', 'userId', 'societyId'
            ])
            property.merge(data)
            await property.save()
            return response.ok(property)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const property = await Property.find(params.id)
            if (!property) {
                return response.notFound({ error: 'Property not found' })
            }
            await property.delete()
            return response.noContent()
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }
}
