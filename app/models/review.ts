import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import ProviderService from '#models/provider_service';
import Property from '#models/property';

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rating: number;

  @column()
  declare comment: string;

  @column()
  declare userId: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @belongsTo(() => ProviderService)
  declare providerService: BelongsTo<typeof ProviderService>;

  @belongsTo(() => Property)
  declare property: BelongsTo<typeof Property>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}