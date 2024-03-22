import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoice_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('description').notNullable()
      table.integer('quantity').notNullable()
      table.float('price').notNullable()
      table.integer('invoice_id').unsigned().references('invoices.id').notNullable()
      table.timestamp('createdAt').notNullable()
      table.timestamp('updatedAt').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}