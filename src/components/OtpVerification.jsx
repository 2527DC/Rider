import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axiosClient from '../Store/API_CLIENT';
import API_ENDPOINTS from '../constant/Constants';
import { useAppContext } from '../Store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OtpVerification = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']); // State for OTP input (4 boxes)
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const inputRefs = useRef([]); // Array to hold refs for the input boxes

    const {login}=useAppContext()
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

  const handleSubmit = async () => {
    const enteredOtp = otp.join(''); // Join the OTP array into a string
    if (enteredOtp.length < 4) {
      Alert.alert('Error', 'Please enter all 4 digits of the OTP');
      return;
    }
  
    setIsLoading(true); // Start loading
    const { phoneNumber } = route.params;
    const request = {
      mobile_number: phoneNumber,
      otp: enteredOtp,
      fcm_id: 'khbsjhbjhsx',
      device_token: 'khbsjhbjhsx',
    };
  
    try {
      const response = await axiosClient.post(API_ENDPOINTS.OTP_VERIFY, request);
  
      if (response.data.success) {
        const userData = response.data.data.userinfo;

        // Prepare only required data for storage and context
        const filteredUserData = {
            api_token: userData.api_token,
            emailid: userData.emailid,
            user_name: userData.user_name,
            phone: userData.mobno,
            gender: userData.gender,
            address: '', 
            user_id: userData.user_id
          
        };

        await AsyncStorage.setItem('userData',JSON.stringify(filteredUserData))
        // Call login from context to set the login status
       login();

      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
  
      // Log the response data
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Something went wrong: ' + error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading after response
    }
  
    // Clear the fields and focus on the first input after submission
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
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
            editable={!isLoading} // Disable input fields when loading
          />
        ))}
      </View>
      <Text className="text-lg text-gray-600 text-center mb-5">
        We have sent the verification code to your email
      </Text>

      {/* Show loading spinner while processing */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 py-2 px-6 rounded-lg">
          <Text className="text-white text-lg">Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OtpVerification;
