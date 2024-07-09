import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthenticationController {
  async register({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create(payload)

      const token = await auth.use('jwt').generate(user)
      return response.created({
        accessToken: token?.token,
        user,
      })
    } catch (error) {
      return response.status(400).send({ error: 'Registration failed', details: error.messages })
    }
  }

  async login({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      const token = await auth.use('jwt').generate(user)
      return response.ok({
        accessToken: token?.token,
      })
    } catch (error) {
      return response.status(401).send({ error: 'Login failed', details: error.messages })
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      await auth.use('jwt').authenticate()
      const user = await auth.user!
      return response.ok(user)
    } catch (error) {
      return response.status(401).send({ error: 'User not found' })
    }
  }
}
