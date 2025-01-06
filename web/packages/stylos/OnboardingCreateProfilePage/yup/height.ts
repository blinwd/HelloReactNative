import * as Yup from 'yup'

export const feet = (requiredMessage: string, invalidMessage: string) =>
  Yup.number().typeError(invalidMessage).required(requiredMessage)

export const inches = (requiredMessage: string, invalidMessage: string) =>
  Yup.number().typeError(invalidMessage).required(requiredMessage)
