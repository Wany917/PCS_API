import factory from '@adonisjs/lucid/factories'
import InvoiceItem from '#models/invoice_item'

export const InvoiceItemFactory = factory
  .define(InvoiceItem, async ({ faker }) => {
    return {}
  })
  .build()