import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import ShiftList from "../components/ShiftList";
import ScheduleCard from "../components/ScheduleCard";
import { useAppContext } from "../Store/AppContext";
import database from '@react-native-firebase/database';
const Schedule = () => {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedButton, setSelectedButton] = useState('login');
  const [showShiftList, setShowShiftList] = useState(false);
  const [showScheduleList, setShowScheduleList] = useState(true);
  const {shifts,tripHistory,shiftValue} = useAppContext()
  const today = new Date().toISOString().split("T")[0];
 
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
    console.log( " this are the selected dates " + Object.keys(selectedDates))
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
      // Iterate over all selected dates
      const selectedDateKeys = Object.keys(selectedDates); // Get all the selected dates

      // Create a booking for each selected date
      for (let i = 0; i < selectedDateKeys.length; i++) {
        const date = selectedDateKeys[i]; // Current date in the loop
        const bookingId = `B${tripHistory.length + i + 1}`; // Unique ID for each booking

        console.log(`Booking ID for ${date}:`, bookingId);

        const newBooking = {
          id: bookingId,
          date: date, // Use the current date in the loop
          type: selectedButton, // Login or Logout (based on selected button)
          otp: "", // You can add OTP logic here if needed
          driverName: "", // Placeholder, you can populate this field as required
          vehicleNo: "", // Placeholder, you can populate this field as required
          startLocation: "Chennai", // Customize based on your requirement
          endLocation: "Hyderabad", // Customize based on your requirement
          shift: shiftValue, // The selected shift (if available)
          status: "Scheduled", // Booking status
        };

        // Update Firebase for this booking
        const bookingRef = database().ref(`/schedules/EMPLOYEE_001/bookings/id/${bookingId}`);
        
        // Wait for the Firebase update to complete before moving to the next iteration
        await bookingRef.set(newBooking)
          .then(() => {
            console.log(`Booking added to Firebase for ${bookingId}:`, newBooking);
          })
          .catch((error) => {
            console.error(`Error updating booking ${bookingId} in Firebase:`, error);
          });
      }

      // Clear selected dates after submission
      setSelectedDates({});  // Reset selectedDates to an empty object

      // Update local state to reflect the changes
      setShowScheduleList(true);
      setShowShiftList(false);

    } catch (error) {
      console.error("Error creating booking:", error);
    }
  } else {
    console.warn("Please select a button and at least one date before submitting.");
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
