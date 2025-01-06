import dayjs from 'dayjs'
import * as Yup from 'yup'

export const birthday = (
  requiredMessage: string,
  normalCheckFailMessage: string,
  eightTeenCheckFailMessage: string,
  format = 'YYYY-MM-DD'
) => {
  return Yup.string()
    .required(requiredMessage)
    .test('normal-birthday-check', normalCheckFailMessage, (value: string) => {
      const date = dayjs(value, format)
      return (
        date.isValid() &&
        !(date.isBefore(dayjs('1900-01-01')) || date.isAfter(dayjs()))
      )
    })
    .test('age-18-check', eightTeenCheckFailMessage, (value: string) => {
      const date = dayjs(value, format)
      return date.isValid() && !date.isAfter(dayjs().subtract(18, 'year'))
    })
}
