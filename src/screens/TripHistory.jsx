import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library
import ScheduleCard from '../components/ScheduleCard';

const TripHistory = () => {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarTranslateX] = useState(new Animated.Value(-300)); // Initially off-screen
  const [tripHistory, setTripHistory] = useState([
    { id: 1, date: '2024-12-15', startLocation: 'Bangalore hhgqgfcgqfcgfhgtfcfcgcgcgfcg', endLocation: 'Mysore', duration: '3:00', type: "Login", status: "cancelled" },
    { id: 2, date: '2024-12-16', startLocation: 'Chennai', endLocation: 'Hyderabad', duration: '8:00', type: "LogOut", status: "cancelled" },
    { id: 3, date: '2024-12-15', startLocation: 'Bangalore', endLocation: 'Mysore', duration: '3:00', type: "Login", status: "Scheduled" }
  ]);

  const handleFilterButton = () => {
    console.log("Filter button pressed");
    toggleSidebar();
  };

  const toggleSidebar = () => {
    // Toggle the sidebar visibility
    setSidebarVisible(!sidebarVisible);
    
    // Slide in or out the sidebar
    Animated.timing(sidebarTranslateX, {
      toValue: sidebarVisible ? -300 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Trip History',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleFilterButton} className="mr-2">
          <Filter name="filter-menu-outline" size={27} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, sidebarVisible]);

  const tripStatusOptions = ['All', 'Complete', 'No Show', 'Cancelled'];

  return (
    <View className="flex-1 w-full">
      {/* The rest of the content */}
     
      {/* Sidebar */}
      <Animated.View
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    transform: [{ translateX: sidebarTranslateX }],
    zIndex: 1000, // Ensures the sidebar appears above everything
    elevation: 10, // For Android shadow effect
  }}
  className="shadow-lg"
>
  <View className="p-4 flex-1">
    <Text className="font-bold text-lg text-blue-800 mb-4">Filter Options</Text>
    {tripStatusOptions.map((option, index) => (
      <TouchableOpacity key={index} className="mb-2 mt-2 p-2">
        <Text className="font-semibold text-[16px]">{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
</Animated.View>
<View>
<ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-2">
            {tripHistory.map((trip) => (
              <ScheduleCard key={trip.id} tripDetails={trip} />
            ))}
          </ScrollView>
</View>
    </View>
  );
};

export default TripHistory;
