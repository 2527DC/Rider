import React, { createContext, useContext, useState, useEffect } from 'react';
import database from '@react-native-firebase/database'; // Import Firebase Realtime Database

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

  const [shifts, setShifts] = useState([]);
  const [tripHistory, setTripHistory] = useState([]); // Trip history state
   const[shiftValue,setShiftvalue]=useState("")
  // Fetch shifts data from Firebase Realtime Database
  useEffect(() => {
    console.log('Fetching shifts data from Firebase...');

    const shiftsRef = database().ref('/shift/scheduleShift');

    const onValueChange = shiftsRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        console.log('Shifts data fetched:', data);
        setShifts(data);
      } else {
        console.log('No shifts data found. Setting empty array.');
        setShifts([]); // Set an empty array if no data exists
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      console.log('Cleaning up shifts listener...');
      shiftsRef.off('value', onValueChange);
    };
  }, []);

  // Method to get trip history data from Firebase
  useEffect(() => {
    console.log('Fetching trip history data from Firebase...');

    const tripHistoryRef = database().ref('/schedules/EMPLOYEE_001/bookings/id');

    const onValueChange = tripHistoryRef.on('value', snapshot => {
      const data = snapshot.val();
      console.log(data + " man in the action");
      
      if (data) {
        console.log('Fetched trip history data:', data);

        const tripHistoryArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value, // Add the rest of the booking data
        }));

        console.log('Formatted trip history:', tripHistoryArray);
        setTripHistory(tripHistoryArray); // Set the trip history state
      } else {
        console.log('No trip history data found. Setting empty array.');
        setTripHistory([]); // If no data exists, set an empty array
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      console.log('Cleaning up trip history listener...');
      tripHistoryRef.off('value', onValueChange);
    };
  }, []);

  // Method to update specific user data field
  const updateUserData = (key, value) => {
    console.log(`Updating user data: ${key} = ${value}`);
    setUserData(prev => {
      const updatedData = {
        ...prev,
        [key]: value, // Update only the specified key
      };
      console.log('Updated user data:', updatedData);
      return updatedData;
    });
  };

  // Method to set all user data at once
  const setAllUserData = data => {
    console.log('Setting all user data:', data);
    setUserData(data);
  };

  // Method to get a specific field value from user data
  const getUserData = key => {
    const value = userData[key] || null; // Return the value or null if not found
    console.log(`Getting user data for key "${key}":`, value);
    return value;
  };

  // Method to clear user data
  const clearUserData = () => {
    console.log('Clearing user data...');
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
        shifts,
        setShifts,
        tripHistory,
        setTripHistory,
        setShiftvalue,
        shiftValue
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
