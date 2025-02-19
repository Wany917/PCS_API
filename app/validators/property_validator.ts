import vine from '@vinejs/vine'
import { PropertyType } from '#enums/property_type'

export const createPropertyValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(2).maxLength(255),
    description: vine.string().minLength(2).maxLength(255),
    propertyType: vine.enum(Object.values(PropertyType)),
    country: vine.string().minLength(2).maxLength(255),
    state: vine.string().minLength(2).maxLength(255),
    city: vine.string().minLength(2).maxLength(255),
    zipCode: vine.string().minLength(2).maxLength(255),
    line1: vine.string().minLength(2).maxLength(255),
    price: vine.number().min(1),
    bedrooms: vine.number().min(1).max(8),
    bathrooms: vine.number().min(1).max(8),
    beds: vine.number().min(1).max(8),
    userId: vine.number().positive(),
    isPrivate: vine.boolean().optional(),
  })
)

export const createPropertyImagesValidator = vine.compile(
  vine.object({
    images: vine
      .array(
        vine.file({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg', 'webp'],
        })
      )
      .optional(),
  })
)

export const createPropertyFacilitiesValidator = vine.compile(
  vine.object({
    facilities: vine.array(vine.number().positive()),
  })
)

export const createPropertyAvailabilitiesValidator = vine.compile(
  vine.object({
    startDate: vine.date().transform((value) => new Date(value)),
    endDate: vine.date().transform((value) => new Date(value)),
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
    societyId: vine.number().positive().optional(),
  })
)
