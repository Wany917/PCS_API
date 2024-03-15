import factory from '@adonisjs/lucid/factories'
import Property from '#models/property'

export const PropertyFactory = factory
  .define(Property, async ({ faker }) => {
    return {}
  })
  .build()