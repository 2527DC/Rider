import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const PhoneLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedNumber, setFormattedNumber] = useState('');

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <Text className="text-2xl font-bold text-center mb-5">Enter your phone number</Text>
      
      <PhoneInput
  defaultCode="US"
  layout="first"
  onChangeFormattedText={(text) => setFormattedNumber(text)}
  value={phoneNumber}
  onChangeText={(text) => setPhoneNumber(text)}
  className={`border border-white-300 p-7 mb-5 rounded-xl text-lg ${
    Platform.OS === 'android' ? 'text-base' : 'text-lg'
  }`}
  containerStyle={{
    height: 55, // Reduce the container height
    justifyContent: 'center', // Adjust to center the input vertically if needed
  }}
  textInputStyle={{
    height: 40, // Adjust the input height if needed
    fontSize: Platform.OS === 'android' ? 16 : 16, // Adjust font size based on platform
  }}
  style={{ height: 50 }} // Custom height
/>


<View className='items-center  mt-6'>
<TouchableOpacity
        onPress={() => navigation.navigate("otp", { phoneNumber: formattedNumber })}
        className="bg-blue-500 p-1 w-1/2 rounded-xl items-center"
      >
        <Text className="text-white text-lg font-bold">Verify</Text>
      </TouchableOpacity>
</View>
     
    </View>
  );
};

export default PhoneLogin;