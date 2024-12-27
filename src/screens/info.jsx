import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, check, openSettings } from 'react-native-permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';  // Import Firebase Realtime Database

const TrackingDriver = () => {
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [showUserLocation, setShowUserLocation] = useState(false); // State to toggle visibility
  const mapRef = useRef(null);
  const locationIntervalRef = useRef(null); // Ref to store interval ID
  const [driverLocation, setDriverLocation] = useState(null);

  // Use useEffect to set up the real-time listener for location changes
  useEffect(() => {
    const userId = 'KA-02-9282'; // Replace with dynamic user ID if necessary

    // Create a reference to the driver's location in Firebase
    const locationRef = database().ref(`/Driverlocations/${userId}`);

    // Set up a listener for changes to the location data
    const onValueChange = locationRef.on('value', snapshot => {
      if (snapshot.exists()) {
        const locationData = snapshot.val();
        console.log('Received location update from Firebase:', locationData);
        // Update state with new location
        setDriverLocation(locationData);
      } else {
        console.log('No location data available in Firebase.');
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      locationRef.off('value', onValueChange);
    };
  }, []);
  useEffect(() => {
    // Cleanup the interval when the component unmounts
    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, []);

  // Function to request location permission for iOS and Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === 'granted') {
          console.log('Location permission granted');
          toggleUserLocation(); // Toggle the visibility
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
        toggleUserLocation(); // Toggle the visibility
      } else {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === 'granted') {
          console.log('Location permission granted');
          toggleUserLocation(); // Toggle the visibility
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

  // Function to toggle the visibility of the user's location
  const toggleUserLocation = () => {
    if (!showUserLocation) {
      // If the location is currently hidden, fetch and show it
      startLocationUpdates();
    } else {
      stopLocationUpdates();
    }
    setShowUserLocation(!showUserLocation); // Toggle the state
  };

  // Function to start updating the location every 2 seconds
  const startLocationUpdates = () => {
    // Start the interval to get location every 2 seconds
    locationIntervalRef.current = setInterval(() => {
      getLocation();
    }, 2000); // Update location every 2 seconds
  };

  // Function to stop location updates
  const stopLocationUpdates = () => {
    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
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
        setRegion(newRegion);
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 500); // Smooth animation to new region
        }

        // If the platform is Android, update the location to Firebase in real-time
        if (Platform.OS === 'android') {
          updateLocationInFirebase(latitude, longitude);
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

  // Function to update the location to Firebase Realtime Database
  const updateLocationInFirebase = (latitude, longitude) => {
    const userId = 'KA-02-9282'; // Replace with dynamic user ID
    const locationRef = database().ref(`/Driverlocations/${userId}`);

    // Updating live location to Firebase
    locationRef.set({
      lat: latitude,
      long: longitude,
      // Timestamp to track when the location was updated
    })
    .then(() => {
      console.log('Location updated in Firebase');
    })
    .catch((error) => {
      console.error('Error updating location in Firebase:', error);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* MapView */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        showsUserLocation={showUserLocation} // Toggle visibility of the blue bubble
      > 
      {driverLocation && ( <Marker
      coordinate={{
        latitude: driverLocation.lat,
        longitude: driverLocation.long,
      }}
      title="Driver's Location"
      description="This is where the driver is currently located."
    />
  )} </MapView>

      {/* Button to toggle current location */}
      <View style={{ position: 'absolute', right: 15, top: '40%', transform: [{ translateY: -15 }] }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
          }}
          onPress={requestLocationPermission}
        >
          <MaterialIcons
            size={25}
            name={showUserLocation ? "location-off" : "location-on"} // Change icon based on state
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Info Box */}
      <View
  style={{
    backgroundColor: '#fff',
    padding: 15,
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <MaterialIcons name="access-time" color="red" size={24} style={{ marginRight: 5 }} />
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
      ARRIVAL <Text style={{ color: '#006400' }}>10 MIN</Text>
    </Text>
  </View>
</View>

    </View>
  );
};

export default TrackingDriver;











const GetArrivalTime = () => {
  const [arrivalTime, setArrivalTime] = useState(null);

  // Google Maps API key
  const API_KEY = API_ENDPOINTS.GOOGLE_MAPS_API_KEY ;  // Replace with your API Key
  
  // Function to get arrival time from source to destination
  const getArrivalTime = async (source, destination) => {
    const origin = `${13.0604},${77.501865}`;
    const dest = `${destination.lat},${destination.lng}`;

    try {
      // Make request to Google Directions API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        // Extract duration (estimated travel time) from the response
        const duration = data.routes[0].legs[0].duration.text;
        setArrivalTime(duration); // Set the arrival time
        Alert.alert('Arrival Time', `Estimated arrival time: ${duration}`);
      } else {
        console.error('Error:', data.status);
        Alert.alert('Error', 'Failed to get directions from Google Maps API.');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      Alert.alert('Error', 'Something went wrong while fetching directions.');
    }
  };}
