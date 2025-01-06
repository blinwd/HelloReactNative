import * as Yup from 'yup'

export const requiredIf = (
  field: string,
  equalsTo: string | number,
  requiredMessage: string,
  requiredSchema?: Yup.StringSchema
) => {
  return Yup.string().when(field, (values, schema) => {
    if (values[0] === equalsTo) {
      return schema.notRequired()
    }

    return requiredSchema || schema.required(requiredMessage)
  })
}
