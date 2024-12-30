import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import type { ImageStyle } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Link, usePathname, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { TopBarLinks } from '@/constants/TopBarLinks';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';

type TopNavBarProps = {
  imageStyles?: ImageStyle;
  className?: string;
};

const TopNavBar = ({
  imageStyles,
  className = '',
}: TopNavBarProps) => {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppContext();
  const { signOut } = useAuthContext();

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Render the content of the top navbar.
  // This method is called twice, once for the desktop and
  // once for the mobile.
  const renderContent = useCallback(() => {
    return (
      <>
        {isPanelOpen && (
          <View className="w-full items-end mb-8">
            <TouchableOpacity
              className="px-4 py-2 rounded-full transition-colors hover:bg-slate-200"
              onPress={() => setIsPanelOpen(false)}
            >
              <ThemedText className="text-purple-800">
                Close
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        <View
          className={
            isPanelOpen
              ? 'items-start space-y-4'
              : 'flex-row flex-1 items-center justify-center space-x-4'
          }
        >
          {TopBarLinks?.map((link) => (
            <TouchableOpacity
              key={link.label}
              className={`px-4 py-2 rounded-full transition-colors ${
                pathname === link.href
                  ? `${isPanelOpen ? '' : 'bg-purple-800'}`
                  : 'hover:bg-slate-200'
              }`}
              onPress={() => {
                setIsPanelOpen(false);
                router.push(link.href);
              }}
            >
              <Text
                className={
                  pathname === link.href
                    ? isPanelOpen
                      ? `text-purple-800`
                      : 'text-white'
                    : ''
                }
                style={{
                  fontWeight:
                    isPanelOpen && pathname === link.href
                      ? 700
                      : 400,
                }}
              >
                {link.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isPanelOpen && (
          <View className="w-[calc(100%-2rem)] border-t border-gray-300 m-4 my-8" />
        )}

        {isAuthenticated ? (
          <View
            className={
              isPanelOpen ? 'flex-col gap-2' : 'flex-row'
            }
          >
            <Text
              className="mx-4 text-purple-800"
              style={{
                fontWeight: 600,
              }}
            >
              {user?.email}
            </Text>
            <TouchableOpacity
              className={
                isPanelOpen
                  ? 'px-4 py-2 rounded-full hover:bg-slate-200'
                  : ''
              }
              onPress={() => signOut()}
            >
              <Text>Log out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Link
            className={`${
              isPanelOpen
                ? 'px-4 py-2 rounded-full hover:bg-slate-200'
                : ''
            }`}
            href="/sign-in"
          >
            <ThemedText>Log In</ThemedText>
          </Link>
        )}
      </>
    );
  }, [isPanelOpen, pathname, user]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      () => {
        setIsPanelOpen(false);
      }
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View
      className={`flex-row items-center justify-between p-4 gap-4 z-auto bg-white ${className}`}
    >
      {/* Logo */}
      <Image
        source={require('@/assets/images/vida-logo.svg')}
        style={[styles.image, imageStyles]}
        resizeMode="contain"
      />

      {/* Desktop Links */}
      <View className="flex-row flex-1 items-center hidden lg:flex">
        {renderContent()}
      </View>

      {/* Mobile Panel */}
      {isPanelOpen && (
        <>
          {/* Mobile Panel Overlay */}
          <TouchableOpacity
            className="fixed inset-y-0 right-0 z-50 w-full bg-black bg-opacity-50 lg:hidden"
            onPress={(e) => {
              e.stopPropagation();
              setIsPanelOpen(false);
              return;
            }}
            activeOpacity={1}
          />

          {/* Mobile Panel Content */}
          <View className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm items-start">
            {renderContent()}
          </View>
        </>
      )}

      {/* Hamburger Menu */}
      <TouchableOpacity
        className="lg:hidden"
        onPress={() => setIsPanelOpen(true)}
      >
        <Image
          source={require('@/assets/images/hamburger-menu.svg')}
          style={[styles.image]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
  link: {
    fontWeight: 600,
  },
});

export default TopNavBar;
