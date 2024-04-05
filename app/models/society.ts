import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Property from './property.js';
import ProviderService from './provider_service.js';
import User from './user.js';

export default class Society extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string;

  @column()
  declare siren: number;

  @hasMany(() => User)
  declare user: HasMany<typeof User>;

  @hasMany(() => Property)
  declare property: HasMany<typeof Property>;

  @hasMany(() => ProviderService)
  declare providerServices: HasMany<typeof ProviderService>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}