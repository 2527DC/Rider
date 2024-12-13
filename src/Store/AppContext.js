import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform, PermissionsAndroid, Alert, BackHandler } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'; // Import react-native-permissions

// Create Context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const AppProvider = ({ children }) => {
  // State to store user data
  const [userData, setUserData] = useState({
    api_token: '',
    emailid: '',
    user_name: '',
    phone: '',
    phone_code: '',
    gender: '',
    address: '',
    user_id: '',
  });

  
  

const configureGeolocation = () => {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false, // App will request permissions automatically
    authorizationLevel: 'whenInUse', // Location is accessed only when app is in use
    enableBackgroundLocationUpdates: true, // No updates when app is in the background
    locationProvider: 'gps', // Automatically selects the provider (Android)
  });
};
  

useEffect(() => {
  configureGeolocation()
  
}, []);

  //  method for gettibg the current location 
    

  // Request location permission when the app is loaded
  

  // Method to update specific user data field
  const updateUserData = (key, value) => {
    setUserData(prev => ({
      ...prev,
      [key]: value, // Update only the specified key
    }));
  };

  // Method to set all user data at once
  const setAllUserData = data => {
    setUserData(data);
  };

  // Method to get a specific field value from user data
  const getUserData = key => {
    return userData[key] || null; // Return the value or null if not found
  };

  // Method to clear user data
  const clearUserData = () => {
    setUserData({
      api_token: '',
      emailid: '',
      user_name: '',
      phone: '',
      phone_code: '',
      gender: '',
      address: '',
      user_id: '',
    });
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        updateUserData,
        setAllUserData,
        getUserData,
        clearUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
