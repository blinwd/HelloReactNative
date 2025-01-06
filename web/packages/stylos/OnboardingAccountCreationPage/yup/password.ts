import * as Yup from 'yup'

export const password = (
  requiredMessage: string,
  minMessage: string,
  symbolMessage: string,
  numberMessage: string,
  uppercaseMessage: string
) =>
  Yup.string()
    .min(8, minMessage)
    .matches(/[^\dA-Za-z]/, symbolMessage)
    .matches(/\d/, numberMessage)
    .matches(/[A-Z]/, uppercaseMessage)
    .required(requiredMessage)
