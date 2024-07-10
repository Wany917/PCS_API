import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { SocietyStatus } from '#enums/society_status'

export default class Society extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare siren: number

  @column()
  declare country: string | null

  @column()
  declare state: string | null

  @column()
  declare city: string | null

  @column()
  declare zipCode: string | null

  @column()
  declare line1: string | null

  @column()
  declare line2: string | null

  @column()
  declare status: SocietyStatus

  @column()
  declare userId: number

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
