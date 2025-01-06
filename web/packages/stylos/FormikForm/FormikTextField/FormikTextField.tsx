import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import type {
  FormikValues,
  FormikState,
  FormikHelpers,
  FormikHandlers,
} from 'formik';

import type { TextFieldProps } from '@/stylos/TextField';
import TextField from '@/stylos/TextField';

export type FormikTextFieldProps<P extends FormikValues> =
  TextFieldProps & {
    /**
     * The unique id for identifying the property inside formik's values, errors, touched, etc.
     */
    id: keyof P;

    /**
     * Formik config object derived from calling useFormik hook.
     */
    formik: FormikHelpers<P> &
      FormikState<P> &
      FormikHandlers;

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

type FormikTextFieldWithForwardedRefProps<
  T extends FormikValues
> = FormikTextFieldProps<T> & {
  ref?: React.ForwardedRef<HTMLDivElement>;
};

function FormikTextFieldWithForwardedRef<
  V extends FormikValues
>(
  {
    id,
    name,
    formik,
    sx,
    error,
    helperText,
    onFieldBlur,
    onFieldError,
    ...rest
  }: FormikTextFieldProps<V>,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const fieldError = formik?.errors[id];

  const isFieldTouched = formik?.touched[id] === true;

  const isFieldInErrorState =
    error === true
      ? true
      : !!(
          isFieldTouched && typeof fieldError === 'string'
        );

  const fieldHelperText = useMemo(() => {
    if (typeof helperText === 'string') {
      return helperText;
    }

    if (
      isFieldInErrorState &&
      typeof fieldError === 'string'
    ) {
      return fieldError;
    }

    return null;
  }, [isFieldInErrorState, fieldError, helperText]);

  const handleBlur = useCallback<
    React.FocusEventHandler<
      HTMLTextAreaElement | HTMLInputElement
    >
  >(
    (e) => {
      formik.handleBlur(e);

      if (id && onFieldBlur) {
        onFieldBlur(id, e.target.value);
      }
    },
    [id, formik, onFieldBlur]
  );

  useEffect(() => {
    if (id && isFieldTouched && onFieldError) {
      onFieldError(id, fieldHelperText);
    }
  }, [id, isFieldTouched, fieldHelperText, onFieldError]);

  return (
    <TextField
      ref={ref}
      id={id}
      name={id || name}
      value={formik?.values[id]}
      error={isFieldInErrorState}
      helperText={fieldHelperText}
      sx={{
        '& > .MuiInputBase-root': {
          '.MuiSelect-select': {
            color: ({ palette }) => palette.text.primary,
          },
        },
        ...sx,
      }}
      fullWidth
      onChange={formik?.handleChange}
      onBlur={handleBlur}
      {...rest}
    />
  );
}

// use type assertion for generics while using React.forwardRef
const FormikTextField = React.forwardRef(
  FormikTextFieldWithForwardedRef
) as <T extends FormikValues>(
  props: FormikTextFieldWithForwardedRefProps<T>
) => ReturnType<typeof FormikTextFieldWithForwardedRef>;

export default FormikTextField;
