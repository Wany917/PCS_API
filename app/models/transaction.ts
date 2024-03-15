import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Invoice from '#models/invoice';
import User from '#models/user';
import Society from '#models/society';

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare amount: number;

  @column.dateTime()
  declare dueDate: DateTime;

  @column.dateTime()
  declare paidAt: DateTime;

  @column()
  declare userId: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @column()
  declare societyId: number;

  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>;

  @column()
  declare invoiceId: number;

  @belongsTo(() => Invoice)
  declare invoice: BelongsTo<typeof Invoice>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}