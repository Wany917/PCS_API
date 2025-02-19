import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Invoice from '#models/invoice'
import Property from '#models/property'
import { UserStatus } from '#enums/user_status'
import ServiceRequests from '#models/service_request'
import PropertyBooking from '#models/property_booking'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare avatar: string | null

  @column()
  declare email: string

  @column()
  declare phoneNumber: string | null

  @column({ serializeAs: null })
  declare password: string

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
  declare status: UserStatus

  @column()
  declare isActive: boolean

  @column()
  declare isAdmin: boolean

  @hasMany(() => Property)
  declare property: HasMany<typeof Property>

  @hasMany(() => Invoice)
  declare invoices: HasMany<typeof Invoice>

  @hasMany(() => PropertyBooking)
  declare propertyBookings: HasMany<typeof PropertyBooking>

  @hasMany(() => ServiceRequests)
  declare serviceRequests: HasMany<typeof ServiceRequests>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // static accessTokens = DbAccessTokensProvider.forModel(User, {
  //   expiresIn: '10h',
  //   prefix: 'oat_',
  //   table: 'auth_access_tokens',
  //   type: 'auth_token',
  //   tokenSecretLength: 40,
  // })
}
