import type { HttpContext } from '@adonisjs/core/http'
import ServiceRequest from '#models/service_request'

export default class ServiceRequestsController {
  public async index({}: HttpContext) {
    const serviceRequests = await ServiceRequest.all()
    return serviceRequests
  }

  public async store({ request }: HttpContext) {
    const data = request.only(['name', 'description', 'amount', 'user_id', 'booking_id'])
    const serviceRequest = await ServiceRequest.create(data)
    return serviceRequest
  }

  public async show({ params }: HttpContext) {
    const serviceRequest = await ServiceRequest.findOrFail(params.id)
    return serviceRequest
  }

  public async update({ params, request }: HttpContext) {
    const serviceRequest = await ServiceRequest.findOrFail(params.id)
    const data = request.only(['name', 'description', 'amount', 'user_id', 'booking_id'])
    serviceRequest.merge(data)
    await serviceRequest.save()
    return serviceRequest
  }

  public async destroy({ params }: HttpContext) {
    const serviceRequest = await ServiceRequest.findOrFail(params.id)
    await serviceRequest.delete()
    return { message: 'Service request deleted successfully.' }
  }
}