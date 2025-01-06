import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <SafeAreaProvider>
    <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-blue-500 font-bold text-2xl">ForgotPasswordScreen</Text>
        </View>
        </SafeAreaProvider>
  );
};

export default SplashScreen;
