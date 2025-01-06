import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import PageView from '@/components/PageView';
import Onboarding from '@/web/pages/onboarding';

type SignUpPageProps = {
  onSignInClick: () => void;
};

const SignUpPage = ({ onSignInClick }: SignUpPageProps) => {
  const colorScheme = useColorScheme();

  return (
    <PageView>
      <Onboarding
        colorScheme={colorScheme}
        platformOS={Platform.OS}
        onBackClick={onSignInClick}
      />
    </PageView>
  );
};

export default SignUpPage;
