import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../constant/Constants'; // Adjust the path if necessary

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false); // New state for refreshing

  const requestdata = {
    // api_token: 'N8pBvNaYHtEGLTEYrCW9KZsqDntoNI2BiMWG1Dj6UADR9dUPjkhXHMcA24pU',
    // customer_id: 167,
    api_token: "6IARbAVU2PF1BGOiVRXbBXJwXkY46xJW1lfDpjCfHNYGJm2jjL775A4895NI",
    customer_id:181,
    
  };

  // Fetch booking history function
  const fetchBookingHistory = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.BOOKING_HISTORY, requestdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      if (response.status === 200 && result.success === 1) {
        setBookingHistory(result.data.rides);
      } else {
        setError('Failed to load booking history.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing when fetch is done
    }
  };

  // Refreshing logic when user pulls to refresh
  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true when pull-to-refresh is triggered
    fetchBookingHistory(); // Call the fetch function again to refresh the list
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchBookingHistory();
  }, []);

  // Handle cancel booking
  const handleCancel = async (bookingId) => {
    try {
      console.log('Canceling booking with ID:', bookingId);
  
      const response = await axios.post(
        API_ENDPOINTS.CANCLE_BOOKING,
        { 
          ...requestdata, 
          cancel_id: bookingId, 
          reason: 'User requested cancellation' // Adding the reason to the request body
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // Update the state to mark the booking as canceled
        setBookingHistory((prevHistory) =>
          prevHistory.map((item) =>
            item.booking_id === bookingId
              ? { ...item, ride_status: 'Cancelled' }
              : item
          )
        );
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data); // Print the server response
      } else {
        console.error('Error message:', error.message); // Print the error message
      }
    }
  };

  // Loading state while fetching data
  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg text-gray-700 mt-2">Loading...</Text>
      </View>
    );
  }

  // Error handling if something goes wrong
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={bookingHistory}
        keyExtractor={(item) => item.booking_id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg shadow-md p-4 mb-4">
            {/* Date and Time */}
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-800 font-semibold">Date: {item.book_date}</Text>
              <Text className="text-gray-800 font-semibold">Time: {item.book_time}</Text>
            </View>

            {/* Source and Destination */}
            <Text className="text-gray-600">
              <Text className="font-bold">Source:</Text> {item.source_address}
            </Text>
            <Text className="text-gray-600 mb-2">
              <Text className="font-bold">Destination:</Text> {item.dest_address}
            </Text>

            {/* Status and Action */}
            <View className="flex-row justify-between items-center mt-4">
              <Text
                className={`text-lg font-bold ${
                  item.ride_status === 'Cancelled' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                Status: {item.ride_status === null ? 'Pending' : item.ride_status}
              </Text>
              <TouchableOpacity
                className={`px-4 py-2 rounded ${
                  item.ride_status === 'Cancelled' ? 'bg-green-500' : 'bg-red-500'
                }`}
                onPress={() => item.ride_status !== 'Cancelled' && handleCancel(item.booking_id)}
                disabled={item.ride_status === 'Cancelled'}
              >
                <Text className="text-white font-semibold">
                  {item.ride_status === 'Cancelled' ? 'Cancelled' : 'Cancel'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">No booking history available.</Text>
        }
        refreshing={refreshing} // Attach the refreshing state to FlatList
        onRefresh={onRefresh} // Trigger the refresh when user pulls down
      />
    </View>
  );
};

export default BookingHistory;
