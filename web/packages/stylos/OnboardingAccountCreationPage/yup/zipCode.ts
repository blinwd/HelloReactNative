import * as Yup from 'yup'

export const zipCode = (validMessage: string) =>
  Yup.string().matches(/^\d{5}(-\d{4})?$/, validMessage)
