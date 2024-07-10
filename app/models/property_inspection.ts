import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import PropertyBooking from '#models/property_booking'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PropertyInspection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bookingId: number

  @column()
  declare type: 'check-in' | 'check-out' | 'intervention'

  @column()
  declare isClean: boolean

  @column()
  declare isFacilitesOk: boolean

  @column()
  declare isElectricalsOk: boolean

  @column()
  declare isWindowsOk: boolean

  @column()
  declare isFurnitureOk: boolean

  @column()
  declare isDoorsOk: boolean

  @column()
  declare isPlumbingOk: boolean

  @column()
  declare isFloorsOk: boolean

  @column()
  declare isWallsOk: boolean
  
  @belongsTo(() => PropertyBooking)
  declare booking: BelongsTo<typeof PropertyBooking>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}