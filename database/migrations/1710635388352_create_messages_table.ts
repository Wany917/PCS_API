import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('content').notNullable()
      table.integer('sender_user_id').unsigned().references('users.id').nullable()
      table.integer('sender_society_id').unsigned().references('societies.id').nullable()
      table.integer('receiver_user_id').unsigned().references('users.id').nullable()
      table.integer('receiver_society_id').unsigned().references('societies.id').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}