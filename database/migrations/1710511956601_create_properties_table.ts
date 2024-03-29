import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'properties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.enu('type', ['apartment', 'home', 'room'], {
        useNative: true,
        enumName: 'property_type',
        existingType: false,
      })
      table.string('address').notNullable()
      table.string('country').notNullable()
      table.integer('square_meters_number').notNullable()
      table.integer('room_number').notNullable()
      table.string('description').notNullable()
      table.float('day_cost').nullable()
      table.float('monthly_cost').nullable()
      table.boolean('is_public').notNullable()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.integer('society_id').unsigned().references('societies.id').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}