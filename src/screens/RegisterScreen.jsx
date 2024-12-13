import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, TextInput, Alert, View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios'; // Importing axios for API requests
import API_ENDPOINTS from '../constant/Constants';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'; // Add RESULTS to handle permission result





// CustomDropdown Component for Gender Selection
const GenderDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    setIsOpen(false);
    onSelect(gender);
  };

  return (
    <View style={{ width: '100%', marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 16, color: '#333', marginRight: 10 }}>GENDER</Text>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: '#f1f1f1',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
          onPress={toggleDropdown}>
          <Text style={{ fontSize: 16, color: '#333' }}>
            {selectedGender ? selectedGender : 'Select Gender'}
          </Text>
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View
          style={{
            marginTop: 5,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            elevation: 3,
          }}>
          {['Male', 'Female', 'Other'].map((gender, index) => (
            <TouchableOpacity
              key={index}
              style={{ padding: 10 }}
              onPress={() => handleSelect(gender)}>
              <Text style={{ fontSize: 16, color: '#333' }}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [selectedGender, setSelectedGender] = useState(null); // For gender selection
  const [address, setAddress] = useState(''); // To store the address
  const phoneInput = useRef(null);

  const checkPermission = async () => {
    let permissionStatus;

    // Check for permissions based on platform
    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    let permissionStatus;

    // Request permission based on platform
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      Alert.alert('Permission Denied', 'Location permission is required for this feature.');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Current Location:', position);
        const { longitude, latitude } = position.coords;
        getAddressFromLatLon(latitude, longitude); // Fetch address after getting the location
      },
      (error) => {
        console.log(error);
        Alert.alert('Error', 'Failed to get current location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getAddressFromLatLon = async (latitude, longitude) => {
    try {
      // Replace with your Google Maps API key  13.111536, 77.525396
      const apiKey = API_ENDPOINTS.GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${13.111536},${77.525396}&key=${apiKey}`;

      // Make API call to Google Maps Reverse Geocoding API
      const response = await axios.get(url);

      if (response.data.status === 'OK') {
        const address = response.data.results[0]?.formatted_address;
        setAddress(address || 'Address not found');
        console.log(address);
        
      } else {
        setAddress('Unable to fetch address');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };

  useEffect(() => {
    checkPermission(); // Run only once when the component mounts
  }, []);

  const handleSignUp = async () => {
    // Validation
    if (!username || !email || !password || !selectedGender || !formattedPhone || !address) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    // Email Validation (basic)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
  
    // Password Validation (at least 8 characters, mix of letters and numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }
  
    const phoneCode = phoneInput.current?.getCountryCode(); // Get the country code from PhoneInput
    const fullPhoneNumber = `${phoneCode}${formattedPhone}`;
    const mode = Platform.OS === 'ios' ? 2 : 1;
  
    // Preparing data in JSON format
    const registrationData = {
      user_name: username,
      emailid: email,
      password: password,
      mobno: fullPhoneNumber,
      phone_code: phoneCode,
      gender: selectedGender,
      fcm_id: 'jbjhb',
      device_token: 'jhbjhbj',
      socialmedia_uid: null,
      profile_pic: 'man in the horse',
      mode: mode,
      address: address, // Send the address from geocoding
    };
  
    console.log('Request Data:', registrationData);
  
    // Sending data to the backend using Axios
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, registrationData, {
        headers: {
          'Content-Type': 'application/json', // Ensures the data is sent as JSON
        },
      });
  
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
  
      if (response.status === 200) {
        Alert.alert('Success', 'Registration Successful!');
        navigation.navigate('Login'); // Navigate to Login screen
      } else {
        Alert.alert('Error', 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      console.error('Error Response:', error.response?.data || error);
  
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };
  
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', maxWidth: 400, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 }}>Sign Up</Text>

          {/* Username Field */}
          <TextInput
            style={{ width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 16 }}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Email Field */}
          <TextInput
            style={{ width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 16 }}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Field */}
          <TextInput
            style={{ width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 16 }}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Phone Input */}
          <PhoneInput
            ref={phoneInput}
            defaultValue={phone}
            defaultCode="IN"
            layout="first"
            onChangeFormattedText={setFormattedPhone}
            onChangeText={setPhone}
            countryPickerProps={{ withAlphaFilter: true, withFlag: true }}
            containerStyle={{ marginBottom: 16 }}
            textContainerStyle={{ height: 50 }}
          />

          {/* Gender Dropdown */}
          <GenderDropdown onSelect={setSelectedGender} />

          

          {/* Sign Up Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#1E90FF',
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
              marginBottom: 16,
            }}
            onPress={handleSignUp}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;