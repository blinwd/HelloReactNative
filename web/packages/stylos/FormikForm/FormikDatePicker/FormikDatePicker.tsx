import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { FormikProps, FormikValues } from 'formik';

import type { DatePickerProps } from '@/stylos/DatePicker';
import DatePicker from '@/stylos/DatePicker';

export type FormikDatePickerProps<T extends FormikValues> =
  DatePickerProps & {
    id: keyof T;
    formik: FormikProps<T>;
    showDateFormatHelperText?: boolean;
    clearable?: boolean;
    error?: boolean;
    helperText?: React.ReactNode;

    /* eslint-disable @typescript-eslint/no-explicit-any */

    // Callback fired when the user blurs out of the field
    onFieldBlur?: (
      fieldId: string,
      fieldValue: any
    ) => void;

    // Callback fired when an error associated with the field occurs
    onFieldError?: (
      fieldId: string,
      fieldError: any
    ) => void;
  };

const FormikDatePicker = <T extends FormikValues>({
  id,
  formik,
  showDateFormatHelperText = false,
  clearable,
  className,
  format,
  slotProps = {},
  error,
  helperText,
  sx,
  onFieldBlur,
  onFieldError,
  ...rest
}: FormikDatePickerProps<T>): JSX.Element => {
  const formikId = id as string;

  const fieldError = formik?.errors[formikId];

  const isFieldTouched = formik?.touched[formikId] === true;

  const isFieldInErrorState =
    error === true
      ? true
      : !!(
          isFieldTouched && typeof fieldError === 'string'
        );

  const datePickerHelperText = useMemo(() => {
    if (typeof helperText === 'string') {
      return helperText;
    }

    if (isFieldTouched && typeof fieldError === 'string') {
      return fieldError;
    }

    if (showDateFormatHelperText) {
      return format;
    }

    return '';
  }, [
    fieldError,
    isFieldTouched,
    format,
    helperText,
    showDateFormatHelperText,
  ]);

  const validateDate = useCallback(
    (value: string) => {
      formik
        .setFieldValue(formikId, value)
        .finally(() =>
          formik.setFieldTouched(formikId, true)
        );
    },
    [formikId, formik]
  );

  const handleChange = useCallback(
    (value: Dayjs | null) => {
      // we don't want to show the error before user entering the year
      if (value?.isValid()) {
        validateDate(value.format('YYYY-MM-DD'));
      }
    },
    [validateDate]
  );

  const handleBlur = useCallback(
    ({
      currentTarget,
    }: React.FocusEvent<HTMLInputElement>) => {
      const rawInput =
        currentTarget.value?.split(' / ') || [];
      const [month, day, year] = rawInput
        .map((val) => val.replace(/\D+/g, ''))
        .filter((val) => val);

      if (!month || !day || !year) {
        validateDate(rawInput.join('-'));
      }

      if (onFieldBlur) {
        onFieldBlur(formikId, currentTarget.value);
      }
    },
    [formikId, onFieldBlur, validateDate]
  );

  useEffect(() => {
    if (formikId && isFieldTouched && onFieldError) {
      onFieldError(formikId, datePickerHelperText);
    }
  }, [
    formikId,
    datePickerHelperText,
    isFieldTouched,
    onFieldError,
  ]);

  return (
    <DatePicker
      className={classNames('formik-date-picker', {
        [className as string]:
          typeof className === 'string',
      })}
      value={
        formik.values[formikId]
          ? dayjs(formik.values[formikId])
          : null
      }
      formatDensity="spacious"
      format={format}
      slotProps={{
        ...slotProps,
        field: {
          clearable,
          onClear: () => formik.setFieldValue(formikId, ''),
        },
        textField: {
          error: isFieldInErrorState,
          helperText: datePickerHelperText,
          InputProps: {
            id: formikId,
            endAdornment: null, // hide date picker icon
            onBlur: handleBlur,
          },
        },
      }}
      sx={{
        width: '100%',
        ...sx,
      }}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default FormikDatePicker;
