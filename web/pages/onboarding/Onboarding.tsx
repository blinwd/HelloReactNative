'use dom';

import { Platform } from 'react-native';
import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@/global.css';
import designSystemTheme from '@/stylos/theme';
import { OnboardingAccountCreationPage } from '@/stylos/OnboardingAccountCreationPage';

type OnboardingProps = {
  colorScheme?: 'light' | 'dark';
  platformOS?: Platform['OS'];
  onBackClick?: () => void;
};

const Onboarding = ({
  colorScheme,
  platformOS = 'web',
}: OnboardingProps) => {
  const darkTheme = createTheme({
    ...designSystemTheme,
    palette: {
      mode: colorScheme === 'dark' ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <OnboardingAccountCreationPage
        platformOS={platformOS}
        onContinue={() => {
          // TODO: Implement continue logic
        }}
      />
    </ThemeProvider>
  );
};

export default Onboarding;
