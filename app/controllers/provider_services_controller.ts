import { HttpContext } from '@adonisjs/core/http'
import ProviderService from '#models/provider_service'

export default class ProviderServicesController {
  async index({ response }: HttpContext) {
    try {
      const providerServices = await ProviderService.query()
        .with('providerPlanning', (query) => {})
        .with('user', (query) => {})
        .with('society', (query) => {})
      return response.ok(providerServices)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const providerService = await ProviderService.query()
        .with('providerPlanning', (query) => {})
        .with('user', (query) => {})
        .with('society', (query) => {})
        .where('id', params.id)
        .first()

      if (!providerService) {
        return response.notFound({ error: 'Provider service not found' })
      }

      return response.ok(providerService)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'name',
        'description',
        'unitCost',
        'hourCost',
        'userId',
        'societyId',
      ])
      const providerService = await ProviderService.create(data)
      await providerService.load('user')
      await providerService.load('society')
      return response.created(providerService)
    } catch (error) {
      return response.status(400).send({ error: 'Invalid data provided' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const providerService = await ProviderService.find(params.id)
      if (!providerService) {
        return response.notFound({ error: 'Provider service not found' })
      }
      const data = request.only([
        'name',
        'description',
        'unitCost',
        'hourCost',
        'userId',
        'societyId',
      ])
      providerService.merge(data)
      await providerService.save()
      return response.ok(providerService)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const providerService = await ProviderService.find(params.id)
      if (!providerService) {
        return response.notFound({ error: 'Provider service not found' })
      }
      await providerService.delete()
      return response.noContent()
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
