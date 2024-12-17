import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import ShiftList from "../components/ShiftList"; // Assuming ShiftList is a separate component

const Schedule = () => {
  // State for managing selected dates, selected button, and visibility of the shift list
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedButton, setSelectedButton] = useState('login');
  const [showShiftList, setShowShiftList] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Calculate the last date of the next month
  const currentDate = new Date();
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0); // Last day of next month
  const nextMonthLastDate = nextMonth.toISOString().split("T")[0];

  // Handle day selection in the calendar
  const handleDateSelect = (day) => {
    const date = day.dateString;

    // Toggle the selected state for the date
    setSelectedDates((prevDates) => {
      const updatedDates = { ...prevDates };

      if (updatedDates[date]) {
        // If the date is already selected, remove it
        delete updatedDates[date];
      } else {
        // Otherwise, mark it as selected
        updatedDates[date] = { selected: true, marked: true, selectedColor: "blue" };
      }

      return updatedDates;
    });
  };

  // Handle button selection
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  // Handle "Next" button click to show shift list
  const handleNextClick = () => {
    setShowShiftList(true); // Show the ShiftList when "Next" is clicked
  };

  // Handle "Back" button click to hide shift list
  const handleBackClick = () => {
    console.log("back click is pressed");
    setShowShiftList(false); // Hide the ShiftList when "Back" is clicked
  };

  // Shift list example
  const shifts = [
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Render ShiftList when "Next" is clicked */}
      {showShiftList ? (
        <View className="flex-1">
          {/* ShiftList Component */}
          <ShiftList button={selectedButton === "login"} shifts={shifts} />
          <View className="absolute bottom-4 left-0 right-0 mb-7 px-4 flex-row justify-between px-6">
        <TouchableOpacity className="bg-red-500 rounded-md px-4 py-3" onPress={handleBackClick}>
          <Text className="font-bold text-white text-center">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 rounded-md px-4 py-3">
          <Text className="font-bold text-white text-center">Submit</Text>
        </TouchableOpacity>
      </View>
        </View>
      ) : (
        <>
          {/* Buttons for Login and Logout */}
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

          {/* Weekly Off Text */}
          <Text className=" p-1 text-center font-bold text-red-700 mt-3">Weekly Off: Sun, Sat</Text>

          {/* Calendar Card */}
          <View className="m-4  rounded-md overflow-hidden">
            <Calendar
              minDate={today}
              maxDate={nextMonthLastDate} // Restrict to the current and next month
              onDayPress={handleDateSelect}
              markedDates={selectedDates}
              theme={{
                selectedDayBackgroundColor: "blue",
                todayTextColor: "red",
                arrowColor: "blue",
              }}
              style={{
                borderRadius: 15, // Set the border radius for rounded corners
                overflow: "hidden", // Prevent content overflow when rounded
              }}
            />
          </View>

          {/* "Next" Button at the Bottom */}
          <View className="absolute bottom-16 left-0 right-0 mb-1 px-4">
            <TouchableOpacity className="bg-blue-500 rounded-md px-4 py-3" onPress={handleNextClick}>
              <Text className="font-bold text-white text-center">Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Submit and Cancel Buttons at the Bottom */}
     
    </View>
  );
};

export default Schedule;
