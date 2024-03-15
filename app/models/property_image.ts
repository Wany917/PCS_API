import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Property from '#models/property';

export default class PropertyImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare propertyId: number

  @belongsTo(() => Property)
  declare property: BelongsTo<typeof Property>;

  @column()
  declare link: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}