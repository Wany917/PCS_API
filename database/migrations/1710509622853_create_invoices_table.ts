import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.float('amount').notNullable()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.integer('society_id').unsigned().references('societies.id').nullable()
      table.integer('issuer_user_id').unsigned().references('users.id').nullable()
      table.integer('issuer_society_id').unsigned().references('societies.id').nullable()
      table.timestamp('due_at').notNullable()
      table.timestamp('paid_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}