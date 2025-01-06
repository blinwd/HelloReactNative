import { useMemo } from 'react';

import { useT } from '@transifex/react';
import type { Grid2Props as GridProps } from '@mui/material/Grid2';
import type { FormikProps } from 'formik';

import type {
  FormikFormProps,
  FormikFormField,
} from '@/stylos/FormikForm';
import FormikForm from '@/stylos/FormikForm';
import { Ethnicity, Gender } from './constants';
import type { CreateProfileFormValues } from './constants';

export interface OnboardingCreateProfileFormProps
  extends GridProps {
  formik: FormikProps<CreateProfileFormValues>;
  disabledFields?: Partial<{
    [K in keyof CreateProfileFormValues]: boolean;
  }>;
  onFieldBlur?: FormikFormProps<CreateProfileFormValues>['onFieldBlur'];
  onFormErrors?: FormikFormProps<CreateProfileFormValues>['onFormErrors'];
}

const OnboardingCreateProfileForm: React.FC<
  OnboardingCreateProfileFormProps
> = ({ disabledFields, ...restProps }) => {
  const t = useT();

  const EthnicityList = useMemo(
    () => [
      {
        value: Ethnicity.AMERICAN_INDIAN_OR_ALASKA_NATIVE,
        label: t('American Indian or Alaska Native'),
      },
      {
        value: Ethnicity.ASIAN,
        label: t('Asian American'),
      },
      {
        value: Ethnicity.BLACK,
        label: t('Black or African American'),
      },
      {
        value: Ethnicity.HISPANIC,
        label: t('Hispanic or Latino'),
      },
      {
        value: Ethnicity.PACIFIC_ISLANDER,
        label: t(
          'Native Hawaiian or Other Pacific Islander'
        ),
      },
      {
        value: Ethnicity.WHITE,
        label: t('White or Caucasian'),
      },
      { value: Ethnicity.OTHER, label: t('Other') },
      {
        value: Ethnicity.PREFER_NOT_TO_STATE,
        label: t('Prefer not to state'),
      },
    ],
    [t]
  );

  const formFields: FormikFormField<CreateProfileFormValues>[] =
    useMemo(
      () => [
        {
          id: 'feet',
          name: 'feet',
          label: t('Height (ft)'),
          disabled: disabledFields?.feet === true,
          fieldType: 'numericSelect',
          min: 3,
          max: 8,
          gridProps: {
            size: {
              xs: 12,
              sm: 6,
            },
          },
        },
        {
          id: 'inches',
          name: 'inches',
          label: t('Height (in)'),
          disabled: disabledFields?.inches === true,
          fieldType: 'numericSelect',
          min: 0,
          max: 11,
          gridProps: {
            size: {
              xs: 12,
              sm: 6,
            },
          },
        },
        {
          id: 'weight',
          label: t('Weight (lbs)'),
          name: 'weight',
          disabled: disabledFields?.weight === true,
          type: 'number',
          inputProps: {
            inputMode: 'numeric',
          },
        },
        {
          id: 'gender',
          name: 'gender',
          label: t('Gender'),
          disabled: disabledFields?.gender === true,
          options: [
            {
              value: Gender.Male,
              label: t('Male'),
            },
            {
              value: Gender.Female,
              label: t('Female'),
            },
            {
              value: Gender.Other,
              label: t('Other'),
            },
          ],
        },
        {
          id: 'ethnicity',
          name: 'ethnicity',
          label: t('Ethnicity'),
          disabled: disabledFields?.gender === true,
          options: EthnicityList.map(
            ({ label, value }) => ({
              label,
              value,
            })
          ),
        },
      ],
      [
        EthnicityList,
        disabledFields?.feet,
        disabledFields?.gender,
        disabledFields?.inches,
        disabledFields?.weight,
        t,
      ]
    );

  return <FormikForm fields={formFields} {...restProps} />;
};

export default OnboardingCreateProfileForm;
