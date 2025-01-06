import * as Yup from 'yup'

export const phone = (validMessage: string) =>
  Yup.string().matches(
    /^\+?(1\s?)?(\(\d{3}\)|\d{3})([\s.-]?)\d{3}([\s.-]?)\d{4}$/,
    validMessage
  )
