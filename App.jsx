import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyDrawer from './src/MyDrawer';
import 'react-native-get-random-values';
import { AppProvider, useAppContext } from './src/Store/AppContext';
import LoginOption from './src/screens/LoginOption';
import EmailLoginScreen from './src/screens/EmailLoginScreen';
import OtpVerification from './src/components/OtpVerification';
import PhoneLogin from './src/screens/PhoneLogin';

const Stack = createNativeStackNavigator();

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <SafeAreaProvider>
      
        <NavigationContainer>
        <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen
                name="Main"
                component={MyDrawer}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginOption}     options={{ headerShown: false }}/>
                <Stack.Screen name="EmailLogin" component={EmailLoginScreen}    options={{ headerShown: false }}/>
                <Stack.Screen name="otp" component={OtpVerification}   options={{ headerShown: false }} />
                <Stack.Screen name="PhoneLogin" component={PhoneLogin}    options={{ headerShown: false }}/>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
    
    </SafeAreaProvider>
  );
}

export default App;
