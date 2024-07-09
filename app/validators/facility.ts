import vine from '@vinejs/vine'

export const createFacilityValidator = vine.compile(
vine.object({
    name: vine.string().minLength(3).maxLength(255),
}))