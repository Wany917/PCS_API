import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Invoice from '#models/invoice'

export default class InvoiceItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invoice_id: number

  @belongsTo(() => Invoice)
  declare invoice: BelongsTo<typeof Invoice>

  @column()
  declare description: string

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}