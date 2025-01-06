import * as Yup from 'yup'

export const weight = (requiredMessage: string, invalidMessage: string) =>
  Yup.number()
    .typeError(invalidMessage)
    .required(requiredMessage)
    .max(2000, invalidMessage)
