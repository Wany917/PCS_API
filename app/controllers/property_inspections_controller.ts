import PropertyInspection from '#models/property_inspection'
import type { HttpContext } from '@adonisjs/core/http'

export default class PropertyInspectionsController {
    public async index({ response }: HttpContext) {
        const inspections = await PropertyInspection.all()
        return response.ok(inspections)
    }

    public async show({ params, response }: HttpContext) {
        const inspection = await PropertyInspection.findOrFail(params.id)
        return response.ok(inspection)
    }

    public async store({ request, response }: HttpContext) {
        const { bookingId, type, isClean, isFacilitesOk, isElectricalsOk, isWindowsOk, isFurnitureOk, isDoorsOk, isPlumbingOk, isFloorsOk, isWallsOk } = request.all()
      
        const inspection = await PropertyInspection.create({
          bookingId,
          type,
          isClean,
          isFacilitesOk,
          isElectricalsOk,
          isWindowsOk,
          isFurnitureOk,
          isDoorsOk,
          isPlumbingOk,
          isFloorsOk,
          isWallsOk
        })
      
        return response.created(inspection)
    }
    
    public async update({ params, request, response }: HttpContext) {
        const inspection = await PropertyInspection.findOrFail(params.id)
        const { isClean, isFacilitesOk, isElectricalsOk, isWindowsOk, isFurnitureOk, isDoorsOk, isPlumbingOk, isFloorsOk, isWallsOk } = request.all()
      
        inspection.isClean = isClean
        inspection.isFacilitesOk = isFacilitesOk
        inspection.isElectricalsOk = isElectricalsOk
        inspection.isWindowsOk = isWindowsOk
        inspection.isFurnitureOk = isFurnitureOk
        inspection.isDoorsOk = isDoorsOk
        inspection.isPlumbingOk = isPlumbingOk
        inspection.isFloorsOk = isFloorsOk
        inspection.isWallsOk = isWallsOk
      
        await inspection.save()
      
        return response.ok(inspection)
    }
    
    public async destroy({ params, response }: HttpContext) {
        const inspection = await PropertyInspection.findOrFail(params.id)
        await inspection.delete()
        return response.noContent()
    }
}