import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen() {
  const [data, setData] = useState({}); // Initialize data as an empty object

  // Fetch the user data from AsyncStorage
  const getData = async () => {
    try {
      const userdata = await AsyncStorage.getItem('userData');
      if (userdata) {
        const parsedData = JSON.parse(userdata);
        console.log(parsedData + " this is in the profile ");
        setData(parsedData); // Set the fetched data to the state
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  // Fetch data once when the component is mounted
  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures this runs only once

  // Handle rendering the profile data
  return (
    <ScrollView className="flex-1">
      <View className="p-5">
        {/* Profile Header */}

        {/* Personal Info */}
        <View className="mb-4 rounded-2xl shadow-md">
          <View className="p-5 bg-blue-100">
            <Text className="text-xl font-bold text-gray-800 mb-4">Personal Information</Text>

            {/* Name Section */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <Text className="text-md text-gray-600">Full Name</Text>
                <Text className="text-base text-gray-800 mt-1">{data.user_name || 'N/A'}</Text>
              </View>
            </View>

            {/* Contact Information */}
            <View>
              {/* Phone */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Phone Number</Text>
                <Text className="text-base text-gray-800 mt-1">{data.phone || 'N/A'}</Text>
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Email Address</Text>
                <Text className="text-base text-gray-800 mt-1">{data.emailid || 'N/A'}</Text>
              </View>

              {/* Gender */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Gender</Text>
                <Text className="text-base text-gray-800 mt-1">{data.gender || 'N/A'}</Text>
              </View>

              {/* Address */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">PickUp/Drop Point</Text>
                <Text className="text-base text-gray-800 mt-1">
                  <MaterialIcons name="location-on" size={20} color="green" />
                  {'1234 Main St, City, Country'}
                </Text>

                <Svg height="25" width="2" className="ml-2">
                  <Line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="green"
                    strokeWidth="2"
                    strokeDasharray="4,5"
                  />
                </Svg>

                <Text className="text-base text-gray-800 mt-1">
                  <MaterialIcons name="location-on" size={20} color="red" />
                  {'Office'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
