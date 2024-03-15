import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import User from '#models/user';
import PropertyImage from '#models/property_image';
import OwnerPlanning from '#models/owner_planning';
import ProviderPlanning from '#models/provider_planning';
import Society from '#models/society';
import { PropertyType } from '../enums/propertyType.js';

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: PropertyType;

  @column()
  declare name: string;

  @column()
  declare address: string;

  @column()
  declare country: string;

  @column()
  declare squareMetersNumber: number;

  @column()
  declare description: string;

  @column()
  declare unitCost: number | null;

  @column()
  declare hourCost: number | null;

  @column()
  declare isdeclare: boolean;

  @hasMany(() => PropertyImage)
  declare propertyImage: HasMany<typeof PropertyImage>;

  @hasMany(() => OwnerPlanning)
  declare ownerPlanning: HasMany<typeof OwnerPlanning>;

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