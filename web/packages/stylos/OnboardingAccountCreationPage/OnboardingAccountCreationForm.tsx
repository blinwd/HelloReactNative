import React, { useCallback, useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useT, T } from '@transifex/react';
import type { FormikProps } from 'formik';

import type {
  FormikFormProps,
  FormikDateFieldProps,
} from '@/stylos/FormikForm';
import FormikForm from '@/stylos/FormikForm';

export type OnboardingAccountCreationFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  dob: string;

  // for three checkboxes
  smsAllowed: boolean;
  termsAndConditionsAccepted: boolean;
  informedConsentAccepted: boolean;
};

export type OnboardingAccountCreationFormProps =
  GridProps & {
    formik: FormikProps<OnboardingAccountCreationFormValues>;
    disabledFields?: Partial<{
      [K in keyof OnboardingAccountCreationFormValues]: boolean;
    }>;
    phoneFormat?: string;
    dateFormat?: string;
    dateDisplayFormat?: string;
    datePlaceholder?: string;
    dateFormatDensity?: FormikDateFieldProps<OnboardingAccountCreationFormValues>['formatDensity'];
    dateFormatMask?: FormikDateFieldProps<OnboardingAccountCreationFormValues>['mask'];
    onFieldBlur?: FormikFormProps<OnboardingAccountCreationFormValues>['onFieldBlur'];
    onFormErrors?: FormikFormProps<OnboardingAccountCreationFormValues>['onFormErrors'];
  };

const OnboardingAccountCreationForm: React.FC<
  OnboardingAccountCreationFormProps
> = ({
  formik,
  disabledFields,
  spacing = 3,
  phoneFormat = '(000) 000-0000',
  dateFormat = 'MM/DD/YYYY',
  dateDisplayFormat,
  datePlaceholder = 'MM / DD / YYYY',
  dateFormatDensity = 'loose',
  dateFormatMask = true,
  onFieldBlur,
  onFormErrors,
  ...restProps
}) => {
  const t = useT();

  const [showPassword, setShowPassword] = useState(false);

  const onPhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      formik.setFieldValue(
        'smsAllowed',
        typeof value === 'string' && value.length > 0
      );

      formik.handleChange(e);
    },
    [formik]
  );

  return (
    <Grid container spacing={spacing} {...restProps}>
      <Grid size={12}>
        <FormikForm
          formik={formik}
          fields={[
            {
              id: 'firstName',
              label: t('First Name'),
              disabled: disabledFields?.firstName === true,
              autoComplete: 'given-name',
              gridProps: {
                size: {
                  xs: 12,
                  sm: 6,
                },
              },
            },
            {
              id: 'lastName',
              label: t('Last Name'),
              disabled: disabledFields?.lastName === true,
              autoComplete: 'family-name',
              gridProps: {
                size: {
                  xs: 12,
                  sm: 6,
                },
              },
            },
            {
              id: 'email',
              label: t('Email Address'),
              disabled: disabledFields?.email === true,
              autoComplete: 'username',
            },
            {
              id: 'phone',
              label: t('Phone Number (Optional)'),
              disabled: disabledFields?.phone === true,
              autoComplete: 'tel',
              mask: phoneFormat,
              inputProps: {
                inputMode: 'numeric',
              },
              onChange: onPhoneChange,
            },
            {
              id: 'dob',
              label: t('Birthday'),
              fieldType: 'dateText',
              disabled: disabledFields?.dob === true,
              className: 'birthday-date-picker',
              placeholder: datePlaceholder,
              format: dateFormat,
              displayFormat: dateDisplayFormat,
              formatDensity: dateFormatDensity,
              mask: dateFormatMask,
              inputProps: {
                inputMode: 'numeric',
              },
            },
            {
              id: 'password',
              label: t('Password'),
              type: showPassword ? 'text' : 'password',
              disabled: disabledFields?.password === true,
              autoComplete: 'new-password',
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      role="button"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            },
          ]}
          spacing={spacing}
          onFieldBlur={onFieldBlur}
          onFormErrors={onFormErrors}
        />
      </Grid>
      <Grid size={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="termsAndConditionsAccepted"
              checked={
                formik.values.termsAndConditionsAccepted
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
          }
          label={
            <Typography variant="body2" component="span">
              <T
                _str="I have read and agree to the {terms}, {privacy} & {notice}."
                terms={
                  <Link
                    href="https://www.vida.com/terms-of-use/"
                    color="primary"
                    target="_blank"
                  >
                    <T _str="Terms of Use" />
                  </Link>
                }
                privacy={
                  <Link
                    href="https://www.vida.com/privacy-policy/"
                    color="primary"
                    target="_blank"
                  >
                    <T _str="Privacy Policy" />
                  </Link>
                }
                notice={
                  <Link
                    href="https://www.vida.com/noticeofprivacypolicy/"
                    color="primary"
                    target="_blank"
                  >
                    <T _str="Notice of Privacy Policy" />
                  </Link>
                }
              />

              {formik.touched.termsAndConditionsAccepted &&
                formik.errors
                  .termsAndConditionsAccepted && (
                  <FormHelperText error>
                    {
                      formik.errors
                        .termsAndConditionsAccepted
                    }
                  </FormHelperText>
                )}
            </Typography>
          }
        />
      </Grid>
      <Grid size={12}>
        <FormControlLabel
          control={
            <Checkbox
              id="informedConsentAccepted"
              checked={
                formik.values.informedConsentAccepted
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
          }
          label={
            <Typography variant="body2" component="span">
              <T _str="I have read and agree to the" />{' '}
              <Link
                href="https://www.vida.com/clinical-services-and-practice-policies-agreement/"
                color="primary"
                target="_blank"
              >
                <T _str="Clinical Services and Practice Policies Agreement" />
              </Link>
              .
              {formik.touched.informedConsentAccepted &&
                formik.errors.informedConsentAccepted && (
                  <FormHelperText error>
                    {formik.errors.informedConsentAccepted}
                  </FormHelperText>
                )}
            </Typography>
          }
        />
      </Grid>
      <Grid size={12}>
        <Typography variant="body2">
          <T
            _str="By entering a phone number above you agree to have Vida send SMS
              messages."
          />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OnboardingAccountCreationForm;
