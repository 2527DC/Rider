import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LocationIcon  from 'react-native-vector-icons/MaterialIcons';
import TrackIcon from 'react-native-vector-icons/FontAwesome5';
import Svg, { Line } from 'react-native-svg';
 import LoginIcon from 'react-native-vector-icons/MaterialIcons';

const ScheduleCard = ({ tripDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleCard = () => {
    setExpanded(!expanded);
  };

  return (
    <View className="relative m-2 mt-5">
      {/* Trip Date positioned outside the card */}
      <Text className="absolute top-[-20px] left-1 text-sm font-bold text-green-600 px-2 rounded-md shadow-lg">
        {tripDetails.date}
      </Text>

      {/* Card Container */}
      <View className="border border-gray-300 rounded-lg bg-white p-2 shadow-md">
        {/* Header Section */}
        <TouchableOpacity
          className="flex flex-row justify-between items-center"
          onPress={toggleCard}
        >
          <Text className="text-base font-bold text-gray-800 left-3">
        <LoginIcon name="login" size={20} color="#7C3AED"/>    {tripDetails.type} {" "}{tripDetails.duration} {"  "}{tripDetails.status}
          </Text>
          <Text className="text-2xl font-bold text-gray-500">{expanded ? '^' : '˅'}</Text>
        </TouchableOpacity>

        {/* Collapsible Content */}
        {expanded && (
          <View className="mt-2 pl-2">
            <View className="flex-row  mt-2">
  {/* First Column for Icons and Dotted Line */}
  <View className="flex-1">
    {/* Top Icon */}
    
    <View className='flex-row items-center '>
  {/* First Column for Icon */}
  <View className="flex-2 flex-row items-center">
    <LocationIcon name="location-on" size={20} color="#900" />
  </View>

  {/* Second Column for Text */}
  <View className="flex-1">
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Text className="text-sm text-gray-600 ml-2">
        {tripDetails.startLocation}
      </Text>
    </ScrollView>
  </View>
</View>
    
    
    {/* Dotted Line */}
    <View className='ml-2'>

    <Svg height="60" width="2">
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
</View>
    {/* Bottom Icon */}
    <View className='flex-row items-center '>
  {/* First Column for Icon */}
  <View className="flex-2 flex-row items-center">
    <LocationIcon name="location-on" size={20} color="green" />
  </View>

  {/* Second Column for Text */}
  <View className="flex-1">
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Text className="text-sm text-gray-600 ml-2">
        {tripDetails.endLocation}
      </Text>
    </ScrollView>
  </View>
</View>

  </View>

  {/* Second Column for Locations */}
  
    
  

  <View className="flex-1 justify-center items-center mt-2">
    <Text className="text-lg text-purple-500 p-1 font-extrabold bg-gray-200 rounded ">
        Otp: 13245 </Text>
    </View>
  
</View>

            <View className="flex-row mt-2 justify-between items-center">
            <TouchableOpacity className="  rounded bg-blue-200 rounded-md px-2 py-1">
                <Text className="text-purple-500 font-bold">X</Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-1 rounded bg-gray-200">
                <Text className="text-purple-500 font-bold">Edit</Text>
              </TouchableOpacity>
           
              <TouchableOpacity className="p-1 bg-gray-200 rounded right-2 flex-2">
                <Text className="text-purple-500 font-bold">
                Track <TrackIcon name="location-arrow" size={13} color="#900" /></Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ScheduleCard;
