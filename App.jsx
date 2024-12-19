import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import MyDrawer from './src/MyDrawer';
import 'react-native-get-random-values';
import { AppProvider } from './src/Store/AppContext';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const isInitializedRef = useRef(false); // Prevent duplicate initialization

  const checkAppInitialized = () => {
    try {
      const firebaseInitialized = firebase.apps.length > 0;

      if (firebaseInitialized) {
        const firebaseAppName = firebase.app().name;
        console.log('Firebase Initialized Name i am ghost:', firebaseAppName);
      } else {
        console.log('Firebase is not initialized.');
      }

      setIsAppInitialized(firebaseInitialized);
    } catch (error) {
      console.error('Error checking initialization:', error);
      setIsAppInitialized(false);
    }
  };

  const writeData = async () => {
    try {
      const dbRef = database().ref('/users/123');
      const data = {
        name: 'John Doe',
        age: 30,
      };
      await dbRef.set(data);
      console.log('Data written successfully:', data);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true; // Mark as initialized
      checkAppInitialized();
    }
  }, []);

  useEffect(() => {
    if (isAppInitialized) {
      requestUserPermission();
      writeData();
      getFcmToken();
    }
  }, [isAppInitialized]);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="Main"
              component={MyDrawer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
