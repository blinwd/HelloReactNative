import React, { useCallback } from 'react';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import MuiTextField from '@mui/material/TextField';
import type { DOMProps } from 'expo/dom';
import { applyMask } from './applyMask';

export type TextFieldProps = MuiTextFieldProps & {
  /**
   * '0' represents 0-9 numeric characters. For example,
   * (000) 000-0000 for US phone number, or
   * 0000/00/00 for YYYY/MM/DD
   */
  mask?: string;

  /**
   * 'dense' example: '01/02/1990'
   * 'loose' example: '01 / 02 / 1990'
   */
  formatDensity?: 'dense' | 'loose';
};

const TextField = React.forwardRef<
  HTMLDivElement,
  TextFieldProps
>(
  (
    { mask, formatDensity, value, onChange, ...restProps },
    ref
  ) => {
    const handleChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      (event) => {
        const { target } = event;

        let newValue = target.value;

        // handle mask formatting as user types
        if (mask && typeof newValue === 'string') {
          // apply mask if it's defined
          newValue = applyMask(
            target.value,
            mask,
            formatDensity
          );

          // new formatted value
          target.value = newValue;
        }

        if (onChange) {
          onChange(event);
        }

        return event;
      },
      [mask, formatDensity, onChange]
    );

    return (
      <MuiTextField
        ref={ref}
        value={
          typeof value === 'string'
            ? applyMask(value, mask, formatDensity)
            : value
        }
        onChange={handleChange}
        {...restProps}
      />
    );
  }
);

export default TextField;
