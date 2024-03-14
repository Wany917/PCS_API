/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthentificationController from '#controllers/authentification_controller'
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