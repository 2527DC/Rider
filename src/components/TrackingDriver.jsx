import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert, Linking } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, check, openSettings } from 'react-native-permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TrackingDriver = () => {
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [showUserLocation, setShowUserLocation] = useState(false); // State to toggle visibility
  const mapRef = useRef(null);

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
      getLocation();
    }
    setShowUserLocation(!showUserLocation); // Toggle the state
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
      />

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
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
          <MaterialIcons name="access-time" color="red" size={24} style={{ marginRight: 5 }} />
          ARRIVAL{"    "}
          <Text style={{ color: '#006400' }}>10 MIN</Text>
        </Text>
      </View>
    </View>
  );
};

export default TrackingDriver;
