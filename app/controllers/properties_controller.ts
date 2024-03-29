import { HttpContext } from '@adonisjs/core/http'
import Property from '#models/property'
import { createPropertyValidator, updatePropertyValidator } from '#validators/property_validator'
import PropertyPolicy from '#policies/property_policy'

export default class PropertiesController {
  async index({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(PropertyPolicy).denies('view')) {
      return response.forbidden('Cannot view properties list.')
    }

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return Property.query().preload('propertyImages').paginate(page, limit)
  }

  async show({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(PropertyPolicy).denies('view')) {
      return response.forbidden('Cannot view property.')
    }

    const property = await Property.findOrFail(params.id)
    const propertyImages = await property.related('propertyImages').query()
    
    return {
      property: property,
      propertyImages: propertyImages
    }
  }
  async store({ request, response, bouncer, auth }: HttpContext) {
    const payload = await request.validateUsing(createPropertyValidator)

    if (await bouncer.with(PropertyPolicy).denies('create', payload.userId, payload.societyId)) {
      return response.forbidden('Cannot add property.')
    }

    if (payload.userId === undefined) payload.userId = auth.user?.id
    if (payload.societyId === undefined) payload.societyId = auth.user?.society?.id
    if (payload.societyId !== undefined) payload.userId = undefined
    return Property.create(payload)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const property = await Property.findOrFail(params.id)
    const payload = await request.validateUsing(updatePropertyValidator)

    if (
      await bouncer
        .with(PropertyPolicy)
        .denies('update', payload.userId, payload.societyId, property)
    ) {
      return response.forbidden('Cannot update property.')
    }

    property.merge(payload)
    await property.save()
    return property
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const property = await Property.findOrFail(params.id)

    if (await bouncer.with(PropertyPolicy).denies('destroy', property)) {
      return response.forbidden('Cannot delete property.')
    }

    await property.delete()
    return { message: 'Property deleted successfully' }
  }
}
