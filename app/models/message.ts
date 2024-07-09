import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Society from '#models/society'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare senderUserId: number

  @belongsTo(() => User)
  declare senderUser: BelongsTo<typeof User>

  @column()
  declare senderSocietyId: number

  @belongsTo(() => Society)
  declare senderSociety: BelongsTo<typeof Society>

  @column()
  declare receiverUserId: number

  @belongsTo(() => User)
  declare receiverUser: BelongsTo<typeof User>

  @column()
  declare receiverSocietyId: number

  @belongsTo(() => Society)
  declare receiverSociety: BelongsTo<typeof Society>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
