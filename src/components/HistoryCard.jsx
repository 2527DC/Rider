import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import LoginIcon from "react-native-vector-icons/MaterialIcons"; // Ensure you import the correct icon library
import Svg, { Line } from 'react-native-svg'; // Import Svg and Line from react-native-svg
import LocationIcon from "react-native-vector-icons/MaterialIcons";

const HistoryCard = ({ tripDetails }) => {

  console.log(tripDetails.id + " this is trip history");

  const [expanded, setExpanded] = useState(false); // For toggling expanded view

  // Toggle the expanded state for each trip
  const toggleCard = () => {
    setExpanded(!expanded);
  };

  return (
    <View className="m-4 mb-6">
      <View key={tripDetails.id} className="border border-gray-300 rounded-lg bg-white p-4 shadow-lg">
        {/* Date Label */}
        <Text className="absolute top-[-20px] left-4 text-xs font-bold text-white bg-green-600 px-2 py-1 rounded-full">
          {tripDetails.date}
        </Text>

        {/* Main Card Header */}
        <TouchableOpacity
          className="flex-row justify-between items-center mb-3"
          onPress={toggleCard}
        >
          <LoginIcon name="login" size={20} color="#7C3AED" />
          <Text className="text-xl font-semibold text-purple-600">{tripDetails.type}</Text>
          <Text className="text-lg font-semibold text-blue-600">{tripDetails.shift}</Text>
          <Text
            className={`text-lg font-bold ${
              tripDetails.status === "cancelled" ? "text-red-600" : "text-green-600"
            }`}
          >
            {tripDetails.status}
          </Text>
          <Text className="text-xl font-semibold text-gray-400">
            {expanded ? "^" : "˅"}
          </Text>
        </TouchableOpacity>

        {/* Expanded Details */}
        {expanded && (
          <View className="pl-4">
            {/* Start and End Location */}
            <View className="flex-row mb-4">
              <View className="flex-1">
                {/* Start Location */}
                <View className="flex-row items-center mb-2">
                  <LocationIcon name="location-on" size={20} color="#900" />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text className="text-lg font-semibold text-gray-700 ml-2">{tripDetails.startLocation}</Text>
                  </ScrollView>
                </View>

                {/* Divider Line */}
                <Svg height="60" width="2" className="ml-4">
                  <Line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="green"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                </Svg>

                {/* End Location */}
                <View className="flex-row items-center">
                  <LocationIcon name="location-on" size={20} color="green" />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text className="text-lg font-semibold text-gray-700 ml-2">{tripDetails.endLocation}</Text>
                  </ScrollView>
                </View>
              </View>

              {/* Vehicle and Driver Info */}
              {tripDetails.vehicleNo && (
                <View className="flex-1 items-center">
                  <Text className="text-lg font-semibold text-purple-600 px-2 rounded-lg mt-2">
                    {tripDetails.driverName}
                  </Text>
                  <Text className="text-lg font-semibold text-purple-600 px-2 py-1 rounded-lg mt-1">
                    {tripDetails.vehicleNo}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default HistoryCard;
