import { useCallback, useEffect, useRef } from 'react';

import isEqual from 'lodash/isEqual';
import type {
  FormikProps,
  FormikValues,
  FormikErrors,
} from 'formik';
import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';

import type {
  FormikFormField,
  NumericSelectField,
  TextField,
  DateField,
  DateTextField,
} from './FormikFormField';
import FormikDatePicker from './FormikDatePicker';
import FormikDateField from './FormikDateField';
import FormikTextField from './FormikTextField';
import FormikNumericSelectField from './FormikNumericSelectField';
import getTouchedFieldErrors from './getTouchedFieldErrors';

export type FormikFormProps<T extends FormikValues> =
  GridProps & {
    formik: FormikProps<T>;
    fields: FormikFormField<T>[];
    onFieldBlur?: (values: Partial<T> | undefined) => void;
    onFormErrors?: (
      errors: FormikErrors<T> | null | undefined
    ) => void;
  };

const FormikForm = <T extends FormikValues>({
  formik,
  fields,
  spacing = 3,
  onFieldBlur,
  onFormErrors,
  ...rest
}: FormikFormProps<T>) => {
  // form snapshot
  const formValuesSnapshot = useRef<Partial<T>>();

  // errors of form fields that have been touched/edited
  const formErrorsSnapshot =
    useRef<Partial<FormikErrors<T>>>();

  const handleFieldBlur = useCallback(
    (fieldId: string, fieldValue: string) => {
      formValuesSnapshot.current = {
        ...(formValuesSnapshot.current
          ? formValuesSnapshot.current
          : {}),
        [fieldId]: fieldValue,
      } as Partial<T>;

      if (onFieldBlur) {
        onFieldBlur(formValuesSnapshot.current);
      }
    },
    [onFieldBlur]
  );

  const renderField = useCallback(
    ({ fieldType, ...configs }: FormikFormField<T>) => {
      const key = configs.id as string;

      const mergedConfigs = {
        ...configs,
        onFieldBlur: handleFieldBlur,
      };

      if (fieldType === 'date') {
        return (
          <FormikDatePicker
            key={key}
            formik={formik}
            {...(mergedConfigs as DateField<T>)}
          />
        );
      }

      if (fieldType === 'dateText') {
        return (
          <FormikDateField
            key={key}
            formik={formik}
            {...(mergedConfigs as DateTextField<T>)}
          />
        );
      }

      if (fieldType === 'numericSelect') {
        return (
          <FormikNumericSelectField
            key={key}
            formik={formik}
            {...(mergedConfigs as NumericSelectField<T>)}
          />
        );
      }

      const { options, ...restTextFieldConfigs } =
        mergedConfigs as TextField<T>;

      return (
        <FormikTextField
          key={key}
          formik={formik}
          select={Array.isArray(options)}
          {...restTextFieldConfigs}
        >
          {Array.isArray(options)
            ? options.map(
                ({ value, label: optionLabel }) => (
                  <MenuItem key={value} value={value}>
                    {optionLabel}
                  </MenuItem>
                )
              )
            : null}
        </FormikTextField>
      );
    },
    [formik, handleFieldBlur]
  );

  useEffect(() => {
    const errors = getTouchedFieldErrors(
      formik.errors,
      formik.touched,
      fields
    );

    if (!isEqual(errors, formErrorsSnapshot.current)) {
      formErrorsSnapshot.current = errors;

      if (onFormErrors) {
        onFormErrors(formErrorsSnapshot.current);
      }
    }
  }, [formik.errors, formik.touched, fields, onFormErrors]);

  return (
    <Grid spacing={spacing} {...rest} container>
      {fields.map(
        ({ gridProps, visible, error, ...configs }) => {
          const restFieldConfig: FormikFormField<T> = {
            ...configs,
          };

          if (
            error === true ||
            (typeof error === 'string' && error)
          ) {
            restFieldConfig.error = true;
          }

          if (typeof error === 'string') {
            restFieldConfig.helperText = error;
          }

          if (visible === false) {
            return null;
          }

          return (
            <Grid
              key={`grid-item-${configs.id as string}`}
              size={12}
              {...gridProps}
            >
              {renderField(restFieldConfig)}
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default FormikForm;
