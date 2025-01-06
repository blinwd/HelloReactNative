import React from 'react';
import { Platform } from 'react-native';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useT, T } from '@transifex/react';
import type { FormikConfig } from 'formik';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import type { PageProps } from '@/stylos/Page';
import type { ContactSupportCardProps } from '@/stylos/ContactSupportCard';
import Page from '@/stylos/Page';
import ContactVscSupport from '@/stylos/ContactVscSupport';

import {
  bool as boolSchema,
  email as emailSchema,
  string as stringSchema,
  birthday as birthdaySchema,
  phone as phoneSchema,
  password as passwordSchema,
} from './yup';

import type {
  OnboardingAccountCreationFormProps,
  OnboardingAccountCreationFormValues,
} from './OnboardingAccountCreationForm';
import OnboardingAccountCreationForm from './OnboardingAccountCreationForm';

export type OnboardingAccountCreationPageProps = PageProps &
  Pick<
    OnboardingAccountCreationFormProps,
    | 'disabledFields'
    | 'phoneFormat'
    | 'onFieldBlur'
    | 'dateFormat'
    | 'dateDisplayFormat'
    | 'datePlaceholder'
    | 'dateFormatDensity'
    | 'dateFormatMask'
    | 'onFormErrors'
  > & {
    platformOS?: Platform['OS'];
    initialValues?: OnboardingAccountCreationFormValues;
    validationSchema?: FormikConfig<OnboardingAccountCreationFormValues>['validationSchema'];
    contactSupportCardProps?: ContactSupportCardProps;
    signInLink?: string;
    additionalFormProps?: Partial<OnboardingAccountCreationFormProps>;
    onContinue: FormikConfig<OnboardingAccountCreationFormValues>['onSubmit'];
    onSignInLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;
  };

const OnboardingAccountCreationPage: React.FC<
  OnboardingAccountCreationPageProps
> = ({
  initialValues,
  validationSchema,
  disabledFields,
  contactSupportCardProps,
  signInLink,
  phoneFormat,
  dateFormat = 'MM/DD/YYYY',
  dateDisplayFormat,
  datePlaceholder,
  dateFormatDensity,
  dateFormatMask,
  platformOS = 'web',
  onContinue,
  onFieldBlur,
  onFormErrors,
  onSignInLinkClick,
  additionalFormProps,
  ...rest
}) => {
  const t = useT();

  const requiredString = t('Required', {
    _comment: 'For fields in a form that are required.',
  }) as string;

  const formik =
    useFormik<OnboardingAccountCreationFormValues>({
      initialValues: {
        firstName: initialValues?.firstName || '',
        lastName: initialValues?.lastName || '',
        phone: initialValues?.phone || '',
        email: initialValues?.email || '',
        password: initialValues?.password || '',
        dob: initialValues?.dob || '',
        smsAllowed: initialValues?.smsAllowed === true,
        termsAndConditionsAccepted:
          initialValues?.termsAndConditionsAccepted ===
          true,
        informedConsentAccepted:
          initialValues?.informedConsentAccepted === true,
      },
      validationSchema:
        validationSchema ||
        Yup.object({
          firstName: stringSchema(requiredString),
          lastName: stringSchema(requiredString),
          email: emailSchema(
            requiredString,
            t('Must be a valid email')
          ),
          phone: phoneSchema(
            t('Please enter a valid phone number')
          ),
          password: passwordSchema(
            requiredString,
            t('Must have at least 8 characters'),
            t('Must have at least 1 symbol'),
            t('Must have at least 1 number'),
            t('Must have at least 1 uppercase')
          ),
          dob: birthdaySchema(
            requiredString,
            t('Birthday is invalid'),
            t('You should be at least 18 years old'),
            dateFormat
          ),
          termsAndConditionsAccepted:
            boolSchema(requiredString),
          informedConsentAccepted:
            boolSchema(requiredString),
        }),
      onSubmit: onContinue,
    });

  return (
    <Page
      pageTitle={t("Let's set up your account")}
      pageSubtitle={
        <ContactVscSupport
          supportDescription={t(
            'For help signing up, call (833) 670-5552'
          )}
          {...contactSupportCardProps}
        />
      }
      pageFooter={
        <Grid container spacing={2}>
          <Grid size={12}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={formik.isSubmitting}
              onClick={() => {
                formik.handleSubmit();
              }}
              fullWidth
            >
              <T _str="Continue" />
            </Button>
          </Grid>
          {signInLink && (
            <Grid size={12} textAlign="center">
              <Typography p={2}>
                <T _str="Already have an account?" />{' '}
                <Link
                  color="primary"
                  sx={{
                    textDecoration: 'none',
                  }}
                  href={signInLink}
                  onClick={onSignInLinkClick}
                >
                  <T _str="Sign in" />
                </Link>
              </Typography>
            </Grid>
          )}
        </Grid>
      }
      platformOS={platformOS}
      {...rest}
    >
      <OnboardingAccountCreationForm
        formik={formik}
        disabledFields={disabledFields}
        phoneFormat={phoneFormat}
        dateFormat={dateFormat}
        dateDisplayFormat={dateDisplayFormat}
        datePlaceholder={datePlaceholder}
        dateFormatDensity={dateFormatDensity}
        dateFormatMask={dateFormatMask}
        onFieldBlur={onFieldBlur}
        onFormErrors={onFormErrors}
        {...additionalFormProps}
      />
    </Page>
  );
};

export default OnboardingAccountCreationPage;
