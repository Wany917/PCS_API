import { PropertyType } from '#enums/property_type'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PropertySchema extends BaseSchema {
  protected tableName = 'properties'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.enum('property_type', Object.values(PropertyType), {
        useNative: true,
        enumName: 'property_type',
        existingType: true,
      }).notNullable()
      table.string('country').notNullable()
      table.string('state').notNullable()
      table.string('city').notNullable()
      table.string('zip_code').notNullable()
      table.string('line_1').notNullable()
      table.decimal('price', 15, 2).notNullable() // Assurez-vous que cela corresponde à vos exigences de précision et d'échelle
      table.integer('bedrooms').unsigned().notNullable()
      table.integer('bathrooms').unsigned().notNullable()
      table.integer('beds').unsigned().notNullable()
      table.boolean('is_private').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
