import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert, Linking, Button, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, check, openSettings } from 'react-native-permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';  // Import Firebase Realtime Database
import API_ENDPOINTS from '../constant/Constants';
import axios from 'axios';
import SoSbutton from './SoSbutton';

const TrackingDriver = ({ route }) => {
  const [lat, setLatitude] = useState(17.0944444); // Initial latitude
  const [long, setLongitude] = useState(77.5016665); // Initial longitude
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null); // To manage the interval

// Function to start location updates
const startUpdates = () => {
  if (!isRunning) {
    setIsRunning(true);

    // Start interval to update latitude and longitude
    const id = setInterval(() => {
      setLatitude((prevLat) => prevLat + 0.0001); // Increment latitude
      setLongitude((prevLng) => prevLng + 0.0001); // Increment longitude

      // Update Firebase with new latitude and longitude
      database()
        .ref(`/Driverlocations/${vehicleNo}`) // Replace with your Firebase path
        .set({ lat, long})
        .then(() => console.log("Location updated in Firebase"))
        .catch((error) => console.error("Error updating location:", error));
    }, 100); // Update every second

    setIntervalId(id);
  }
};

 // Function to stop location updates
 const stopUpdates = () => {
  if (isRunning) {
    setIsRunning(false);

    // Clear the interval
    clearInterval(intervalId);
    setIntervalId(null);

    console.log("Stopped location updates");
  }
};

