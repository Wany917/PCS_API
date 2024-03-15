import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import User from '#models/user';
import Property from '#models/property';
import ProviderService from '#models/provider_service';
import Society from '#models/society';

export default class ProviderPlanning extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare startAt: DateTime;

  @column.dateTime()
  declare endAt: DateTime;

  @column()
  declare isReserved: boolean;

  @column()
  declare propertyId: number;

  @belongsTo(() => Property)
  declare property: BelongsTo<typeof Property>;

  @column()
  declare providerServiceId: number;

  @belongsTo(() => ProviderService)
  declare providerService: BelongsTo<typeof ProviderService>;

  @column()
  declare userId: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @column()
  declare societyId: number;

  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}