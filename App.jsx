import React, { useEffect, useState } from 'react';
// Import SafeAreaProvider
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
// import RegisterScreen from './src/screens/RegisterScreen';
import MyDrawer from './src/MyDrawer';
import 'react-native-get-random-values'; // used for the googleautocomplete places
import { AppProvider } from './src/Store/AppContext';
import messaging from '@react-native-firebase/messaging';

// Import Firebase if you're using Firebase to check initialization
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();
function App() {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const checkAppInitialized = () => {
    try {
      const firebaseInitialized = firebase.apps.length > 0;

      if (firebaseInitialized) {
        // Get the default app's name
        const firebaseAppName = firebase.app().name;
        console.log('Firebase Initialized Name:', firebaseAppName);
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
      const dbRef = database()
        .ref('/users/123'); // Reference to a node

      // Data to add
      const data = {
        name: 'John Doe',
        age: 30,
      };

      // Add data to the database
      await dbRef.set(data);

      console.log('Data written successfully:', data);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
// Fetch the FCM Token
const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
   // Store the token in state or send it to your backend
  } catch (error) {
    console.error('Error fetching FCM token:', error);
  }
};

  useEffect(() => {
    checkAppInitialized();
    
    // Write data after Firebase initialization
    if (isAppInitialized) {
      requestUserPermission()
      writeData();
      getFcmToken();
    }
  }, [isAppInitialized]); // D
  return (
    // Wrap your app in SafeAreaProvider for handling safe areas
    <SafeAreaProvider>
      <AppProvider>
     <NavigationContainer>
      <Stack.Navigator >
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="Main" 
          component={MyDrawer} 
          options={{ headerShown: false }} // Hide header for the drawer
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
