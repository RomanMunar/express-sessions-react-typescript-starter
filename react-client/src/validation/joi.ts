import joi, { ObjectSchema } from '@hapi/joi'

export const Joi = joi

export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false })
    return true
  } catch (e) {
    console.error(e)
    // We can return the validation error message here to provide better feedback to inavlid field
    return false
  }
}
