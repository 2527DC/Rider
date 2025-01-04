import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Login from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyDrawer from './src/MyDrawer';
import 'react-native-get-random-values';
import { AppProvider } from './src/Store/AppContext';
// import messaging from '@react-native-firebase/messaging';
import LoginOption from './src/screens/LoginOption';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';
import PhoneLogin from './src/screens/PhoneLogin';
import EmailLoginScreen from './src/screens/EmailLoginScreen';
import OtpVerification from './src/components/OtpVerification';

const Stack = createNativeStackNavigator();

function App() {

  const SplashScreenComponent = ({ navigation }) => {
    useEffect(() => {
        SplashScreen.hide();
        navigation.replace('LoginOption'); // Navigate to LoginOption after splash
    }, []);

    return null;
};


  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen 
            name="Splash" 
            component={SplashScreenComponent} 
            options={{ headerShown: false }} 
        />
         <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
         <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
           <Stack.Screen name="LoginOption" component={LoginOption} />
           <Stack.Screen name="otp" component={OtpVerification} />
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
