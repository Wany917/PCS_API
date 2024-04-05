import User from '#models/user'
import UserPolicy from '#policies/user_policy'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async index({ request, response, bouncer }: HttpContext) {
        if (await bouncer.with(UserPolicy).denies('view')) {
          return response.forbidden('Cannot view user list.')
        }
    
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)
        return User.query().paginate(page, limit)
    }

    async store({ request, response, bouncer }: HttpContext) {
        const payload = await request.validateUsing(createUserValidator)
    
        if (await bouncer.with(UserPolicy).denies('create')) {
          return response.forbidden('Cannot add user.')
        }

        return User.create(payload)
    }

    async show({ params, response, bouncer }: HttpContext) {
        if (await bouncer.with(UserPolicy).denies('view')) {
          return response.forbidden('Cannot view society.')
        }
    
        return User.findOrFail(params.id)
      }

    async update({ params, request, response, bouncer }: HttpContext) {
        const user = await User.findOrFail(params.id)
        const payload = await request.validateUsing(updateUserValidator)
    
        if (
          await bouncer
            .with(UserPolicy)
            .denies('update', user.id)
        ) {
          return response.forbidden('Cannot update user.')
        }
    
        user.merge(payload)
        await user.save()
        return { message: 'User update successfully' }
      }

      async destroy({ params, response, bouncer }: HttpContext) {
        const user = await User.findOrFail(params.id)
    
        if (await bouncer.with(UserPolicy).denies('delete')) {
          return response.forbidden('Cannot delete user.')
        }
    
        await user.delete()
        return { message: 'user deleted successfully' }
    }
}