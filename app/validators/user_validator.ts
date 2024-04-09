import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(2).maxLength(255),
    lastname: vine.string().minLength(2).maxLength(255),
    email: vine.string().email().maxLength(255),
    phoneNumber: vine.string().minLength(10).maxLength(15).optional(),
    password: vine.string().minLength(6),
    isActive: vine.boolean(),
    isAdmin: vine.boolean(),
    societyId: vine.number().positive().optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(2).maxLength(255).optional(),
    lastname: vine.string().minLength(2).maxLength(255).optional(),
    email: vine.string().email().maxLength(255).optional(),
    phoneNumber: vine.string().minLength(10).maxLength(15).optional(),
    password: vine.string().minLength(6).optional(),
    isActive: vine.boolean().optional(),
    isAdmin: vine.boolean().optional(),
    societyId: vine.number().positive().optional(),
  })
)

export const updateUserAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png']
    })
  })
)