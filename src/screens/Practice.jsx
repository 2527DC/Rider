import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';

const Practice = () => {
  const [data, setData] = useState(null); // State to hold fetched data
  const [lastBookingId, setLastBookingId] = useState('B0'); // Local storage for the last booking ID

  // Function to create a custom booking ID and add a new booking
  const createBooking = async () => {
    try {
      const lastNumber = parseInt(lastBookingId.slice(1), 10);
      // const nextBookingId = `B${lastNumber + 1}`; // Generate next ID
      const nextBookingId = `B1`;
      const newBooking = {
        type: "logout",
        otp: "",
        driverName: "",
        vehicleNo: "",
        lat: 0,
        long: 0,
        date: "2024-12-25",
        startLocation: "bangalore",
        endLocation: "delhi",
        vehicleNo: "",
        shift: "3:30",
        status: "Scheduled"
      };

      // Get the current bookings from Firebase
      const bookingsRef = database().ref('/schedules/EMPLOYEE_001/bookings/id');
      const snapshot = await bookingsRef.once('value');
      const existingBookings = snapshot.val() || {}; // Default to an empty object if no bookings exist

      // Add the new booking using nextBookingId as the key
      existingBookings[nextBookingId] = newBooking;

      // Update the bookings in Firebase
      await bookingsRef.set(existingBookings);

      console.log(`New booking created with ID: ${nextBookingId}`);
      setLastBookingId(nextBookingId); // Update local state for the next booking ID
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  // Function to create a new shifts table
  const createShift = async () => {
    try {
      // Define the shifts array
      const shiftsArray = [
        "3:30", "6:00", "9:00", "12:00", "15:00",
        "18:00", "21:00", "23:00", "4:00", "7:30"
      ];

      // Create a new shifts entry in the database
      await database()
        .ref('/shift/scheduleShift')
        .set(shiftsArray);

      console.log('Shifts array created successfully');
    } catch (error) {
      console.error('Error creating shifts:', error);
    }
  };

  // Function to fetch data from Firebase
  const getData = async () => {
    try {
      const snapshot = await database().ref('/schedules/EMPLOYEE_001/bookings/id').once('value');
      const fetchedData = snapshot.val();
      console.log('Fetched data:', fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View className="flex-1 items-center mt-5">
      <TouchableOpacity className="p-1 bg-red-300 m-4" onPress={createBooking}>
        <Text className="text-xl font-bold">CREATE BOOKING</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-1 bg-green-300" onPress={getData}>
        <Text className="text-xl font-bold">Get the data</Text>
      </TouchableOpacity>

      {/* Create Shift Button */}
      <TouchableOpacity className="p-1 bg-blue-300" onPress={createShift}>
        <Text className="text-xl font-bold">Create Shift</Text>
      </TouchableOpacity>
      

      {/* Display the fetched data */}
      {data && (
        <ScrollView className="mt-5 p-2">
          <Text className="text-lg font-bold mb-2">Fetched Data:</Text>
          {Object.entries(data).map(([key, value]) => (
            <Text key={key} style={{ marginBottom: 4 }}>
              {`${key}: ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}`}
            </Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Practice;
