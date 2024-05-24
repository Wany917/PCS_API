import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'societies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.string('siren').notNullable()
      table.string('country').nullable()
      table.string('state').nullable()
      table.string('city').nullable()
      table.string('zip_code').nullable()
      table.string('line_1').nullable()
      table.string('line_2').nullable()
      table.enu('status', ['pending', 'active', 'blocked'], {
        useNative: true,
        enumName: 'society_status',
        existingType: true,
      }).defaultTo('pending').notNullable()
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}