/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthenticationController = () => import('#controllers/authentication_controller')
const PropertiesController = () => import('#controllers/properties_controller')
const PropertyImagesController = () => import('#controllers/property_images_controller')
const SocietiesController = () => import('#controllers/societies_controller')
const UsersController = () => import('#controllers/users_controller')
const UserAvatarsController = () => import('#controllers/user_avatars_controller')
const InvoicesController = () => import('#controllers/invoices_controller')
const FacilitiesController = () => import('#controllers/facilities_controller')

import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

router.get('/', async () => {
  return 'Bienvenue sur notre projet annuel.'
})

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads', normalizedPath)
  return response.download(absolutePath)
})

router
  .group(() => {
    router.post('register', [AuthenticationController, 'register'])
    router.post('login', [AuthenticationController, 'login'])
    router.get('me', [AuthenticationController, 'me']).use(middleware.auth())
  })
  .prefix('auth')

router
  .resource('users', UsersController)
  .apiOnly()
  .use(['index', 'store', 'update', 'destroy'], middleware.auth())

router.put('users/:user_id/avatar', [UserAvatarsController, 'store']).use(middleware.auth())
router.delete('users/:user_id/avatar', [UserAvatarsController, 'destroy']).use(middleware.auth())

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

router.resource('invoices', InvoicesController).apiOnly().use('*', middleware.auth())

router.resource('facilities', FacilitiesController).apiOnly().only(['index', 'store', 'destroy']).use(['store', 'destroy'], middleware.auth())

export default router
