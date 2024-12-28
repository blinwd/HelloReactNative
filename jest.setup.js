// In your jest setup file (e.g., jest.setup.js)
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock(
  '@react-native-async-storage/async-storage',
  () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  })
);
