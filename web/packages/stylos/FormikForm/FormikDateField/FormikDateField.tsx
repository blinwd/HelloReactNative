/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { FormikValues } from 'formik';

import type { FormikTextFieldProps } from '../FormikTextField';
import FormikTextField from '../FormikTextField';

export type FormikDateFieldProps<P extends FormikValues> =
  Omit<FormikTextFieldProps<P>, 'mask' | 'variant'> & {
    /**
     * Date format. This will be the date format we send to the backend.
     *
     * @defaultValue 'YYYY-MM-DD'
     */
    format?: string | null;

    /**
     * Date format used to display in the DOM.
     */
    displayFormat?: string;

    /**
     * The property is only applicable to the displayed text in the DOM.
     *
     * 'dense' example: '01/02/1990'
     * 'loose' example: '01 / 02 / 1990'
     */
    formatDensity?: 'dense' | 'loose';

    /**
     * Set `true` to mask the user's freeform input
     *
     * @defaultValue true
     */
    mask?: boolean;
  };

function FormikDateField<T extends FormikValues>({
  id,
  formik,
  format = 'YYYY-MM-DD',
  displayFormat = 'MM/DD/YYYY',
  formatDensity = 'loose',
  mask = true,
  onFieldBlur,
  ...rest
}: FormikDateFieldProps<T>) {
  const dayjsRef = useRef<Dayjs>();

  const [rawInput, setRawInput] = useState('');

  const maskFormat = useMemo(() => {
    if (mask) {
      return (displayFormat || format)?.replace(/\w/g, '0');
    }

    return undefined;
  }, [mask, format, displayFormat]);

  const handleChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      const val = e.currentTarget.value.replace(/\s/g, '');

      if (
        formik.touched[id] ||
        val.length ===
          (displayFormat || 'MM/DD/YYYY')?.length
      ) {
        dayjsRef.current = dayjs(val, displayFormat);

        formik
          .setFieldValue(
            id,
            dayjsRef.current.format(format || 'YYYY-MM-DD')
          )
          .finally(() => formik.setFieldTouched(id, true));
      }

      setRawInput(val);
    },
    [id, displayFormat, format, formik]
  );

  const handleBlur = useCallback<
    React.FocusEventHandler<
      HTMLTextAreaElement | HTMLInputElement
    >
  >(
    (e) => {
      /**
       * Dev note:
       * DayJS is a wonderful library in handling parsing/formatting
       * date string. For example, if the user enters:
       *
       *    "13/20/1990" (format MM/DD/YYYY)
       *
       * It may seem invalid to human eyes, but it is valid for DayJS. It
       * parses the string to be:
       *
       *    // advance 1 year
       *    "1991-01-20" (format: YYYY-MM-DD)
       *
       * To avoid the discrepancy between the displayed text in the DOM
       * and the value stored in formik, we need to update the displayed
       * text.
       */
      if (dayjsRef.current?.isValid()) {
        setRawInput(
          dayjsRef.current.format(
            displayFormat || 'MM/DD/YYYY'
          )
        );
      }

      formik.handleBlur(e);

      if (id && onFieldBlur) {
        onFieldBlur(id, e.target.value);
      }
    },
    [id, formik, displayFormat, onFieldBlur]
  );

  return (
    <FormikTextField
      id={id}
      formik={formik}
      value={rawInput}
      formatDensity={formatDensity}
      mask={maskFormat}
      onChange={handleChange}
      onBlur={handleBlur}
      {...rest}
    />
  );
}

export default FormikDateField;
