import { HttpContext } from '@adonisjs/core/http'
import ProviderPlanning from '#models/provider_planning'

export default class ProviderPlanningsController {
  async index({ response }: HttpContext) {
    try {
      const providerPlannings = await ProviderPlanning.query()
        .with('property', (query) => {})
        .with('providerService', (query) => {})
        .with('user', (query) => {})
        .with('society', (query) => {})
      return response.ok(providerPlannings)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const providerPlanning = await ProviderPlanning.query()
        .with('property', (query) => {})
        .with('providerService', (query) => {})
        .with('user', (query) => {})
        .with('society', (query) => {})
        .where('id', params.id)
        .first()

      if (!providerPlanning) {
        return response.notFound({ error: 'Provider planning not found' })
      }

      return response.ok(providerPlanning)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'startAt',
        'endAt',
        'isReserved',
        'propertyId',
        'providerServiceId',
        'userId',
        'societyId',
      ])
      const providerPlanning = await ProviderPlanning.create(data)
      await providerPlanning.load('property')
      await providerPlanning.load('providerService')
      await providerPlanning.load('user')
      await providerPlanning.load('society')
      return response.created(providerPlanning)
    } catch (error) {
      return response.status(400).send({ error: 'Invalid data provided' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const providerPlanning = await ProviderPlanning.find(params.id)
      if (!providerPlanning) {
        return response.notFound({ error: 'Provider planning not found' })
      }
      const data = request.only([
        'startAt',
        'endAt',
        'isReserved',
        'propertyId',
        'providerServiceId',
        'userId',
        'societyId',
      ])
      providerPlanning.merge(data)
      await providerPlanning.save()
      return response.ok(providerPlanning)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const providerPlanning = await ProviderPlanning.find(params.id)
      if (!providerPlanning) {
        return response.notFound({ error: 'Provider planning not found' })
      }
      await providerPlanning.delete()
      return response.noContent()
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
