import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';;
import { request, PERMISSIONS, check, openSettings } from 'react-native-permissions';

const GoogleMapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [currentLocation, setCurrentLocation] = useState(null);  // State for storing current location
  const mapRef = useRef(null);

  // Function to request location permission for iOS and Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === 'granted') {
          console.log('Location permission granted');
          getLocation();
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Location Permission Required',
            'This app requires access to your location. Please enable location permissions in your settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => openSettings(),  // Open the app settings if permission is denied
              },
              {
                text: 'Retry',
                onPress: () => requestLocationPermission(),  // Try again to request permission
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
        getLocation();
      } else {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === 'granted') {
          console.log('Location permission granted');
          getLocation();
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Location Permission Required',
            'This app requires access to your location. Please enable location permissions in your settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => Linking.openURL('app-settings://'),  // Open app settings on iOS
              },
              {
                text: 'Retry',
                onPress: () => requestLocationPermission(),  // Try again to request permission
              },
            ]
          );
        }
      }
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
        setCurrentLocation({ latitude, longitude });  // Update current location state
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
        showsUserLocation={false}  // Disable default blue bubble
      >
        {/* Marker for current location */}
        {currentLocation && (
          <Marker coordinate={currentLocation} title="You are here" />
        )}
      </MapView>

      {/* Button to get current location */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundColor: 'blue',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
        onPress={requestLocationPermission}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Get Current Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleMapScreen;
