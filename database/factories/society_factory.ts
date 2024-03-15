import factory from '@adonisjs/lucid/factories'
import Society from '#models/society'

export const SocietyFactory = factory
  .define(Society, async ({ faker }) => {
    return {}
  })
  .build()