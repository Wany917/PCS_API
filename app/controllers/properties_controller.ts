import { HttpContext } from '@adonisjs/core/http'
import Property from '#models/property'
import { createPropertyImagesValidator, createPropertyValidator, updatePropertyValidator } from '#validators/property_validator'
import PropertyPolicy from '#policies/property_policy'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import PropertyImage from '#models/property_image'

export default class PropertiesController {
  async index({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(PropertyPolicy).denies('view')) {
      return response.forbidden('Cannot view properties list.')
    }

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return Property.query().preload('propertyImages').paginate(page, limit)
  }

  async store({ request, response, bouncer, auth }: HttpContext) {
    const payload = await request.validateUsing(createPropertyValidator)
    const property = await Property.create(payload);

    const { images } = await request.validateUsing(createPropertyImagesValidator)

    if (images) {
      for (let image of images) {
        const imageName = `${cuid()}.${image.extname}`
        await image?.move(app.makePath('uploads/properties'), {
          name: imageName
        })

        await PropertyImage.create({
          link: imageName,
          propertyId: property.id
        });
      }
    }

    return response.json(property);
  }

  async show({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(PropertyPolicy).denies('view')) {
      return response.forbidden('Cannot view property.')
    }

    const property = await Property.findOrFail(params.id)
    await property.load('propertyImages')

    return property
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
    return { message: 'Property updated successfully' }
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const property = await Property.findOrFail(params.id)

    if (await bouncer.with(PropertyPolicy).denies('delete', property)) {
      return response.forbidden('Cannot delete property.')
    }

    await property.delete()
    return { message: 'Property deleted successfully' }
  }
}
