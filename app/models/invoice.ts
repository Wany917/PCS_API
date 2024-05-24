import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import User from '#models/user';
import InvoiceItem from '#models/invoice_item';
import Society from '#models/society';

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare amount: number;

  @column.dateTime()
  declare dueDate: DateTime;

  @column.dateTime()
  declare paidAt: DateTime;

  @hasMany(() => InvoiceItem)
  declare items: HasMany<typeof InvoiceItem>;

  @column()
  declare userId: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @column()
  declare issuerSocietyId: number;

  @belongsTo(() => Society)
  declare issuerSociety: BelongsTo<typeof Society>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}