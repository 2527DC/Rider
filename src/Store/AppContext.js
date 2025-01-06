import React, { createContext, useContext, useState, useEffect } from 'react';
import database from '@react-native-firebase/database'; // Import Firebase Realtime Database
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create Context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const AppProvider = ({ children }) => {

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

 
  // Method to clear user data
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('isLoggedIn');
        // Default to 'false' if the value doesn't exist or is not 'true'
        if (status === 'true') {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false); // Default to false on error
      }
    };

    checkLoginStatus();
  }, []);

  const login = async () => {
    try {
      setIsLoggedIn(true);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      // Additional logic after login (e.g., navigating to a new screen)
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
   
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('userData');
      console.log('User data removed from AsyncStorage');
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
  
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
  
        shifts,
        setShifts,
        tripHistory,
        setTripHistory,
        setShiftvalue,
        shiftValue,
        logout,
        login,isLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
