import { HttpContext } from '@adonisjs/core/http'
import Review from '#models/review'

export default class ReviewsController {
  async index({ response }: HttpContext) {
    try {
      const reviews = await Review.query()
        .with('user', (query) => {})
        .with('providerService', (query) => {})
        .with('property', (query) => {})
      return response.ok(reviews)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const review = await Review.query()
        .with('user', (query) => {})
        .with('providerService', (query) => {})
        .with('property', (query) => {})
        .where('id', params.id)
        .first()

      if (!review) {
        return response.notFound({ error: 'Review not found' })
      }

      return response.ok(review)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['content', 'rating', 'userId', 'providerServiceId', 'propertyId'])
      const review = await Review.create(data)
      await review.load('user')
      await review.load('providerService')
      await review.load('property')
      return response.created(review)
    } catch (error) {
      return response.status(400).send({ error: 'Invalid data provided' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const review = await Review.find(params.id)
      if (!review) {
        return response.notFound({ error: 'Review not found' })
      }
      const data = request.only(['content', 'rating', 'userId', 'providerServiceId', 'propertyId'])
      review.merge(data)
      await review.save()
      return response.ok(review)
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const review = await Review.find(params.id)
      if (!review) {
        return response.notFound({ error: 'Review not found' })
      }
      await review.delete()
      return response.noContent()
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
