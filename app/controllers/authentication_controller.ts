import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthenticationController {
  
  static async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create(payload)
      return response.created(user)
    } catch (error) {
      return response.status(400).send({ error: 'Registration failed', details: error.messages })
    }
  }

  static async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
      return response.ok({
        token: token.value!.release(),
      })
    } catch (error) {
      return response.status(401).send({ error: 'Login failed', details: error.messages })
    }
  }

  static async me({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()
      return response.ok(user)
    } catch (error) {
      return response.status(401).send({ error: 'User not found' })
    }
  }
}
