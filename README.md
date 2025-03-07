# React Native App Hello World

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It includes a minimal implementation covering basic theming using NativeWind, authentication via Firebase, and chat functionality with Stream Chat.

<img width="1728" alt="Screenshot 2024-12-31 at 5 21 04 PM" src="https://github.com/user-attachments/assets/61dd0ca1-90aa-4485-8149-25be4c6270f4" />
<img width="1728" alt="Screenshot 2024-12-31 at 5 19 00 PM" src="https://github.com/user-attachments/assets/825bf651-ed08-4c92-b395-6db359a05665" />
<img width="1728" alt="Screenshot 2025-01-02 at 5 19 06 PM" src="https://github.com/user-attachments/assets/17ddcab3-3508-4122-ab33-44f6f9582001" />

## Branches

Use `main` branch for all the features. Alternatively, use any of the following branches to start up the app:

- **[hello-world](https://github.com/blinwd/HelloReactNative/tree/hello-world)**: The hello world setup showcasing the base Expo configuration.
- **[firebase](https://github.com/blinwd/HelloReactNative/tree/firebase)**: Contains features and configurations specific to Firebase authentication.
- **[stream-chat](https://github.com/blinwd/HelloReactNative/tree/stream-chat)**: Contains features and configurations specific to Stream Chat integration.
- **[stylos](https://github.com/blinwd/HelloReactNative/tree/stylos)**: Contains DOM based account creation page and create profile page from [stylos](https://github.com/vidahealth/stylos) package.

## Setup

Install npm dependencies in the project root:

```bash
npm install
```

Next, you may want to run Prebuild to generate native directories (/ios and /android) before running the app on the simulator.

```bash
npm run prebuild
```

## Running the App with Expo Go

Run the following command to start the development server:

```bash
npx expo start
```

After running the above command:

- To run the web app, press `w` in the terminal. It will open the web app in the default web browser.
- To run on iOS simulator, press `i` in the terminal.
- To run on Android emulator, press `a` in the terminal.

### Web

Start the app in a web browser:

```bash
npm run web
```

### iOS

To run the **development build** on an iOS simulator, run the following command:

```bash
npm run ios
```

### Android

To run the **development build** on an Android emulator or connected device:

```bash
npm run android
```

## Expo Routes

The app includes the following routes:

- **Home**: The default page generated from `create-expo-app`.
- **Explore**: For testing the fallback page. See `+not_found.tsx`.
- **Chat**: Stream chat functionality. Follow the **Stream Chat Configuration** section for setup.
- **Sign Up**: Render Account creation page from stylos package.

## Stream Chat Configuration

To enable chat functionality, follow these steps:

1. Create a `.env.local` file in the root directory of your project.
2. Add the following environment variables to the file:

```dotenv
# Stream Chat Configuration
EXPO_PUBLIC_STREAM_CHAT_CHAT_API_KEY=< Your API Key from the Sparta client >
EXPO_PUBLIC_STREAM_CHAT_CHAT_USER_TOKEN=< Your Token from the Sparta client >
EXPO_PUBLIC_STREAM_CHAT_TEAM_TYPE=care-team
EXPO_PUBLIC_STREAM_CHAT_TEAM_UUID=< Provide Team UUID >
EXPO_PUBLIC_STREAM_CHAT_CHAT_USER_ID=< Provide Member UUID >
EXPO_PUBLIC_STREAM_CHAT_CHAT_USER_NAME=< Provide Member Name >
```

3. Save the file. Restart your local development server.

## References

1. [Expo Documentation](https://docs.expo.dev/)
2. [NativeWind Documentation](https://www.nativewind.dev/)
3. [Firebase Documentation](https://rnfirebase.io)
4. [Stream Chat Documentation](https://getstream.io/chat/docs/)
