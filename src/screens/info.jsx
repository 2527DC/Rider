// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import database, { get } from '@react-native-firebase/database';
// import  MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Geolocation from '@react-native-community/geolocation';
// const TrackingDriver = ({ route }) => {
//   // const { vehicleNo } = route.params; // Receive vehicleNo as a prop

//   // console.log(vehicleNo + " in the tracking screen ");

//   const [location, setLocation] = useState();
//   // {
//   //   lat: 13.1123, // Default latitude
//   //   long: 77.5249, // Default longitude
//   // }
//   const [region, setRegion] = useState();

//   // {
//   //   latitude: 13.1123, 
//   //   longitude: 77.5249,
//   //   latitudeDelta: 0.01,
//   //   longitudeDelta: 0.01,
//   // }

//   // useEffect(() => {
//   //   // Fetch vehicle location from Realtime Database
//   //   const vehicleRef = database().ref(`/Driverlocations/${vehicleNo}`);

//   //   const unsubscribe = vehicleRef.on('value', (snapshot) => {
//   //     if (snapshot.exists()) {
//   //       const { lat, long } = snapshot.val();
//   //       setLocation({ lat, long });
//   //       setRegion(prevRegion => ({
//   //         ...prevRegion,
//   //         latitude: lat,
//   //         longitude: long,
//   //       }));
//   //       console.log('Vehicle lat and long .' + lat, long);
//   //     } else {
//   //       console.error('Vehicle not found in database.');
//   //     }
//   //   });

//   //   // Cleanup listener when component unmounts
//   //   return () => vehicleRef.off('value', unsubscribe);
//   // }, [vehicleNo]);



//     // Function to get current location
//     const getCurrentLocation = async () => {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         Alert.alert('Permission Denied', 'Cannot access location.');
//         return;
//       }
  
//       Geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat :latitude, long:longitude });
//           setRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.005, // Smaller delta for zoom-in effect
//             longitudeDelta: 0.005,
//           });
//         },
//         (error) => {
//           console.error('Error getting current location:', error);
//           Alert.alert('Error', 'Unable to fetch location.');
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     };
  

//   // Zoom in and zoom out functions
//   const zoomIn = () => {
//     setRegion((prevRegion) => ({
//       ...prevRegion,
//       latitudeDelta: prevRegion.latitudeDelta * 0.8, // Decrease latitudeDelta to zoom in
//       longitudeDelta: prevRegion.longitudeDelta * 0.8, // Decrease longitudeDelta to zoom in
//     }));
//   };

//   const zoomOut = () => {
//     setRegion((prevRegion) => ({
//       ...prevRegion,
//       latitudeDelta: prevRegion.latitudeDelta * 1.2, // Increase latitudeDelta to zoom out
//       longitudeDelta: prevRegion.longitudeDelta * 1.2, // Increase longitudeDelta to zoom out
//     }));
//   };

//   return (
//     <View className="flex-1">
//     <MapView
//       zoomEnabled={true}
//       className="flex-1"
//       region={region}
//       onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Keep track of region changes
//     >
      
//     </MapView>
  
//     <View className="absolute right-3 top-1/3 -translate-y-1/2">
//     <TouchableOpacity className="bg-gray-300 rounded-lg p-2" onPress={zoomIn} >
//       <MaterialIcons size={25} name="zoom-in" color="black" />
//     </TouchableOpacity>

//     <TouchableOpacity className="bg-gray-300 rounded-lg p-2 mt-4" onPress={zoomOut}>
//       <MaterialIcons size={25} name="zoom-out" color="black"  />
//     </TouchableOpacity>

//     <TouchableOpacity className="bg-gray-300 rounded-lg p-2 mt-4" onPress={getCurrentLocation} >
//       <MaterialIcons size={25} name="location-on" color="black"  />
//     </TouchableOpacity>
//   </View> 
//   <View className="bg-white p-4 absolute bottom-5 left-3 right-3 rounded-lg shadow-lg">
//   <Text className="text-lg font-semibold text-black flex-row items-center">
//   <MaterialIcons name="access-time" color="red" size={24} className="ml-2" />
//     ARRIVAL {"    "}
//     <Text className="text-green-900">10 MIN</Text>
//   </Text>
// </View>

//   </View>
  
//   );
// };

// export default TrackingDriver;