import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { Link, useRouter } from 'expo-router';
import axios from 'axios'; // Import Axios
import API_ENDPOINTS from '../constant/Constants';
import { useAppContext } from '../Store/AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {setAllUserData} = useAppContext();

  // const { setAllUserData } = useAppContext(); // Access the setAllUserData method from the context

  // Function to handle login
  const handleLogin = async () => {
      // Navigate to the DrawerNavigator on successful login
      navigation.navigate('Main')
      
    // try {
    //   // Prepare login data
    //   const loginData = {
    //     username: email,
    //     password: password,
    //   };

    //   // Send POST request to login endpoint
    //   const response = await axios.post(API_ENDPOINTS.LOGIN, loginData, {
    //     headers: {
    //       'Content-Type': 'application/json', // Ensures the data is sent as JSON
    //     },
    //   });

    //   // Handle the successful login response
    //   if (response.data.success) {
    //     console.log('Login successful:', response.data);

    //     // Extract user information from the response
    //     const userInfo = response.data.data.userinfo;

    //     // Save the user data in the context
    //     setAllUserData({
    //       api_token: userInfo.api_token,
    //       emailid: userInfo.emailid,
    //       user_name: userInfo.user_name,
    //       phone: userInfo.phone,
    //       phone_code: userInfo.phone_code,
    //       gender: userInfo.gender,
    //       address: userInfo.address,
    //       user_id: userInfo.user_id,
    //     });

    //     // Navigate to the DrawerNavigator on successful login
    // navigation.navigate('Main')
        
    //   } else {
    //     // Show error message if login failed
    //     Alert.alert('Login Failed', response.data.message || 'An error occurred');
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    //   Alert.alert('Login Failed', 'An error occurred while logging in.');
    // }
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-6 rounded-lg shadow-lg w-[350] max-w-sm">
          <Text className="text-3xl font-semibold mb-6 text-center">Login Via Email</Text>

          <View className="w-full mb-4">
            <TextInput
              className="border p-3 rounded-lg text-base"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="w-full mb-4 relative">
            <TextInput
              className="border p-3 rounded-lg text-base"
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-3"
            >
              <Text className="text-blue-500">{isPasswordVisible ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogin} // Trigger the login function
            className="bg-blue-500 w-full py-3 rounded-lg mb-4"
          >
            <Text className="text-white text-center text-lg">Login</Text>
          </TouchableOpacity>

          <Text className="text-blue-500 mb-4 text-center" onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>

          <Text className="text-sm">
            Don't have an account?{' '}
           <Text className="text-blue-500 text-lg" onPress={() => navigation.navigate('Register')}>Register</Text>
           
          </Text>

          <Icon name="rocket" size={30} color="#900" />;
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Login;
