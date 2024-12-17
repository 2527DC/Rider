import React from 'react';
import { View, Text, Button } from 'react-native';

const ChooseLogin = () => {
  const handleEmailLogin = () => {
    console.log('Login with Email');
  };

  const handlePhoneLogin = () => {
    console.log('Login with Phone Number');
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-xl font-bold mb-5">Choose Login Method</Text>
      <Button title="Login with Email" onPress={handleEmailLogin} />
      <Button title="Login with Phone Number" onPress={handlePhoneLogin} />
    </View>
  );
};

export default ChooseLogin;
