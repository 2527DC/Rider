import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import API_ENDPOINTS from '../constant/Constants';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GoogleMapScreen = () => {
  const [showBookingView, setShowBookingView] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const [sourceLatitude,setSourceLatitude]=useState(null)
  const [sourceLongitude,setSourceLongitude]=useState(null)
  const[destinationLongitude,setDestinationLongitude]=useState(null)
  const[ destinationLatitude,SetDestinationLatitude]=useState(null)
  
  const handleRadioButton = (option) => {
    setSelectedOption(option);
  };

  useEffect(()=>{
    Geolocation.getCurrentPosition(info => console.log(info));
  },[])


  const handleConfirmBooking = async () => {
    if (!selectedOption) {
      alert('Please select a booking type.');
      return;
    }

    // ken": "6IARbAVU2PF1BGOiVRXbBXJwXkY46xJW1lfDpjCfHNYGJm2jjL775A4895NI", "device_token": "jCfHNYGJm2jjL775A4895NI", "device_token": "jhbjhbj", "emailid": "Basavaraju@mltcorporate.com", "fcm_id": "jbjhb", "gender": "Male", "password": "$2y$10$MDikWLZ.78JNmpxkwhfB7.GYz7hiicTZKJGzm1MsNKXnWqcThgHJm", "phone": "IN+919632369798", "phone_code": "IN", "profile_pic": "man in the horse", "socialmedia_uid": null, "status": 1, "timestamp": "2024-12-13 18:24:17", "user_id": 181, "user_name": "Basavaraj", "user_type": "C"}}, "message": "You have Signed in Successfully!", "success": 1}

  
    // Prepare data for the request
    const data = {
      api_token: "6IARbAVU2PF1BGOiVRXbBXJwXkY46xJW1lfDpjCfHNYGJm2jjL775A4895NI",
      user_id:181,
      booking_type: selectedOption,
    };
  
    // Add source and destination details if booking type is RAC
    if (selectedOption === 'RAC') {
      if (!source || !destination) {
        alert('Please provide both source and destination addresses.');
        return;
      }
      data.source_address = source;
      data.source_lat = sourceLatitude; // Replace with dynamic latitude
      data.source_long = sourceLongitude; // Replace with dynamic longitude
      data.dest_address = destination;
      data.dest_lat = destinationLatitude; // Replace with dynamic latitude
      data.dest_long = destinationLongitude; // Replace with dynamic longitude
    }
  
    try {
      console.log('Request Data:', JSON.stringify(data, null, 2));
  
      // Send the data to the backend
      const response = await axios.post(`${API_ENDPOINTS.BOOK_NOW}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response Data:', response.data);
  
      // Handle successful booking
     
      setShowBookingView(false);
      setSource('');
      setDestination('');
      setSelectedOption('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to confirm booking. Please try again.');
    }
  };
  

  const options = ['Home', 'Office', 'RAC'];

  const renderOption = ({ item }) => (
    <TouchableOpacity
      className={`p-2 m-2 rounded-xl ${selectedOption === item ? 'bg-green-500' : 'bg-gray-200'}`}
      onPress={() => handleRadioButton(item)}
    >
      <Text className={`${selectedOption === item ? 'text-white font-bold' : 'text-gray-800'} text-lg`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      {/* MapView */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>

      {/* Book Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-green-500 p-2 rounded-full shadow-lg"
        onPress={() => setShowBookingView(true)} // Show the booking view when clicked
      >
        <Text className="text-white font-bold text-lg">Book Now</Text>
      </TouchableOpacity>

      {/* Driver Info Button */}
      <TouchableOpacity
        className="absolute bottom-5 left-5 bg-green-500 p-2 rounded-full shadow-lg"
        onPress={() => setShowDriverInfo(true)} // Show driver info when clicked
      >
        <Text className="text-white font-bold text-lg">Driver Info</Text>
      </TouchableOpacity>

      {/* Booking View */}
    
{showBookingView && (
  <View className="absolute bottom-0 left-0 right-0 bg-white p-5 rounded-t-3xl shadow-xl z-10">
    {/* Source and Destination Fields */}
    {selectedOption === 'RAC' && (
      <View className="space-y-4">
        <GooglePlacesAutocomplete
          placeholder="Source"
          onPress={(data, details = null) => {
            const { lat, lng } = details.geometry.location;
         console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          setSource(data.description)
          setSourceLatitude(lat)
          setSourceLongitude(lng)

          }}
          query={{
            key: API_ENDPOINTS.GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            container: { width: '100%' },
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
      // Store latitude and longitude
      SetDestinationLatitude(lat);
      setDestinationLongitude(lng);
    }
  }}
  query={{
    key: API_ENDPOINTS.GOOGLE_MAPS_API_KEY,
    language: 'en',
  }}
  fetchDetails={true} // Required to get the details parameter
  styles={{
    container: { width: '100%' },
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

      </View>
    )}

    {/* Options (Radio Buttons in a row) */}
    <View className="mt-4 mb-2">
      <FlatList
        horizontal
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 8,
          paddingRight: 8,
        }}
      />
    </View>

    {/* Confirm Booking and Close Buttons */}
    <View className="flex-row justify-between items-center mt-4">
      {/* Close Button */}
      <TouchableOpacity
        className="bg-red-600 p-3 rounded-xl flex-1 mr-2 shadow-md"
        onPress={() => setShowBookingView(false)}
      >
        <Text className="text-white font-semibold text-lg text-center">Close</Text>
      </TouchableOpacity>

      {/* Confirm Booking Button */}
      <TouchableOpacity
        className="bg-blue-600 p-3 rounded-xl flex-1 ml-2 shadow-md"
        onPress={handleConfirmBooking}
      >
        <Text className="text-white font-semibold text-lg text-center">Confirm</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

      {/* Driver Info Modal */}
      {showDriverInfo && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDriverInfo}
          onRequestClose={() => setShowDriverInfo(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-xl w-4/5 items-center">
              <Text className="text-xl font-bold mb-4">Driver Information</Text>
              <Text>Name: John Doe</Text>
              <Text>Phone: +1 234 567 890</Text>
              <Text>Car Model: Toyota Prius</Text>
              <Text>License Plate: ABC123</Text>

              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-lg mt-4"
                onPress={() => setShowDriverInfo(false)}
              >
                <Text className="text-white font-bold text-lg">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default GoogleMapScreen;


"user_id","booking_type"