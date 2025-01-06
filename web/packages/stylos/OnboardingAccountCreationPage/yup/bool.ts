import * as Yup from 'yup'

export const bool = (message: string) =>
  Yup.boolean().isTrue(message).required(message)
