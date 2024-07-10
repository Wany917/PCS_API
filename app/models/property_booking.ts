import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Property from '#models/property'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PropertyInspection from '#models/property_inspection'

export default class PropertyBooking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare propertyId: number

  @belongsTo(() => Property)
  declare property: BelongsTo<typeof Property>

  @hasMany(() => PropertyInspection)
  declare inspections: HasMany<typeof PropertyInspection>

  @column()
  declare propertyName: string

  @column()
  declare guests: number

  @column()
  declare pricePerNight: number

  @column()
  declare totalPriceNight: number

  @column()
  declare serviceFee: number

  @column()
  declare discount: number

  @column()
  declare totalPrice: number

  @column()
  declare nights: number

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}