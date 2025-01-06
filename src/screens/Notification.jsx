import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification() {
  const [apiToken, setApiToken] = useState('');

  const getApiToken = async () => {
    const storedData = await AsyncStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const token = parsedData.api_token;
      setApiToken(token); // Update the apiToken state
      console.log(token + " this is from the notification ");
    }
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-green-600 font-bold'>{apiToken}</Text>
      <Button title='Click to get API Token' onPress={getApiToken} />
    </View>
  );
}
