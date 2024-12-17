import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import ShiftList from "../components/ShiftList";
import ScheduleCard from "../components/ScheduleCard";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
 // Import the ScheduleList component

const Schedule = () => {
  // State for managing selected dates, selected button, and visibility of the shift list
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedButton, setSelectedButton] = useState('login');
  const [showShiftList, setShowShiftList] = useState(false);
  const [showScheduleList, setShowScheduleList] = useState(true); // State to toggle ScheduleList visibility

  const today = new Date().toISOString().split("T")[0];

  const navigation = useNavigation(); // Access navigation

  // Reset the state when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Reset the state when navigating back to the screen
      setSelectedDates({});
      setSelectedButton('login');
      setShowShiftList(false);
      setShowScheduleList(true);
     
    }, [])
  );

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
  // const [showAddSchedule, setShowAddSchedule] = useState(false); // State to toggle between components

  const tripHistory = [
    {
      id: 1,
      date: '2024-12-15',
      startLocation: 'Bangalore',
      endLocation: 'Mysore',
      duration: '3:00',
      type:"Login"
    },
    {
      id: 2,
      date: '2024-12-16',
      startLocation: ' Chennaijmshvjhvwejkhvjmhs ddff ',
      endLocation: 'Hyderabad',
      duration: '8:00 ',
      type:"LogOut"
    },
    {
      id: 3,
      date: '2024-12-17',
      startLocation: 'Delhi',
      endLocation: 'Agra',
      duration: '21:0',
      type:"LogOut"
    },
    {id: 4,
      date: '2024-12-15',
      startLocation: 'Bangalore',
      endLocation: 'Mysore',
      duration: '3:00',
      type:"Login"
    },
    {
      id: 5,
      date: '2024-12-16',
      startLocation: 'Chennai',
      endLocation: 'Hyderabad',
      duration: '8:00 ',
      type:"LogOut"
    },
    {
      id: 6,
      date: '2024-12-17',
      startLocation: 'Delhi',
      endLocation: 'Agra',
      duration: '21:0',
      type:"LogOut"
    },
   
  ];

  const handleAddSchedule = () => {
    console.log(" Add Schedule button clicked");
    
    setShowScheduleList(false); // Toggle the state when button is clicked
  };
  return (
    <View className="flex-1 bg-white">
      {/* Toggle between ScheduleList and ShiftList */}
      {showScheduleList ? (
       <View className="flex-1 bg-gray-100">
   
           <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-2">
             {tripHistory.map((trip) => (
               <ScheduleCard key={trip.id} tripDetails={trip} />
             ))}
           </ScrollView>
 
           {/* Floating Button */}
           <TouchableOpacity
             className="absolute bottom-7 m-2 right-5 w-12 h-12 rounded-full bg-blue-500 justify-center items-center shadow-lg"
             onPress={handleAddSchedule}
           >
             <Text className="text-white text-2xl font-bold">+</Text>
           </TouchableOpacity>
       
   
     </View>// Show the ScheduleList component when toggled
      ) : showShiftList ? (
        <View className="flex-1">
          {/* ShiftList Component */}
          <ShiftList button={selectedButton === "login"} shifts={shifts} />
         
          <View className="absolute bottom-16 left-4 right-4 mb-1 px-4 flex-row justify-between">

  <TouchableOpacity
    className="bg-red-500 rounded-md px-4 py-3"
    onPress={handleBackClick} 
  >
    <Text className="font-bold text-white text-center">Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity className="bg-blue-500 rounded-md px-4 py-3" onPress={()=>console.log("submit has clicked ")
  }>
    <Text className="font-bold text-white text-center">Submit</Text>
  </TouchableOpacity>
</View>

        </View>
      ) : (
        <>
        {/*   this is the ui of  Scheduling */}
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

          <View className="absolute bottom-16 left-4 right-4 mb-1 px-4 flex-row justify-between">
  {/* Cancel Button */}
  <TouchableOpacity
    className="bg-red-500 rounded-md px-4 py-3"
    onPress={() => setShowScheduleList(true)} // Assuming this hides the schedule list
  >
    <Text className="font-bold text-white text-center">Cancel</Text>
  </TouchableOpacity>

  {/* Next Button */}
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
