import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import PropertyImage from '#models/property_image'
import { PropertyType } from '#enums/property_type'
import Facility from '#models/facility'
import PropertyAvailability from '#models/property_availability'
import PropertyBooking from '#models/property_booking'

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare propertyType: PropertyType

  @column()
  declare country: string

  @column()
  declare state: string

  @column()
  declare city: string

  @column()
  declare zipCode: string

  @column()
  declare line1: string

  @column()
  declare price: number

  @column()
  declare bedrooms: number

  @column()
  declare bathrooms: number

  @column()
  declare beds: number

  @column()
  declare isPrivate: boolean

  @hasMany(() => PropertyImage)
  declare propertyImages: HasMany<typeof PropertyImage>

  @hasMany(() => PropertyAvailability)
  declare propertyAvailabilities: HasMany<typeof PropertyAvailability>

  @hasMany(() => PropertyBooking)
  declare propertyBookings: HasMany<typeof PropertyBooking>

  @manyToMany(() => Facility, {
    pivotTable: 'property_facilities',
  })
  declare facilities: ManyToMany<typeof Facility>

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
