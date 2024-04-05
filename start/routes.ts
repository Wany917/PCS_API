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

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import PropertyImagesController from '#controllers/property_images_controller'
import SocietiesController from '#controllers/societies_controller'
import UsersController from '#controllers/users_controller'

router.get('/', async () => {
  return 'Bienvenue sur notre projet annuel.'
})

router
  .group(() => {
    router.post('register', AuthenticationController.register)
    router.post('login', AuthenticationController.login)
    router.get('me', AuthenticationController.me).use(middleware.auth())
  })
  .prefix('auth')

router
  .resource('users', UsersController)
  .apiOnly()
  .use(['index', 'store', 'update', 'destroy'], middleware.auth())

router
  .resource('societies', SocietiesController)
  .apiOnly()
  .use(['index', 'store', 'update', 'destroy'], middleware.auth())

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
