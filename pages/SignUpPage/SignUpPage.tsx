import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { useAuthContext } from '@/contexts/AuthContext';
import { ThemedView } from '@/components/ThemedView';

type SignUpPageProps = {
  onSignInClick: () => void;
};

const SignUpPage = ({ onSignInClick }: SignUpPageProps) => {
  const { signUp, errors } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isWeb = Platform.OS === 'web';
  const isNative = !isWeb;

  return (
    <ThemedView
      className={`h-full ${
        isWeb ? 'h-full items-center justify-center' : ''
      }`}
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
          className="mb-4"
          source={require('@/assets/images/vida-logo.svg')}
          style={[
            {
              width: 120,
              height: 120,
            },
          ]}
          resizeMode="contain"
        />

        <ThemedText
          className={
            isWeb ? 'w-full text-start text-2xl' : ''
          }
          type="title"
          style={{ fontWeight: 'bold' }}
        >
          Set up your account
        </ThemedText>

        <View className="gap-4 my-4 justify-stretch w-full">
          <TextInput
            className={`border ${
              errors?.signUp
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
            className={`border ${
              errors?.signUp
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-md p-4`}
            placeholderTextColor="#9CA3AF"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {errors?.signUp ? (
            <Text className="text-red-500">
              {errors?.signUp}
            </Text>
          ) : null}
        </View>

        {isWeb && (
          <View className="w-full items-end">
            <TouchableOpacity
              className="items-end"
              onPress={onSignInClick}
            >
              <ThemedText>
                Already have an account?
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
              signUp(email, password, '/home');
            }}
          >
            <Text
              className={`text-white self-center ${
                isNative && 'text-xl'
              }`}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          {isNative && (
            <TouchableOpacity
              className={`p-4 w-full`}
              activeOpacity={0.5}
              onPress={onSignInClick}
            >
              <ThemedText
                className={`text-purple-800 dark:text-purple-400 self-center text-xl`}
              >
                Already have an account?
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export default SignUpPage;
