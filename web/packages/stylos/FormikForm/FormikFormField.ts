import type { FormikValues } from 'formik';
import type { Grid2Props as GridProps } from '@mui/material/Grid2';

import type { FormikDatePickerProps } from './FormikDatePicker/FormikDatePicker';
import type { FormikTextFieldProps } from './FormikTextField/FormikTextField';

export type BaseField<T extends FormikValues> = {
  id: keyof T;
  label?: string;
  visible?: boolean;
  disabled?: boolean;
  error?: boolean;
  description?: string;
  gridProps?: Partial<GridProps>;
};

export type TextField<T extends FormikValues> = Omit<
  FormikTextFieldProps<T>,
  'formik' | 'variant'
> & {
  fieldType?: 'text';
  options?: {
    value: string;
    label: string;
  }[];
};

export type DateField<T extends FormikValues> = Omit<
  FormikDatePickerProps<T>,
  'formik'
> & {
  fieldType?: 'date';
};

export type DateTextField<T extends FormikValues> = Omit<
  FormikTextFieldProps<T>,
  'formik' | 'variant' | 'mask'
> & {
  fieldType?: 'dateText';
  format?: string;
  displayFormat?: string;
  formatDensity?: 'dense' | 'loose';
  mask?: boolean;
};

export type NumericSelectField<T extends FormikValues> =
  Omit<FormikTextFieldProps<T>, 'formik' | 'variant'> & {
    fieldType?: 'numericSelect';
    min: number;
    max: number;
  };

export type FormikFormField<T extends FormikValues> =
  BaseField<T> &
    (
      | TextField<T>
      | DateField<T>
      | DateTextField<T>
      | NumericSelectField<T>
    );
