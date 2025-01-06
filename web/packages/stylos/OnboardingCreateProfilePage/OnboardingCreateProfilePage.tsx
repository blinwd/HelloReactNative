import { Platform } from 'react-native';

import * as Yup from 'yup';
import type { FormikConfig } from 'formik';
import { useFormik } from 'formik';
import { useT, T } from '@transifex/react';
import Button from '@mui/material/Button';

import type { PageProps } from '@/stylos/Page';
import Page from '@/stylos/Page';
import { feet, inches, weight, string } from './yup';
import type { OnboardingCreateProfileFormProps } from './OnboardingCreateProfileForm';
import OnboardingCreateProfileForm from './OnboardingCreateProfileForm';
import type { CreateProfileFormValues } from './constants';

export type OnboardingCreateProfilePageProps = PageProps & {
  initialValues?: CreateProfileFormValues;
  disabledFields?: Partial<{
    [K in keyof CreateProfileFormValues]: boolean;
  }>;
  validationSchema?: FormikConfig<CreateProfileFormValues>['validationSchema'];
  platformOS?: Platform['OS'];
  onContinue: FormikConfig<CreateProfileFormValues>['onSubmit'];
  onFieldBlur?: OnboardingCreateProfileFormProps['onFieldBlur'];
  onFormErrors?: OnboardingCreateProfileFormProps['onFormErrors'];
  additionalFormProps?: Partial<OnboardingCreateProfileFormProps>;
};

const OnboardingCreateProfilePage: React.FC<
  OnboardingCreateProfilePageProps
> = ({
  initialValues,
  disabledFields,
  validationSchema,
  platformOS = 'web',
  onFieldBlur,
  onFormErrors,
  onContinue,
  additionalFormProps,
  ...rest
}) => {
  const t = useT();
  const requiredString = t('Required');
  const formik = useFormik<CreateProfileFormValues>({
    initialValues: initialValues || {
      feet: '',
      inches: '',
      weight: '',
      gender: '',
      ethnicity: '',
    },
    validationSchema:
      validationSchema ||
      Yup.object({
        feet: feet(
          requiredString,
          t('Height (ft) is invalid')
        ),
        inches: inches(
          requiredString,
          t('Height (in) is invalid')
        ),
        weight: weight(
          requiredString,
          t('Weight is invalid')
        ),
        gender: string(requiredString),
        ethnicity: string(requiredString),
      }),
    onSubmit: onContinue,
  });

  return (
    <Page
      className="create-profile-page"
      pageTitle={t("Let's create your profile")}
      pageSubtitle={t(
        'This info helps us understand you, mind and body.'
      )}
      pageFooter={
        <Button
          type="submit"
          size="large"
          disabled={formik.isSubmitting}
          onClick={() => formik.handleSubmit()}
          fullWidth
        >
          <T _str="Continue" />
        </Button>
      }
      platformOS={platformOS}
      {...rest}
    >
      <OnboardingCreateProfileForm
        formik={formik}
        disabledFields={disabledFields}
        onFieldBlur={onFieldBlur}
        onFormErrors={onFormErrors}
        {...additionalFormProps}
      />
    </Page>
  );
};

export default OnboardingCreateProfilePage;
