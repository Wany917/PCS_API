import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('avatar').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('phoneNumber').nullable()
      table.string('password').notNullable()
      table.enu('status', ['pending', 'active', 'blocked'], {
        useNative: true,
        enumName: 'user_status',
        existingType: true,
      }).defaultTo('pending').notNullable()
      table.boolean('isAdmin').defaultTo(false).notNullable()
      table.boolean('isActive').defaultTo(true).notNullable()
      table.integer('society_id').unsigned().references('societies.id')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}