import PropertyAvailability from '#models/property_availability'
import { createPropertyAvailabilitiesValidator } from '#validators/property_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class PropertyAvailabilitiesController {
    public async index({ params, response}: HttpContext) {
        const { propertyId } = params.property_id
        const availabilities = await PropertyAvailability.query().where('property_id', propertyId)
        return response.ok(availabilities)
    }
    
    public async store({ params, request, response }: HttpContext) {
        const { propertyId } = params.property_id
        const payload = await request.validateUsing(createPropertyAvailabilitiesValidator)
    
        const overlappingAvailabilities = await PropertyAvailability.query()
          .where('property_id', propertyId)
          .where((query) => {
            query
              .whereBetween('start_date', [payload.startDate, payload.endDate])
              .orWhereBetween('end_date', [payload.startDate, payload.endDate])
              .orWhereRaw('? BETWEEN start_date AND end_date', [payload.startDate])
              .orWhereRaw('? BETWEEN start_date AND end_date', [payload.endDate])
          })
    
        if (overlappingAvailabilities.length > 0) {
          return response
            .status(400)
            .json({ message: 'La période chevauche une période déjà disponible.' })
        }
    
        const propertyAvailability = new PropertyAvailability()
        propertyAvailability.propertyId = propertyId
        propertyAvailability.startDate = DateTime.fromJSDate(payload.startDate)
        propertyAvailability.endDate = DateTime.fromJSDate(payload.endDate)
    
        const availability = await PropertyAvailability.create(propertyAvailability)
        return response.created(availability)
    }
    
    public async destroy({ params, response }: HttpContext) {
        const availability = await PropertyAvailability.findOrFail(params.id)
        await availability.delete()
        return response.noContent()
    }
}