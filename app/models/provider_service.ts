import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import ProviderPlanning from '#models/provider_planning';
import User from '#models/user';
import Society from '#models/society';

export default class ProviderService extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare unitCost: number | null;

  @column()
  declare hourCost: number | null;

  @hasMany(() => ProviderPlanning)
  declare providerPlanning: HasMany<typeof ProviderPlanning>;

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