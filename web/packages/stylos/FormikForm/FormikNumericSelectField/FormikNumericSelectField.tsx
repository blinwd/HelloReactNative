import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';

import type { FormikValues } from 'formik';
import MenuItem from '@mui/material/MenuItem';

import type { FormikTextFieldProps } from '../FormikTextField';
import FormikTextField from '../FormikTextField';

export type FormikNumericSelectFieldProps<
  P extends FormikValues
> = FormikTextFieldProps<P> & {
  /**
   * The minimum of select option.
   */
  min: number;

  /**
   * The maximum of select option.
   */
  max: number;
};

const FormikNumericSelectField = <V extends FormikValues>({
  min,
  max,
  ...rest
}: FormikNumericSelectFieldProps<V>): JSX.Element => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = useMemo(() => {
    if (
      typeof min === 'number' &&
      typeof max === 'number'
    ) {
      const options = [];

      for (let idx = min; idx <= max; idx += 1) {
        options.push(
          <MenuItem key={idx} value={idx}>
            {idx}
          </MenuItem>
        );
      }

      return options;
    }

    return [];
  }, [min, max]);

  useEffect(() => {
    const inputNode = inputRef.current;

    const handleKeyupEvent = ({ key }: KeyboardEvent) => {
      if (
        [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '0',
        ].includes(key)
      ) {
        setIsMenuOpen(true);
      }
    };

    inputNode?.removeEventListener(
      'keyup',
      handleKeyupEvent
    );
    inputNode?.addEventListener('keyup', handleKeyupEvent);

    return () => {
      inputNode?.removeEventListener(
        'keyup',
        handleKeyupEvent
      );
    };
  }, []);

  return (
    <FormikTextField
      ref={inputRef}
      {...rest}
      select
      SelectProps={{
        open: isMenuOpen,
        onOpen: () => setIsMenuOpen(true),
        onClose: () => setIsMenuOpen(false),
      }}
    >
      {menuItems}
    </FormikTextField>
  );
};

export default FormikNumericSelectField;
