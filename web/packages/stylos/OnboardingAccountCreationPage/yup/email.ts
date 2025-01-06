import * as Yup from 'yup'

export const email = (requiredMessage: string, validMessage: string) =>
  Yup.string().email(validMessage).required(requiredMessage)
