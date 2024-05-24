import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import PropertyImage from '#models/property_image'
import OwnerPlanning from '#models/owner_planning'
import ProviderPlanning from '#models/provider_planning'
import { PropertyType } from '#enums/property_type'

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

  @hasMany(() => OwnerPlanning)
  declare ownerPlanning: HasMany<typeof OwnerPlanning>

  @hasMany(() => ProviderPlanning)
  declare providerPlanning: HasMany<typeof ProviderPlanning>

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
