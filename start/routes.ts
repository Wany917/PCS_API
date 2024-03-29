/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthenticationController from '#controllers/authentication_controller'
import PropertiesController from '#controllers/properties_controller'

import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import PropertyImagesController from '#controllers/property_images_controller'

router.get('/', async () => {
  return 'hello world ;)'
})

router.get('/swagger', async () => {
  return AutoSwagger.default.json(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router
  .group(() => {
    router.post('register', AuthenticationController.register)
    router.post('login', AuthenticationController.login)
    router.get('me', AuthenticationController.me).use(middleware.auth())
  })
  .prefix('auth')

router
  .resource('properties', PropertiesController)
  .apiOnly()
  .use(['store', 'update', 'destroy'], middleware.auth())

router
  .resource('properties.images', PropertyImagesController)
  .apiOnly()
  .except(['index', 'show', 'update'])
  .use('*', middleware.auth())

export default router
