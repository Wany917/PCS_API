import vine from '@vinejs/vine'

export const createSocietyValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    siren: vine.number(),
    line1: vine.string().minLength(2).maxLength(255).optional(),
    line2: vine.string().minLength(2).maxLength(255).optional(),
    zipCode: vine.string().minLength(2).maxLength(255).optional(),
    city: vine.string().minLength(2).maxLength(255).optional(),
    state: vine.string().minLength(2).maxLength(255).optional(),
    country: vine.string().minLength(2).maxLength(255).optional(),
    userId: vine.number(),
  })
)

export const updateSocietyValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255).optional(),
    siren: vine.number().optional(),
    line1: vine.string().minLength(2).maxLength(255).optional(),
    line2: vine.string().minLength(2).maxLength(255).optional(),
    zipCode: vine.string().minLength(2).maxLength(255).optional(),
    city: vine.string().minLength(2).maxLength(255).optional(),
    state: vine.string().minLength(2).maxLength(255).optional(),
    country: vine.string().minLength(2).maxLength(255).optional(),
    userId: vine.number().optional(),
  })
)
