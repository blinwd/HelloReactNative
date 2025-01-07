import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuthContext } from '@/contexts/AuthContext';
import PageView from '@/components/PageView';

type SignInPageProps = {
  onSignUpClick: () => void;
};

const SignInPage = ({ onSignUpClick }: SignInPageProps) => {
  const { signIn, errors } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isWeb = Platform.OS === 'web';
  const isNative = !isWeb;

  return (
    <PageView>
      <ThemedView
        className={
          isWeb
            ? 'h-full items-center justify-center'
            : 'flex-1'
        }
      >
        <ThemedView
          className={`p-8 flex-col items-center ${
            isWeb
              ? 'gap-4 w-[360px] rounded-lg bg-white lg:border lg:border-gray-300'
              : 'gap-6'
          }`}
        >
          {/* Logo */}
          <Image
            source={require('@/assets/images/vida-logo.svg')}
            style={[
              {
                width: 120,
                height: 120,
                marginTop:
                  Platform.OS === 'android' ? 96 : 48,
              },
            ]}
            contentFit="contain"
          />

          <ThemedText
            className={`${
              isWeb ? 'w-full text-start text-2xl' : ''
            }`}
            type="title"
            style={{ fontWeight: 'bold' }}
          >
            Log in to Vida account
          </ThemedText>

          <View className="gap-4 my-4 justify-stretch w-full">
            <TextInput
              className={`border dark:text-white ${
                errors.signIn
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-md p-4`}
              placeholderTextColor="#9CA3AF"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              className={`w-full border dark:text-white ${
                errors.signIn
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-md p-4`}
              placeholderTextColor="#9CA3AF"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {Boolean(errors.signIn) && (
              <Text
                className={`text-red-500 w-full ${
                  isWeb ? '' : 'text-xl'
                }`}
              >
                {errors.signIn}
              </Text>
            )}
          </View>

          {isWeb && (
            <View className="w-full items-end">
              <TouchableOpacity onPress={onSignUpClick}>
                <ThemedText>
                  Don't have an account?
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}

          <View className="w-full mt-4 gap-4">
            <TouchableOpacity
              className={`bg-purple-800 p-4 ${
                isWeb ? 'rounded-md' : 'rounded-full'
              }`}
              onPress={() => {
                signIn(email, password, '/home');
              }}
            >
              <Text
                className={`text-white self-center ${
                  isNative && 'text-xl'
                }`}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            {isNative && (
              <TouchableOpacity
                className={`p-4 w-full`}
                activeOpacity={0.5}
                onPress={onSignUpClick}
              >
                <Text
                  className={`text-purple-800 dark:text-purple-400 self-center text-xl`}
                >
                  Create account
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ThemedView>
      </ThemedView>
    </PageView>
  );
};

export default SignInPage;
