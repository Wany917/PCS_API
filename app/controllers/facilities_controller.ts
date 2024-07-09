import Facility from '#models/facility'
import { createFacilityValidator } from '#validators/facility'
import type { HttpContext } from '@adonisjs/core/http'

export default class FacilitiesController {
    async index({ request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)
        return Facility.query().paginate(page, limit)
    }

    async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createFacilityValidator)
        return Facility.create(payload)
    }

    destroy({ params }: HttpContext) {
        const id = params.id
        return Facility.query().where('id', id).delete()
    }
}