import factory from '@adonisjs/lucid/factories'
import PropertyImage from '#models/property_image'

export const PropertyImageFactory = factory
  .define(PropertyImage, async ({ faker }) => {
    return {}
  })
  .build()