/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthentificationController from '#controllers/authentification_controller'
import InvoiceItemsController from '#controllers/invoice_items_controller'
import InvoicesController from '#controllers/invoices_controller'
import MessagesController from '#controllers/messages_controller'
import OwnerPlanningsController from '#controllers/owner_plannings_controller'
import PropertiesController from '#controllers/properties_controller'
import PropertyImagesController from '#controllers/property_images_controller'
import ProviderPlanningsController from '#controllers/provider_plannings_controller'
import ProviderServicesController from '#controllers/provider_services_controller'
import ReviewsController from '#controllers/reviews_controller'
import SocietiesController from '#controllers/societies_controller'
import TransactionsController from '#controllers/transactions_controller'

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('register', [AuthentificationController, 'register'])
  router.post('login', [AuthentificationController, 'login'])
  router.get('me', [AuthentificationController, 'me']).use(middleware.auth())
}).prefix('auth')

router.group(() => {
  router.get('invoices', [InvoicesController, 'index'])
  router.get('invoices/:id', [InvoicesController, 'show'])
  router.post('invoices', [InvoicesController, 'store'])
  router.put('invoices/:id', [InvoicesController, 'update'])
  router.delete('invoices/:id', [InvoicesController, 'destroy'])
}).prefix('invoices').use(middleware.auth())

router.group(() => {
  router.get('invoice-items', [InvoiceItemsController, 'index'])
  router.get('invoice-items/:id', [InvoiceItemsController, 'show'])
  router.post('invoice-items', [InvoiceItemsController, 'store'])
  router.put('invoice-items/:id', [InvoiceItemsController, 'update'])
  router.delete('invoice-items/:id', [InvoiceItemsController, 'destroy'])
}).prefix('invoices-items').use(middleware.auth())

router.group(() => {
  router.get('messages', [MessagesController, 'index'])
  router.get('messages/:id', [MessagesController, 'show'])
  router.post('messages', [MessagesController, 'store'])
  router.put('messages/:id', [MessagesController, 'update'])
  router.delete('messages/:id', [MessagesController, 'destroy'])
}).prefix('messages').use(middleware.auth())

router.group(() => {
  router.get('owner-plannings', [OwnerPlanningsController, 'index'])
  router.get('owner-plannings/:id', [OwnerPlanningsController, 'show'])
  router.post('owner-plannings', [OwnerPlanningsController, 'store'])
  router.put('owner-plannings/:id', [OwnerPlanningsController, 'update'])
  router.delete('owner-plannings/:id', [OwnerPlanningsController, 'destroy'])
}).prefix('owner-plannings').use(middleware.auth())

router.group(() => {
  router.get('properties', [PropertiesController, 'index'])
  router.get('properties/:id', [PropertiesController, 'show'])
  router.post('properties', [PropertiesController, 'store'])
  router.put('properties/:id', [PropertiesController, 'update'])
  router.delete('properties/:id', [PropertiesController, 'destroy'])
}).prefix('properties').use(middleware.auth())

router.group(() => {
  router.get('property-images', [PropertyImagesController, 'index'])
  router.get('property-images/:id', [PropertyImagesController, 'show'])
  router.post('property-images', [PropertyImagesController, 'store'])
  router.put('property-images/:id', [PropertyImagesController, 'update'])
  router.delete('property-images/:id', [PropertyImagesController, 'destroy'])
}).prefix('property-images').use(middleware.auth())

router.group(() => {
  router.get('provider-plannings', [ProviderPlanningsController, 'index'])
  router.get('provider-plannings/:id', [ProviderPlanningsController, 'show'])
  router.post('provider-plannings', [ProviderPlanningsController, 'store'])
  router.put('provider-plannings/:id', [ProviderPlanningsController, 'update'])
  router.delete('provider-plannings/:id', [ProviderPlanningsController, 'destroy'])
}).prefix('provider-plannings').use(middleware.auth())

router.group(() => {
  router.get('provider-services', [ProviderServicesController, 'index'])
  router.get('provider-services/:id', [ProviderServicesController, 'show'])
  router.post('provider-services', [ProviderServicesController, 'store'])
  router.put('provider-services/:id', [ProviderServicesController, 'update'])
  router.delete('provider-services/:id', [ProviderServicesController, 'destroy'])
}).prefix('provider-services').use(middleware.auth())

router.group(() => {
  router.get('reviews', [ReviewsController, 'index'])
  router.get('reviews/:id', [ReviewsController, 'show'])
  router.post('reviews', [ReviewsController, 'store'])
  router.put('reviews/:id', [ReviewsController, 'update'])
  router.delete('reviews/:id', [ReviewsController, 'destroy'])
}).prefix('reviews').use(middleware.auth())

router.group(() => {
  router.get('societies', [SocietiesController, 'index'])
  router.get('societies/:id', [SocietiesController, 'show'])
  router.post('societies', [SocietiesController, 'store'])
  router.put('societies/:id', [SocietiesController, 'update'])
  router.delete('societies/:id', [SocietiesController, 'destroy'])
}).prefix('societies').use(middleware.auth())

router.group(() => {
  router.get('transactions', [TransactionsController, 'index'])
  router.get('transactions/:id', [TransactionsController, 'show'])
  router.post('transactions', [TransactionsController, 'store'])
  router.put('transactions/:id', [TransactionsController, 'update'])
  router.delete('transactions/:id', [TransactionsController, 'destroy'])
}).prefix('transactions').use(middleware.auth())

export default router;
