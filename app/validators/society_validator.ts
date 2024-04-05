import vine from '@vinejs/vine'

export const createSocietyValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(255),
        siren: vine.number(),
        userId: vine.number()
    })
)

export const updateSocietyValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(255).optional(),
        siren: vine.number().optional(),
        userId: vine.number().optional()
    })
)