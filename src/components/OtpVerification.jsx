import React, { useRef, useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // State for OTP input (4 boxes)
  const inputRefs = useRef([]); // Array to hold refs for the input boxes

  const handleChange = (text, index) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move focus to the next input if it's filled
      if (text.length === 1 && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    // When backspace is pressed, move focus to the previous input
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join(''); // Join the OTP array into a string
    if (enteredOtp.length < 4) {
      Alert.alert('Error', 'Please enter all 4 digits of the OTP');
      return;
    }
    console.log('Entered OTP:', enteredOtp);
    Alert.alert('OTP Submitted', `Your OTP: ${enteredOtp}`);

    // Clear the fields
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus(); // Focus on the first input after clearing
  };

  return (
    <View className="flex-1 justify-center items-center px-5">
      <Text className="text-2xl font-bold mb-5 text-gray-800">Enter OTP</Text>
      <View className="flex-row justify-between mb-5">
        {otp.map((item, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)} // Store ref in the array
            className="w-12 h-12 border-2 border-gray-700 rounded-lg mx-1 text-center text-xl"
            keyboardType="numeric"
            maxLength={1}
            value={item}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            textAlign="center"
            autoFocus={index === 0} // Focus on the first input by default
          />
        ))}
      </View>
      <Text className="text-lg text-gray-600 text-center mb-5">
        We have sent the verification code to your email
      </Text>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 py-2 px-6 rounded-lg">
        <Text className="text-white text-lg">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerification;
