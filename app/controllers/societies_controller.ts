import { HttpContext } from '@adonisjs/core/http'
import Society from '#models/society'
import SocietyPolicy from '#policies/society_policy'
import { createSocietyValidator, updateSocietyValidator } from '#validators/society_validator'

export default class SocietiesController {
  async index({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(SocietyPolicy).denies('viewList')) {
      return response.forbidden('Cannot view societies list.')
    }

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return Society.query().paginate(page, limit)
  }

  async store({ request, response, bouncer, auth }: HttpContext) {
    const payload = await request.validateUsing(createSocietyValidator)

    if (await bouncer.with(SocietyPolicy).denies('create', payload.userId)) {
      return response.forbidden('Cannot add society.')
    }

    if (payload.userId === undefined) payload.userId = auth.getUserOrFail().id

    return Society.create(payload)
  }

  async show({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(SocietyPolicy).denies('view')) {
      return response.forbidden('Cannot view society.')
    }

    return Society.findOrFail(params.id)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const society = await Society.findOrFail(params.id)
    const payload = await request.validateUsing(updateSocietyValidator)

    if (await bouncer.with(SocietyPolicy).denies('update')) {
      return response.forbidden('Cannot update property.')
    }

    society.merge(payload)
    await society.save()
    return { message: 'Society update successfully' }
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const property = await Society.findOrFail(params.id)

    if (await bouncer.with(SocietyPolicy).denies('delete')) {
      return response.forbidden('Cannot delete property.')
    }

    await property.delete()
    return { message: 'Property deleted successfully' }
  }
}
