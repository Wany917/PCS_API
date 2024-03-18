import { HttpContext } from '@adonisjs/core/http'
import PropertyImage from '#models/property_image'

export default class PropertyImagesController {
    async index({ response }: HttpContext) {
        try {
            const propertyImages = await PropertyImage.query()
            .with('property', (query) => {})
            return response.ok(propertyImages)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const propertyImage = await PropertyImage.query()
            .with('property', (query) => {})
                .where('id', params.id)
                .first()

            if (!propertyImage) {
                return response.notFound({ error: 'Property image not found' })
            }

            return response.ok(propertyImage)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async store({ request, response }: HttpContext) {
        try {
            const data = request.only(['propertyId', 'link'])
            const propertyImage = await PropertyImage.create(data)
            await propertyImage.load('property')
            return response.created(propertyImage)
        } catch (error) {
            return response.status(400).send({ error: 'Invalid data provided' })
        }
    }

    async update({ params, request, response }: HttpContext) {
        try {
            const propertyImage = await PropertyImage.find(params.id)
            if (!propertyImage) {
                return response.notFound({ error: 'Property image not found' })
            }
            const data = request.only(['propertyId', 'link'])
            propertyImage.merge(data)
            await propertyImage.save()
            return response.ok(propertyImage)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const propertyImage = await PropertyImage.find(params.id)
            if (!propertyImage) {
                return response.notFound({ error: 'Property image not found' })
            }
            await propertyImage.delete()
            return response.noContent()
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }
}
