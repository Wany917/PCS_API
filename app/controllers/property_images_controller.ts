import { HttpContext } from '@adonisjs/core/http'
import PropertyImage from '#models/property_image'
import { createPropertyImageValidator } from '#validators/property_validator'
import PropertyImagePolicy from '#policies/property_image_policy'
import Property from '#models/property'

export default class PropertyImagesController {
  async store({ params, request, response, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createPropertyImageValidator)
    const property = await Property.findOrFail(params.property_id)

    if (await bouncer.with(PropertyImagePolicy).denies('create', property)) {
      return response.forbidden('Cannot add property image.')
    }

    return PropertyImage.create({ ...payload, propertyId: property.id })
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const property = await Property.findOrFail(params.property_id)
    const propertyImage = await PropertyImage.findOrFail(params.id)

    if (await bouncer.with(PropertyImagePolicy).denies('destroy', property)) {
      return response.forbidden('Cannot destroy property image.')
    }

    await propertyImage.delete()
    return { message: 'Property Image deleted successfully' }
  }
}
