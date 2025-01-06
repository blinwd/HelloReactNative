import React from 'react';

import type { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DesktopDatePickerProps as MuiDesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopDatePicker as MuiDesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

/**
 * With 'responsive' variant, it renders the calendar view based on user's platform. When on mobile,
 * it renders the view inside a modal and doesn't allow editing values directly inside the input field.
 * When on desktop, it renders the view inside a popover and allows editing values directly inside
 * the input field.
 *
 * With 'desktop' variant, it renders the calendar view inside a popover and allows editing values
 * directly inside the field.
 */
export type DatePickerProps =
  | (MuiDatePickerProps<Dayjs> & {
      variant?: 'responsive';
    })
  | (MuiDesktopDatePickerProps<Dayjs> & {
      variant?: 'desktop';
    });

const DatePicker: React.FC<DatePickerProps> = ({
  variant = 'desktop',
  ...restProps
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {variant === 'responsive' ? (
      <MuiDatePicker {...restProps} />
    ) : (
      <MuiDesktopDatePicker {...restProps} />
    )}
  </LocalizationProvider>
);

export default DatePicker;
