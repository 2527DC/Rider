import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <View className='flex-1 bg-white'>
        <View className="py-5 items-center bg-grey-300 px-5">
          <Text className="text-2xl font-bold text-blue-500 mb-5">Forgot Password</Text>
          
          <Text className="text-center text-gray-600 text-lg mb-7">
            Remember your password?
            <Pressable onPress={()=>console.log(' i am mugamboo')
            }>
              <Text className="text-blue-500 font-semibold underline"> Login here</Text>
            </Pressable>
          </Text>

          <View className="w-full mb-5">
            <Text className="text-base font-bold text-gray-800 mb-2">Email Address</Text>
            <TextInput 
              placeholder="Enter your email" 
              placeholderTextColor="#888"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-base bg-gray-100"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Pressable className="w-full h-12 bg-blue-500 justify-center items-center rounded-lg" onPress={() => console.log("man in the holes")}>
            <Text className="text-white text-lg font-semibold">Reset Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ForgotPasswordScreen;
