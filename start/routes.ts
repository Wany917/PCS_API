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
  router.get('invoices', [InvoicesController, 'index']).middleware('auth')
  router.get('invoices/:id', [InvoicesController, 'show']).middleware('auth')
  router.post('invoices', [InvoicesController, 'store']).middleware('auth')
  router.put('invoices/:id', [InvoicesController, 'update']).middleware('auth')
  router.delete('invoices/:id', [InvoicesController, 'destroy']).middleware('auth')
}).prefix('invoices')

router.group(() => {
  router.get('invoice-items', [InvoiceItemsController, 'index']).middleware('auth')
  router.get('invoice-items/:id', [InvoiceItemsController, 'show']).middleware('auth')
  router.post('invoice-items', [InvoiceItemsController, 'store']).middleware('auth')
  router.put('invoice-items/:id', [InvoiceItemsController, 'update']).middleware('auth')
  router.delete('invoice-items/:id', [InvoiceItemsController, 'destroy']).middleware('auth')
}).prefix('invoices-items')

router.group(() => {
  router.get('messages', [MessagesController, 'index']).middleware('auth');
  router.get('messages/:id', [MessagesController, 'show']).middleware('auth');
  router.post('messages', [MessagesController, 'store']).middleware('auth');
  router.put('messages/:id', [MessagesController, 'update']).middleware('auth');
  router.delete('messages/:id', [MessagesController, 'destroy']).middleware('auth');
}).prefix('messages');

router.group(() => {
  router.get('owner-plannings', [OwnerPlanningsController, 'index']).middleware('auth');
  router.get('owner-plannings/:id', [OwnerPlanningsController, 'show']).middleware('auth');
  router.post('owner-plannings', [OwnerPlanningsController, 'store']).middleware('auth');
  router.put('owner-plannings/:id', [OwnerPlanningsController, 'update']).middleware('auth');
  router.delete('owner-plannings/:id', [OwnerPlanningsController, 'destroy']).middleware('auth');
}).prefix('owner-plannings');

router.group(() => {
  router.get('properties', [PropertiesController, 'index']).middleware('auth');
  router.get('properties/:id', [PropertiesController, 'show']).middleware('auth');
  router.post('properties', [PropertiesController, 'store']).middleware('auth');
  router.put('properties/:id', [PropertiesController, 'update']).middleware('auth');
  router.delete('properties/:id', [PropertiesController, 'destroy']).middleware('auth');
}).prefix('properties');

router.group(() => {
  router.get('property-images', [PropertyImagesController, 'index']).middleware('auth');
  router.get('property-images/:id', [PropertyImagesController, 'show']).middleware('auth');
  router.post('property-images', [PropertyImagesController, 'store']).middleware('auth');
  router.put('property-images/:id', [PropertyImagesController, 'update']).middleware('auth');
  router.delete('property-images/:id', [PropertyImagesController, 'destroy']).middleware('auth');
}).prefix('property-images');

router.group(() => {
  router.get('provider-plannings', [ProviderPlanningsController, 'index']).middleware('auth');
  router.get('provider-plannings/:id', [ProviderPlanningsController, 'show']).middleware('auth');
  router.post('provider-plannings', [ProviderPlanningsController, 'store']).middleware('auth');
  router.put('provider-plannings/:id', [ProviderPlanningsController, 'update']).middleware('auth');
  router.delete('provider-plannings/:id', [ProviderPlanningsController, 'destroy']).middleware('auth');
}).prefix('provider-plannings');

router.group(() => {
  router.get('provider-services', [ProviderServicesController, 'index']).middleware('auth');
  router.get('provider-services/:id', [ProviderServicesController, 'show']).middleware('auth');
  router.post('provider-services', [ProviderServicesController, 'store']).middleware('auth');
  router.put('provider-services/:id', [ProviderServicesController, 'update']).middleware('auth');
  router.delete('provider-services/:id', [ProviderServicesController, 'destroy']).middleware('auth');
}).prefix('provider-services');

router.group(() => {
  router.get('reviews', [ReviewsController, 'index']).middleware('auth');
  router.get('reviews/:id', [ReviewsController, 'show']).middleware('auth');
  router.post('reviews', [ReviewsController, 'store']).middleware('auth');
  router.put('reviews/:id', [ReviewsController, 'update']).middleware('auth');
  router.delete('reviews/:id', [ReviewsController, 'destroy']).middleware('auth');
}).prefix('reviews');

router.group(() => {
  router.get('societies', [SocietiesController, 'index']).middleware('auth');
  router.get('societies/:id', [SocietiesController, 'show']).middleware('auth');
  router.post('societies', [SocietiesController, 'store']).middleware('auth');
  router.put('societies/:id', [SocietiesController, 'update']).middleware('auth');
  router.delete('societies/:id', [SocietiesController, 'destroy']).middleware('auth');
}).prefix('societies');

router.group(() => {
  router.get('transactions', [TransactionsController, 'index']).middleware('auth');
  router.get('transactions/:id', [TransactionsController, 'show']).middleware('auth');
  router.post('transactions', [TransactionsController, 'store']).middleware('auth');
  router.put('transactions/:id', [TransactionsController, 'update']).middleware('auth');
  router.delete('transactions/:id', [TransactionsController, 'destroy']).middleware('auth');
}).prefix('transactions');

export default router;
