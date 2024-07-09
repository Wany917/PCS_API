import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { updateUserAvatarValidator } from '#validators/user_validator'
import User from '#models/user'

export default class UserAvatarsController {
  async store({ request, params, auth }: HttpContext) {
    const user = await User.findOrFail(params.user_id)

    const { avatar } = await request.validateUsing(updateUserAvatarValidator)

    await avatar?.move(app.makePath('uploads/avatar'), {
      name: `${cuid()}.${avatar.extname}`,
    })

    if (auth.user!.id === user.id) {
      auth.user!.avatar = avatar.fileName!
      await auth!.user!.save()
    } else {
      user.avatar = avatar.fileName!
      await user.save()
    }

    return 'Avatar uploaded successfully'
  }

  async destroy({ response }: HttpContext) {
    return response.status(204)
  }
}
