import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'property_bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('property_id')
        .unsigned()
        .references('id')
        .inTable('properties')
        .onDelete('CASCADE')
      table.string('property_name').notNullable()
      table.integer('guests').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('nights').notNullable()
      table.float('price_per_night').notNullable()
      table.float('total_price_night').notNullable()
      table.float('service_fee').notNullable()
      table.float('discount').nullable()
      table.float('total_price').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}