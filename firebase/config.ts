// Import the functions you need from the SDKs you need
import { Platform } from 'react-native';
import {
  initializeApp,
  getApps,
  getApp,
} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  Auth,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCunpTnM_CJAQN1KqSS0B08c2vmYCapJG8',
  authDomain: 'helloreactnative-200b2.firebaseapp.com',
  projectId: 'helloreactnative-200b2',
  storageBucket:
    'helloreactnative-200b2.firebasestorage.app',
  messagingSenderId: '413127099484',
  appId: '1:413127099484:web:223f1468043d7c6d3b9299',
  measurementId: 'G-S1QFTS38TG',
};

// Initialize Firebase
// Initialize Firebase app once
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

let auth: Auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  // Explicitly initialize Auth with persistence for React Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(
      ReactNativeAsyncStorage
    ),
  });
}

export { auth };
