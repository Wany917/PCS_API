/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthenticationController from '#controllers/authentication_controller'
const PropertiesController = () => import ('#controllers/properties_controller')
const PropertyImagesController = () => import ('#controllers/property_images_controller')
const SocietiesController = () => import ('#controllers/societies_controller')
const UsersController = () => import ('#controllers/users_controller')


import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";

router.get('/', async () => {
  return 'Bienvenue sur notre projet annuel.'
})

router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
})

router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
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
