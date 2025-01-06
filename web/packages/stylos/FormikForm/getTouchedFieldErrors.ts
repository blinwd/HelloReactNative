import type {
  FormikErrors,
  FormikState,
  FormikValues,
} from 'formik';

import type { FormikFormField } from './FormikFormField';

const getTouchedFieldErrors = <T extends FormikValues>(
  errors: FormikErrors<T>,
  touched?: FormikState<T>['touched'],
  fields?: FormikFormField<T>[]
) => {
  if (!errors) {
    return undefined;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any  */
  const touchedErrors: Partial<{
    [K in keyof T]: any;
  }> = {};

  for (const key in errors) {
    if (touched?.[key]) {
      touchedErrors[key] = errors[key];
    }
  }

  if (fields) {
    for (const field of fields) {
      if (typeof field.error === 'string') {
        touchedErrors[field.id] = field.error;
      }
    }
  }

  return touchedErrors;
};

export default getTouchedFieldErrors;
