import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Calendar } from 'react-native-calendars';
import API_ENDPOINTS, { BOOK_LATER } from '../constant/Constants';
import ModalDatetimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import axiosClient from '../Store/API_CLIENT';
const Schedule = () => {
  // Animated value to control the sliding animation
  const [slideAnim] = useState(new Animated.Value(-300)); // Starts off-screen (slide from top)
  const [isVisible, setIsVisible] = useState(false);
  
  // States for calendar, location, time, and modal visibility
  const [selectedDates, setSelectedDates] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceLatitude,setSourceLatitude]=useState(null)
  const [sourceLongitude,setSourceLongitude]=useState(null)
  const[destinationLongitude,setDestinationLongitude]=useState(null)
  const[ destinationLatitude,SetDestinationLatitude]=useState(null)
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // Stores selected time
  const today = new Date().toISOString().split("T")[0];
  const [selectedButton, setSelectedButton] = useState(null);


  // Toggle the sliding animation
  const toggleSlide = (shouldShow) => {
  setIsVisible(shouldShow); // Update visibility state

  Animated.timing(slideAnim, {
    toValue: shouldShow ? 0 : -300, // Slide to visible (0) or off-screen (-300)
    duration: 300,
    useNativeDriver: true,
  }).start();
};


  // Handle day selection in calendar
  const handleDateSelect = (day) => {
    const date = day.dateString;
    const isSelected = selectedDates.find((item) => item.date === date);

    if (isSelected) {
      // Unselect the date if it's already selected
      setSelectedDates((prev) => prev.filter((item) => item.date !== date));
    } else {
      // Select the date and set the time
      if (selectedTime) {
        setSelectedDates((prev) => [...prev, { date, time: selectedTime }]);
      } else {
        Alert.alert("Error", "Please select a time before adding the date.");
      }
    }
  };

  // Handle time selection and format it
  const handleTimeSelect = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(formattedTime);
    setShowTimePicker(false); // Close the time picker after selection
  };

  // Handle form submission


  const handleSubmit = async () => {
    try {
      // Validation for time and date
      if (selectedDates.length === 0) {
        Alert.alert("Validation Error", "Please select at least one date.");
        return;
      }
  
      if (!selectedTime) {
        Alert.alert("Validation Error", "Please select a time.");
        return;
      }
  
      if (!selectedButton) {
        Alert.alert("Validation Error", "Please select a booking type.");
        return;
      }
  
      // Structure the payload
      const payload = {
        user_id: 176,
        booking_type: selectedButton,
        time: selectedTime,
      };
  
      // Include source/destination only if booking type is RAC
      if (selectedButton === "RAC") {
        if (!source || !destination || !sourceLatitude || !sourceLongitude || !destinationLatitude || !destinationLongitude) {
          Alert.alert(
            "Validation Error",
            "Please select both source and destination for RAC booking."
          );
          return;
        }
  
        payload.source = source;
        payload.source_latitude = sourceLatitude;
        payload.source_longitude = sourceLongitude;
        payload.destination = destination;
        payload.destination_latitude = destinationLatitude;
        payload.destination_longitude = destinationLongitude;
      }
  
      // Add the selected dates and times to the payload
      payload.booking_details = selectedDates.map((item) => ({
        date: item.date,
      }));
  
      // Log the payload
      console.log("Request Payload:", JSON.stringify(payload, null, 2));
  
      // Sending data to the backend
      const response = await axiosClient.post(BOOK_LATER, payload);
  
      if (response.status === 201) {
        Alert.alert("Success", "Your booking has been submitted successfully.");
        console.log("Response:", response.data, "Response status:", response.status);
  
        // Reset the states after successful submission
        setSource('');
        setDestination('');
        setSelectedButton('');
        setSelectedDates([]); // Clear the selected dates
        setSelectedTime(null); // Clear the selected time
      } else {
        Alert.alert("Error", "Failed to submit the booking.");
        console.log("Response:", response.data, "Response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };
  
  return (
    <View className="flex-1 p-5">

      {/* Animated View that slides from top */}
      <Animated.View
  style={{
    transform: [{ translateY: slideAnim }],
  }}
  className="absolute top-0 left-0 right-0 bg-white p-5 rounded-b-xl shadow-lg z-20 space-y-4"
>
  {/* Close Button */}
  <TouchableOpacity
    onPress={() => toggleSlide(false)} // Close the animated view when pressed
    className="absolute top-3 right-3  p-2 rounded-full"
  >
    <Text className="text-red-600 font-bold text-xl">X</Text>
  </TouchableOpacity>

  {/* Google Places Autocomplete */}
  <GooglePlacesAutocomplete
    placeholder="Source"
    onPress={(data, details = null) => {
      const { lat, lng } = details.geometry.location;
      console.log('Latitude:', lat);
      console.log('Longitude:', lng);
      setSource(data.description);
      setSourceLatitude(lat);
      setSourceLongitude(lng);
    }}
    query={{
      key: API_ENDPOINTS.GOOGLE_MAPS_API_KEY,
      language: 'en',
    }}
    fetchDetails={true}
    styles={{
      container: { width: '90%' },
      textInput: {
        height: 50,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 16,
        fontSize: 16,
        backgroundColor: '#F8F8F8',
        marginBottom: 16,
      },
    }}
  />

  <GooglePlacesAutocomplete
    placeholder="Destination"
    onPress={(data, details = null) => {
      if (details) {
        const { lat, lng } = details.geometry.location;
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
        setDestination(data.description); // Set the address
        SetDestinationLatitude(lat);
        setDestinationLongitude(lng);
      }
    }}
    query={{
      key: API_ENDPOINTS.GOOGLE_MAPS_API_KEY,
      language: 'en',
    }}
    fetchDetails={true}
    styles={{
      container: { width: '90%' },
      textInput: {
        height: 50,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 16,
        fontSize: 16,
        backgroundColor: '#F8F8F8',
        marginBottom: 16,
      },
    }}
  />
</Animated.View>


      {/* Calendar placed outside the animated view */}
      <View>
      <Calendar
            minDate={today}
            onDayPress={handleDateSelect}
            markedDates={selectedDates.reduce((acc, item) => {
              acc[item.date] = { selected: true, marked: true };
              return acc;
            }, {})}
            theme={{
              selectedDayBackgroundColor: "blue",
              todayTextColor: "red",
              arrowColor: "blue",
            }}
          />
        
        <View className="flex-row mt-5">
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)} // Show the time picker when clicked
            className="bg-blue-600 p-3 rounded-lg w-2/5 justify-center items-center"
          >
            <Text className="text-white font-bold">Choose Time</Text>
          </TouchableOpacity>

          {/* Display the selected time */}
          {selectedTime && (
            <View className="justify-center items-center w-2/5">
              <Text className="text-lg font-bold">{selectedTime}</Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-between mt-6">
        {['Home', 'Office', 'RAC'].map((button) => (
  <TouchableOpacity
    key={button}
    onPress={() => {
      setSelectedButton(button);
      button==="RAC"? toggleSlide(true):toggleSlide(false)
    
    }}
    className={`rounded w-1/5 justify-center items-center p-3 ${
      selectedButton === button ? 'bg-green-600' : 'bg-blue-600'
    }`}
  >
    <Text className="text-white font-bold">{button}</Text>
  </TouchableOpacity>
))}

        </View>
      </View>

      {/* Modal Time Picker */}
      <ModalDatetimePicker
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleTimeSelect} // Call handleTimeSelect when time is selected
        onCancel={() => setShowTimePicker(false)} // Close the time picker when canceled
        date={new Date()}
      />




      {/* Submit Button at the Bottom */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 p-4 rounded-md mt-8 items-center right-5 left-5 absolute bottom-10"
      >
        <Text className="text-white font-bold text-lg">Submit</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Schedule;
