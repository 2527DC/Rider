import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library
import HistoryCard from '../components/HistoryCard'; // Import the HistoryCard component
import { useAppContext } from '../Store/AppContext';

const TripHistory = () => {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarTranslateX] = useState(new Animated.Value(-300)); // Initially off-screen
  const [selectedFilter, setSelectedFilter] = useState('All'); // State for the selected filter
  const { tripHistory } = useAppContext(); // Assuming tripHistory is coming from your context

  // Filter the trip history based on the selected filter
  const filteredTrips = selectedFilter === 'All'
    ? tripHistory
    : tripHistory.filter(trip => trip.status === selectedFilter);

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

  // Function to update the filter when an option is selected
  const handleFilterSelection = (option) => {
    setSelectedFilter(option);
    toggleSidebar(); // Close the sidebar after selecting the filter
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

  const tripStatusOptions = ['All', 'Complete', 'No Show', 'cancelled'];

  return (
    <View className="flex-1 w-full">
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
            <TouchableOpacity
              key={index}
              className="mb-2 mt-2 p-2"
              onPress={() => handleFilterSelection(option)} // Set the selected filter
            >
              <Text className="font-semibold text-[16px]">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-2">
        {/* If no trips match the filter */}
        {filteredTrips.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl font-bold text-gray-600">
              No trips found for "{selectedFilter}".
            </Text>
          </View>
        ) : (
          // If trips are available, map over filteredTrips and display them
          filteredTrips.map((trip) => (
            <HistoryCard key={trip.id} tripDetails={trip} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TripHistory;
