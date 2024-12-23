import React, { createContext, useContext, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

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
  const [shifts, setShifts] = useState(["3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "3:00 PM", "4:00 PM"]);
  const [tripHistory, setTripHistory] = useState([
    { id: 1, date: '2024-12-15', startLocation: 'Bangalore hhgqgfcgqfcgfhgtfcfcgcgcgfcg', endLocation: 'Mysore', duration: '3:00', type: "Login", status: "cancelled" },
    { id: 2, date: '2024-12-16', startLocation: 'Chennai', endLocation: 'Hyderabad', duration: '8:00', type: "LogOut", status: "cancelled" },
    { id: 3, date: '2024-12-15', startLocation: 'Bangalore', endLocation: 'Mysore', duration: '3:00', type: "Login", status: "Scheduled" }
  ]);

  
  


useEffect(() => {

  
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
        clearUserData,shifts, setShifts,
        tripHistory, setTripHistory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
