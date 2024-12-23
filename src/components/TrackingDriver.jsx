import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import database from '@react-native-firebase/database';

const TrackingDriver = ({ route }) => {
  const { vehicleNo } = route.params; // Receive vehicleNo as a prop

  console.log(vehicleNo + " in the tracking screen ");

  const [location, setLocation] = useState({
    lat: 13.1123, // Default latitude
    long: 77.5249, // Default longitude
  });
  const [region, setRegion] = useState({
    latitude: 13.1123, 
    longitude: 77.5249,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    // Fetch vehicle location from Realtime Database
    const vehicleRef = database().ref(`/Driverlocations/${vehicleNo}`);

    const unsubscribe = vehicleRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const { lat, long } = snapshot.val();
        setLocation({ lat, long });
        setRegion(prevRegion => ({
          ...prevRegion,
          latitude: lat,
          longitude: long,
        }));
        console.log('Vehicle lat and long .' + lat, long);
      } else {
        console.error('Vehicle not found in database.');
      }
    });

    // Cleanup listener when component unmounts
    return () => vehicleRef.off('value', unsubscribe);
  }, [vehicleNo]);

  // Zoom in and zoom out functions
  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 0.8, // Decrease latitudeDelta to zoom in
      longitudeDelta: prevRegion.longitudeDelta * 0.8, // Decrease longitudeDelta to zoom in
    }));
  };

  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 1.2, // Increase latitudeDelta to zoom out
      longitudeDelta: prevRegion.longitudeDelta * 1.2, // Increase longitudeDelta to zoom out
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracking Driver</Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Keep track of region changes
      >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.long,
          }}
          title={`Vehicle: ${vehicleNo}`}
        />
      </MapView>

      <View style={styles.zoomButtonsContainer}>
        <Button title="Zoom In" onPress={zoomIn} />
        <Button title="Zoom Out" onPress={zoomOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
  zoomButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default TrackingDriver;
