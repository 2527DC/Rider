import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import ShiftList from "../components/ShiftList";
import ScheduleCard from "../components/ScheduleCard";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAppContext } from "../Store/AppContext";
import database from '@react-native-firebase/database';
const Schedule = () => {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedButton, setSelectedButton] = useState('login');
  const [showShiftList, setShowShiftList] = useState(false);
  const [showScheduleList, setShowScheduleList] = useState(true);
  const {shifts,tripHistory, setTripHistory,shiftValue} = useAppContext()
  const today = new Date().toISOString().split("T")[0];
  const navigation = useNavigation();

  const currentDate = new Date();
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
  const nextMonthLastDate = nextMonth.toISOString().split("T")[0];

  const handleDateSelect = (day) => {
    const date = day.dateString;
    setSelectedDates((prevDates) => {
      const updatedDates = { ...prevDates };
      if (updatedDates[date]) {
        delete updatedDates[date];
      } else {
        updatedDates[date] = { selected: true, marked: true, selectedColor: "blue" };
      }
      return updatedDates;
    });
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleNextClick = () => {
    setShowShiftList(true);
  };

  const handleBackClick = () => {
    setShowShiftList(false);
  };

  const handleAddSchedule = () => {
    console.log(" Add Schedule button clicked");
    
    setShowScheduleList(false); // Toggle the state when button is clicked
  };
  // Handle submit action
  const handleSubmit = async () => {
    if (selectedButton && Object.keys(selectedDates).length > 0) {
      try {
        // Generate a unique ID for the booking
        // const bookingId = `B${tripHistory.length + 1}`; // Example logic for unique ID generation
        const bookingId = `B${tripHistory.length + 1}`;
        console.log(bookingId);
        
        const newBooking = {
         
          date: Object.keys(selectedDates)[0], // Use the first selected date
          type: selectedButton,
          otp: "",
          driverName: "",
          vehicleNo: "",
          lat: 0,
          long: 0,
          id:bookingId,
          startLocation: "Chennai",
          endLocation: "Hyderabad",
          shift: shiftValue, // Default shift if not selected
          status: "Scheduled",
        };
  
        // Update Firebase
        const bookingRef = database().ref(`/schedules/EMPLOYEE_001/bookings/id`);
        const snapshot = await bookingRef.once('value');
        const existingBookings = snapshot.val() || {};
        existingBookings[bookingId] = newBooking;
        await bookingRef.set(existingBookings);
  
        console.log("Booking added to Firebase:", newBooking);
  
        // Update local state
        setTripHistory((prevHistory) => [...prevHistory, newBooking]);
        setShowScheduleList(true);
        setShowShiftList(false);
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    } else {
      console.warn("Please select a button and a date before submitting.");
    }
  };
  
  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);
  };

  return (
    <View className="flex-1 bg-white">
      {showScheduleList ? (
        <View className="flex-1 bg-gray-100">
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-2">
            {tripHistory.map((trip,index) => (
              <ScheduleCard key={index} tripDetails={trip} />
            ))}
          </ScrollView>
          <TouchableOpacity
            className="absolute bottom-7 m-2 right-5 w-12 h-12 rounded-full bg-blue-500 justify-center items-center shadow-lg"
            onPress={handleAddSchedule}
          >
            <Text className="text-white text-2xl font-bold">+</Text>
          </TouchableOpacity>
        </View>
      ) : showShiftList ? (
        <View className="flex-1">
          <ShiftList button={selectedButton === "login"} shifts={shifts} onShiftSelect={handleShiftSelect} />
          <View className="absolute bottom-16 left-4 right-4 mb-1 px-4 flex-row justify-between">
            <TouchableOpacity
              className="bg-red-500 rounded-md px-4 py-3"
              onPress={handleBackClick}
            >
              <Text className="font-bold text-white text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-500 rounded-md px-4 py-3"
              onPress={handleSubmit}
            >
              <Text className="font-bold text-white text-center">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View className="flex-row justify-center mt-4">
            <TouchableOpacity
              className={`mx-2 rounded-md px-4 py-2 ${selectedButton === "login" ? "bg-blue-500" : "bg-gray-500"}`}
              onPress={() => handleButtonClick("login")}
            >
              <Text className="font-bold text-white">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`mx-2 rounded-md px-4 py-2 ${selectedButton === "logout" ? "bg-blue-500" : "bg-gray-500"}`}
              onPress={() => handleButtonClick("logout")}
            >
              <Text className="font-bold text-white">Logout</Text>
            </TouchableOpacity>
          </View>
          <Text className=" p-1 text-center font-bold text-red-700 mt-3">Weekly Off: Sun, Sat</Text>
          <View className="m-4 rounded-md overflow-hidden">
            <Calendar
              minDate={today}
              maxDate={nextMonthLastDate}
              onDayPress={handleDateSelect}
              markedDates={selectedDates}
              theme={{
                selectedDayBackgroundColor: "blue",
                todayTextColor: "red",
                arrowColor: "blue",
              }}
              style={{
                borderRadius: 15,
                overflow: "hidden",
              }}
            />
          </View>
          <View className="absolute bottom-16 left-4 right-4 mb-1 px-4 flex-row justify-between">
            <TouchableOpacity
              className="bg-red-500 rounded-md px-4 py-3"
              onPress={() => setShowScheduleList(true)}
            >
              <Text className="font-bold text-white text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-500 rounded-md px-4 py-3" onPress={handleNextClick}>
              <Text className="font-bold text-white text-center">Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Schedule;