// Toggle function
const toggleUpdates = () => {
  if (isRunning) {
    stopUpdates();
  } else {
    startUpdates();
  }
};
useEffect(() => {
  // Cleanup interval when component unmounts
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}, [intervalId]);

  const { vehicleNo } = route.params; // Access the params object

  console.log(vehicleNo + " this is the vehicle number");
  
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [userLocation, setUserLocation] = useState(null);  // To store user location
  const [arrivalTime, setArrivalTime] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(true);  // Toggle for location visibility

  useEffect(() => {
    // const userId = 'KA-02-9282';
    const locationRef = database().ref(`/Driverlocations/${vehicleNo}`);
  
    const onValueChange = locationRef.on('value', snapshot => {
      if (snapshot.exists()) {
        const locationData = snapshot.val();
        getArrivalTime({ lat: 13.0604, lng: 77.501865 }, locationData);
        console.log('Received location update from Firebase:', locationData.lat, locationData.long);
        
        // Update marker position
        setMarkerPosition({
          latitude: locationData.lat,
          longitude: locationData.long,
        });
     
        // Update region as well
        const newRegion = {
          latitude: locationData.lat,
          longitude: locationData.long,
          latitudeDelta: 0.080,
          longitudeDelta: 0.080,
        };
        setRegion(newRegion);
  
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 500);
        }
      }
    });
  
    return () => {
      locationRef.off('value', onValueChange);
    };
  }, []);
  
  // Function to request location permission for iOS and Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === 'granted') {
          console.log('Location permission granted');
          getLocation();  // Get current location after permission is granted
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Location Permission Required',
            'This app requires access to your location. Please enable location permissions in your settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => openSettings(), // Open the app settings if permission is denied
              },
              {
                text: 'Retry',
                onPress: () => requestLocationPermission(), // Try again to request permission
              },
            ]
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (permissionStatus === 'granted') {
        console.log('Location permission granted');
        getLocation();  // Get current location after permission is granted
      } else {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === 'granted') {
          console.log('Location permission granted');
          getLocation();  // Get current location after permission is granted
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Location Permission Required',
            'This app requires access to your location. Please enable location permissions in your settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => Linking.openURL('app-settings://'), // Open app settings on iOS
              },
              {
                text: 'Retry',
                onPress: () => requestLocationPermission(), // Try again to request permission
              },
            ]
          );
        }
      }
    }
  };

  // Google Maps API key
  const API_KEY = API_ENDPOINTS.GOOGLE_MAPS_API_KEY ;  // Replace with your API Key
  
  // Function to get arrival time from source to destination
  const getArrivalTime = async (source, destination) => {
    console.log(`${source.lat},${source.lng} + this is source and this is destination ${destination.lat},${destination.long}`);
  
    try {
      // Make request to Google Directions API
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${source.lat},${source.lng}&destination=${destination.lat},${destination.long}&key=${API_KEY}`
      );
  
      const data = response.data; // Axios automatically parses the JSON response
  
      if (data.status === 'OK') {
        // Extract duration (estimated travel time) from the response
        const duration = data.routes[0].legs[0].duration.text;
        setArrivalTime(duration); // Set the arrival time
      } else {
        console.error('Error:', data.status);
        Alert.alert('Error', 'Failed to get directions from Google Maps API.');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      Alert.alert('Error', 'Something went wrong while fetching directions.');
    }
  };
  
  // Function to get current location using react-native-geolocation-service
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };
        setRegion(newRegion); // Update region
        setUserLocation({
          latitude,
          longitude,
        }); // Store user location
  
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 500); // Smooth animation to new region
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        Alert.alert(
          'Location Error',
          'Unable to get your current location. Please ensure location services are enabled.',
          [{ text: 'OK' }]
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
      }
    );
  };
  
  // Toggle location visibility
  const toggleLocation = () => {
    setLocationEnabled(prevState => {
      if (!prevState) {
        // When turning on location, update to user's current location
        getLocation();  // Update region to the current location
      } else {
        // When turning off location, just hide the user location but retain the current region
        setUserLocation(null);
      }
      return !prevState;
    });
  };
  
 const handleSoSbutton =()=>{
  console.log("  sos button presseed ");
  
 }
  return (
    <View style={{ flex: 1 }}>
      {/* MapView */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={region} // Use initialRegion for the initial display
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        showsUserLocation={locationEnabled} // Show or hide user location
        userLocation={userLocation} // Set user location if available
        showsMyLocationButton={false}
      >
        <Marker
          coordinate={markerPosition}
          title="Driver's Location"
          description="This is where the driver is currently located"
        />
      </MapView>
      {/*  SOS button Implemented  */}
      <View className='absolute right-4 top-12  '> 
<SoSbutton onPress={handleSoSbutton}/>
      </View>

      {/* Button to toggle current location */}
      <View style={{ position: 'absolute', right: 15, top: '40%', transform: [{ translateY: -15 }] }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            padding: 10,  
            alignItems: 'center',
          }}
          onPress={() => {
            toggleLocation(); // Toggle location on or off
            if (locationEnabled) {
              setUserLocation(null); // Clear the location if it's turned off
            }
          }}
        >
          <MaterialIcons
            size={25}
            name={locationEnabled ? "location-off" : "location-on"} // Change icon based on state
            color="black"
          />
        </TouchableOpacity>
        <Button
        title={isRunning ? "Stop Updates" : "Start Updates"}
        onPress={toggleUpdates}
      />
      </View>

      {/* Bottom Info Box */}
      <View
      className='bottom-5 p-3 bg-white rounded-lg'
      >
        <View  className=" justify-seperately"style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="access-time" color="red" size={24} style={{ marginRight: 5 }} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
            ARRIVAL <Text style={{ color: '#006400' }}>10:30s</Text>
          </Text>
          <View className='flex-row ml-7 p-2 mb-1'>
    <Text className='text-black font-semibold'>OTP </Text>
    <Text className='text-green-800 font-bold'>9987</Text>
  </View>
        </View>
        
        <View className="py-3 px-1 flex-row justify-between">
      {/* User Info Section */}
      <View className=" bg-white flex-1 mr-2">
        {/* Row with Image and Name */}
        <View className="flex flex-row items-center ">
          {/* User Image */}
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // Internet Image URL
            className="w-16 h-16 rounded-full"
          />
       
          <Text className="text-black text-lg font-bold  px-1">
          KA-04-AA-2198
          </Text>
        </View>
       
      
       <Text className="mt-1    text-black text-base font-semibold"     numberOfLines={1}
            ellipsizeMode="tail">
         chethan
        </Text>
     
       
      </View>

      {/* Call Button Section */}
      <View className="p-3">
        <TouchableOpacity className="p-2 flex-row bg-blue-200 items-center px-3 rounded-lg">
          <MaterialIcons name="call" color="red" size={24} style={{ marginRight: 5 }} />
          <Text className="text-lg text-blue-500 font-semibold">Call</Text>
        </TouchableOpacity>
      </View>
    
    
        </View>
        
      </View>
      

    </View>
  );
};

export default TrackingDriver;
