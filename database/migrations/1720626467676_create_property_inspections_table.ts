import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'property_inspections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('booking_id').unsigned().references('property_bookings.id').onDelete('CASCADE')
      table.enum('type', ['check-in', 'check-out', 'intervention']).notNullable()
      table.boolean('is_clean').notNullable()
      table.boolean('is_facilites_ok').notNullable()
      table.boolean('is_electricals_ok').notNullable()
      table.boolean('is_windows_ok').notNullable()
      table.boolean('is_furniture_ok').notNullable()
      table.boolean('is_doors_ok').notNullable()
      table.boolean('is_plumbing_ok').notNullable()
      table.boolean('is_floors_ok').notNullable()
      table.boolean('is_walls_ok').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}