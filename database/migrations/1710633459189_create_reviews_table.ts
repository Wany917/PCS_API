import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.float('rating').notNullable()
      table.string('comment').nullable()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.integer('property_id').unsigned().references('properties.id').nullable()
      table.integer('provider_service_id').unsigned().references('provider_services.id').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}