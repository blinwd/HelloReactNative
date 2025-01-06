'use dom';

import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@/global.css';
import designSystemTheme from '@/stylos/theme';
import { OnboardingAccountCreationPage } from '@/stylos/OnboardingAccountCreationPage';
import OnboardingCreateProfilePage from '@/web/packages/stylos/OnboardingCreateProfilePage';

type OnboardingProps = {
  error?: string;
  colorScheme?: 'light' | 'dark';
  platformOS?: Platform['OS'];
  onContinueClick?: (formData: any) => void;
};

const Onboarding = ({
  error,
  colorScheme,
  platformOS = 'web',
  onContinueClick,
}: OnboardingProps) => {
  const formikRef = useRef<any>(null);

  const darkTheme = createTheme({
    ...designSystemTheme,
    palette: {
      mode: colorScheme === 'dark' ? 'dark' : 'light',
    },
  });

  const [data, setData] = useState({});
  const [screen, setScreen] = useState('accountCreation');

  useEffect(() => {
    if (error && formikRef.current) {
      formikRef.current.setSubmitting(false);
    }
  }, [error]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {screen === 'accountCreation' && (
        <OnboardingAccountCreationPage
          platformOS={platformOS}
          onContinue={(formData: any) => {
            setData((prev) => ({
              ...prev,
              ...formData,
            }));

            setScreen('createProfile');
          }}
        />
      )}
      {screen === 'createProfile' && (
        <OnboardingCreateProfilePage
          platformOS={platformOS}
          onContinue={(formData, formikHelpers) => {
            setData((prev) => ({
              ...prev,
              formData,
            }));

            formikRef.current = formikHelpers;

            if (onContinueClick) {
              onContinueClick({
                ...data,
                formData,
              });
            }
          }}
        />
      )}
    </ThemeProvider>
  );
};

export default Onboarding;
