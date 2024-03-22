import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'provider_plannings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('provider_service_id').unsigned().references('provider_services.id').notNullable()
      table.integer('property_id').unsigned().references('properties.id').notNullable()
      table.boolean('is_reserved').notNullable()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.integer('society_id').unsigned().references('societies.id').nullable()
      table.timestamp('start_at').notNullable()
      table.timestamp('end_at').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}