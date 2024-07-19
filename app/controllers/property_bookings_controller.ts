import PropertyAvailability from '#models/property_availability'
import PropertyBooking from '#models/property_booking'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class PropertyBookingsController {
  async index({ params, response }: HttpContext) {
    const propertyId = params.property_id

    // Étape 1 : Récupérer toutes les plages de disponibilité pour la propriété
    const availabilities = await PropertyAvailability.query().where('propertyId', propertyId)

    // Étape 2 : Récupérer toutes les réservations pour la même propriété
    const bookings = await PropertyBooking.query().where('propertyId', propertyId)

    // Étape 3 : Trouver les dates disponibles
    let availableDates = availabilities.flatMap((availability) => {
      const start = DateTime.fromJSDate(availability.startDate.toJSDate())
      const end = DateTime.fromJSDate(availability.endDate.toJSDate())
      let dates = []

      for (let dt = start; dt <= end; dt = dt.plus({ days: 1 })) {
        if (
          !bookings.some((booking) => {
            const bookingStart = DateTime.fromJSDate(booking.startDate.toJSDate())
            const bookingEnd = DateTime.fromJSDate(booking.endDate.toJSDate())
            return dt >= bookingStart && dt <= bookingEnd
          })
        ) {
          dates.push(dt.toISODate())
        }
      }

      return dates
    })

    // Supprimer les doublons
    availableDates = [...new Set(availableDates)]

    return response.ok(availableDates)
  }

  async store({ params, request, response }: HttpContext) {
    const propertyId = params.property_id
    const { userId, startDate, endDate, ...otherDetails } = request.all()

    // Convertir les dates de chaîne en objets DateTime
    const start = DateTime.fromISO(startDate)
    const end = DateTime.fromISO(endDate)

    // Vérifier si les dates sont valides
    if (!start.isValid || !end.isValid) {
      return response.badRequest({ message: 'Les dates fournies ne sont pas valides.' })
    }

    // Vérifier si les dates demandées sont disponibles
    const isAvailable = await this.checkAvailability(propertyId, start, end)

    if (!isAvailable) {
      return response.badRequest({ message: 'Les dates demandées ne sont pas disponibles.' })
    }

    // Créer la réservation
    const booking = await PropertyBooking.create({
      propertyId,
      userId,
      startDate: start.toJSDate(),
      endDate: end.toJSDate(),
      ...otherDetails,
    })

    return response.created({ message: 'Réservation créée avec succès.', booking })
  }

  async show({ params, response }: HttpContext) {
    const booking = await PropertyBooking.query()
      .where('id', params.id)
      .preload('inspections')
      .first()
    if (!booking) {
      return response.notFound({ message: 'Réservation non trouvée.' })
    }
    return response.ok(booking)
  }

  async update({ request, params, response }: HttpContext) {
    const booking = await PropertyBooking.find(params.id)
    if (!booking) {
      return response.notFound({ message: 'Réservation non trouvée.' })
    }

    const data = request.all()

    booking.merge(data)
    await booking.save()

    return response.ok({ message: 'Réservation modifiée avec succès.', booking })
  }

  async destroy({ params, response }: HttpContext) {
    const booking = await PropertyBooking.find(params.id)
    if (!booking) {
      return response.notFound({ message: 'Réservation non trouvée.' })
    }

    await booking.delete()

    return response.noContent()
  }

  private async checkAvailability(
    propertyId: number,
    startDate: DateTime,
    endDate: DateTime
  ): Promise<boolean> {
    // Vérifier les réservations existantes
    const existingBookings = await PropertyBooking.query()
      .where('propertyId', propertyId)
      .where((builder) => {
        builder
          .whereBetween('startDate', [startDate.toJSDate(), endDate.toJSDate()])
          .orWhereBetween('endDate', [startDate.toJSDate(), endDate.toJSDate()])
      })

    if (existingBookings.length > 0) {
      return false // Les dates ne sont pas disponibles
    }

    // Vérifier les plages de disponibilité
    const availability = await PropertyAvailability.query()
      .where('propertyId', propertyId)
      .andWhere('startDate', '<=', startDate.toJSDate())
      .andWhere('endDate', '>=', endDate.toJSDate())

    return availability.length > 0
  }
}
