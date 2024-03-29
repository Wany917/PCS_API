import vine from '@vinejs/vine'
import { PropertyType } from '#enums/property_type'

export const createPropertyValidator = vine.compile(
  vine.object({
    type: vine.enum(Object.values(PropertyType)),
    name: vine.string().minLength(3).maxLength(255),
    address: vine.string().minLength(10).maxLength(255),
    country: vine.string().trim().minLength(2).maxLength(255),
    squareMetersNumber: vine.number().positive(),
    roomNumber: vine.number().positive(),
    description: vine.string().maxLength(1000),
    dayCost: vine.number().positive().optional(),
    monthlyCost: vine.number().positive().optional(),
    isPublic: vine.boolean(),
    userId: vine.number().positive().optional(),
    societyId: vine.number().positive().optional()
  })
)

export const updatePropertyValidator = vine.compile(
  vine.object({
    type: vine.enum(Object.values(PropertyType)).optional(),
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    address: vine.string().trim().minLength(10).maxLength(255).optional(),
    country: vine.string().trim().minLength(2).maxLength(255).optional(),
    squareMetersNumber: vine.number().positive().optional(),
    roomNumber: vine.number().positive().optional(),
    description: vine.string().trim().maxLength(1000).optional(),
    dayCost: vine.number().positive().optional(),
    monthlyCost: vine.number().positive().optional(),
    isPublic: vine.boolean().optional(),
    userId: vine.number().positive().optional(),
    societyId: vine.number().positive().optional()
  })
)

export const createPropertyImageValidator = vine.compile(
  vine.object({
    link: vine.string().trim().minLength(5).maxLength(255),
  })
)
