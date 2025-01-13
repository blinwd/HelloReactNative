import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Link } from 'expo-router';
import { ExternalLink } from '@/components/ExternalLink';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { useAppContext } from '@/contexts/AppContext';
import { useAuthContext } from '@/contexts/AuthContext';
import PageView from '@/components/PageView';
import TopNavBar from '@/templates/TopNavBar';

export default function HomeScreen() {
  const { isAuthenticated } = useAppContext();
  const { signOut } = useAuthContext();

  return (
    <PageView topNavBar={<TopNavBar />}>
      <ParallaxScrollView
        headerBackgroundColor={{
          light: '#A1CEDC',
          dark: '#1D3D47',
        }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Step 1: Try it
          </ThemedText>
          <ThemedText>
            Edit{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/index.tsx
            </ThemedText>{' '}
            to see changes. Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Step 2: Explore
          </ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's
            included in this starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Step 3: Get a fresh start
          </ThemedText>
          <ThemedText>
            When you're ready, run{' '}
            <ThemedText type="defaultSemiBold">
              npm run reset-project
            </ThemedText>{' '}
            to get a fresh{' '}
            <ThemedText type="defaultSemiBold">
              app
            </ThemedText>{' '}
            directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">
              app
            </ThemedText>{' '}
            to{' '}
            <ThemedText type="defaultSemiBold">
              app-example
            </ThemedText>
            .
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore</ThemedText>
        </ThemedView>
        <ThemedText>
          This app includes example code to help you get
          started.
        </ThemedText>
        <Collapsible title="File-based routing">
          <ThemedText>
            This app has two screens:{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/index.tsx
            </ThemedText>{' '}
            and{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/explore.tsx
            </ThemedText>
          </ThemedText>
          <ThemedText>
            The layout file in{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/_layout.tsx
            </ThemedText>{' '}
            sets up the tab navigator.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Android, iOS, and web support">
          <ThemedText>
            You can open this project on Android, iOS, and
            the web. To open the web version, press{' '}
            <ThemedText type="defaultSemiBold">
              w
            </ThemedText>{' '}
            in the terminal running this project.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Images">
          <ThemedText>
            For static images, you can use the{' '}
            <ThemedText type="defaultSemiBold">
              @2x
            </ThemedText>{' '}
            and{' '}
            <ThemedText type="defaultSemiBold">
              @3x
            </ThemedText>{' '}
            suffixes to provide files for different screen
            densities
          </ThemedText>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={{ alignSelf: 'center' }}
          />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Custom fonts">
          <ThemedText>
            Open{' '}
            <ThemedText type="defaultSemiBold">
              app/_layout.tsx
            </ThemedText>{' '}
            to see how to load{' '}
            <ThemedText style={{ fontFamily: 'SpaceMono' }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Light and dark mode components">
          <ThemedText>
            This template has light and dark mode support.
            The{' '}
            <ThemedText type="defaultSemiBold">
              useColorScheme()
            </ThemedText>{' '}
            hook lets you inspect what the user's current
            color scheme is, and so you can adjust UI colors
            accordingly.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Animations">
          <ThemedText>
            This template includes an example of an animated
            component. The{' '}
            <ThemedText type="defaultSemiBold">
              components/HelloWave.tsx
            </ThemedText>{' '}
            component uses the powerful{' '}
            <ThemedText type="defaultSemiBold">
              react-native-reanimated
            </ThemedText>{' '}
            library to create a waving hand animation.
          </ThemedText>
          {Platform.select({
            ios: (
              <ThemedText>
                The{' '}
                <ThemedText type="defaultSemiBold">
                  components/ParallaxScrollView.tsx
                </ThemedText>{' '}
                component provides a parallax effect for the
                header image.
              </ThemedText>
            ),
          })}
        </Collapsible>

        <Collapsible title="Demo Links">
          <ThemedView style={styles.stepContainer}>
            <Link href="/onboarding/provider-matching-success-page">
              <ThemedText type="link">
                Onboarding Provider Matching Success page
              </ThemedText>
            </Link>
            <Link href="/onboarding/tavus">
              <ThemedText type="link">
                Tavus demo page
              </ThemedText>
            </Link>
          </ThemedView>
        </Collapsible>

        {Platform.OS !== 'web' ? (
          <>
            {isAuthenticated ? (
              <ThemedView>
                <TouchableOpacity
                  className="py-4 px-6 rounded-full bg-purple-800 self-start"
                  onPress={() => signOut('/sign-in')}
                >
                  <Text className="text-white">
                    Log Out
                  </Text>
                </TouchableOpacity>
              </ThemedView>
            ) : (
              <ThemedView>
                <TouchableOpacity
                  className="py-4 px-6 rounded-full bg-purple-800 self-start"
                  onPress={() => signOut('/sign-in')}
                >
                  <Text className="text-white">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </ThemedView>
            )}
          </>
        ) : null}
      </ParallaxScrollView>
    </PageView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
