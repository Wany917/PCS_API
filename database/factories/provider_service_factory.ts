import factory from '@adonisjs/lucid/factories'
import ProviderService from '#models/provider_service'

export const ProviderServiceFactory = factory
  .define(ProviderService, async ({ faker }) => {
    return {}
  })
  .build()