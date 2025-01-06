import * as Yup from 'yup'

export const string = (message: string) => Yup.string().required(message)
