import { HttpContext } from '@adonisjs/core/http'
import OwnerPlanning from '#models/owner_planning'

export default class OwnerPlanningsController {
  async index({ response }: HttpContext) {
    try {
        const ownerPlannings = await OwnerPlanning.query()
            .with('property', (query) => {})
            .with('user', (query) => {})
            .with('society', (query) => {})
            
        return response.ok(ownerPlannings);
    } catch (error) {
        console.error(error);
        return response.status(500).send({ error: 'Internal server error' });
    }
}

  async show({ params, response }: HttpContext) {
      try {
          const ownerPlanning = await OwnerPlanning.query()
              .with('property', (query) => {})
              .with('user', (query) => {})
              .with('society', (query) => {})
              .where('id', params.id)
              .first();

          if (!ownerPlanning) {
              return response.notFound({ error: 'Owner planning not found' });
          }

          return response.ok(ownerPlanning);
      } catch (error) {
          console.error(error);
          return response.status(500).send({ error: 'Internal server error' });
      }
  }


    async store({ request, response }: HttpContext) {
        try {
            const data = request.only(['startAt', 'endAt', 'isReserved', 'propertyId', 'userId', 'societyId'])
            const ownerPlanning = await OwnerPlanning.create(data)
            await ownerPlanning.load('property')
            await ownerPlanning.load('user')
            await ownerPlanning.load('society')
            return response.created(ownerPlanning)
        } catch (error) {
            return response.status(400).send({ error: 'Invalid data provided' })
        }
    }

    async update({ params, request, response }: HttpContext) {
        try {
            const ownerPlanning = await OwnerPlanning.find(params.id)
            if (!ownerPlanning) {
                return response.notFound({ error: 'Owner planning not found' })
            }
            const data = request.only(['startAt', 'endAt', 'isReserved', 'propertyId', 'userId', 'societyId'])
            ownerPlanning.merge(data)
            await ownerPlanning.save()
            return response.ok(ownerPlanning)
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const ownerPlanning = await OwnerPlanning.find(params.id)
            if (!ownerPlanning) {
                return response.notFound({ error: 'Owner planning not found' })
            }
            await ownerPlanning.delete()
            return response.noContent()
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }
}
