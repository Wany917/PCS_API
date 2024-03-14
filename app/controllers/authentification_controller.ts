import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/authentification'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthentificationController {
  
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token.value!.release(),
      ...user.serialize(),
    })
  }

  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  }
}