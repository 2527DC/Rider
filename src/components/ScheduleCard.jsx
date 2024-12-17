import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ScheduleCard = ({ tripDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleCard = () => {
    setExpanded(!expanded);
  };

  return (
    <View className="relative m-2 mt-5">
      {/* Trip Date positioned outside the card */}
      <Text className="absolute top-[-20px] left-1 text-sm font-bold text-green-600  px-2 rounded-md shadow-lg">
        {tripDetails.date}
      </Text>

      {/* Card Container */}
      <View className="border border-gray-300 rounded-lg bg-white p-2 shadow-md">
        {/* Header Section */}
        <TouchableOpacity
          className="flex flex-row justify-between items-center"
          onPress={toggleCard}
        >
          <Text className="text-base font-bold text-gray-800 left-3">{tripDetails.type}  {tripDetails.duration} {`schedule Cancelled`}</Text>
          <Text className="text-2xl font-bold  text-gray-500">{expanded ? '^' : '˅'}</Text>
        </TouchableOpacity>

        {/* Collapsible Content */}
        {expanded && (
          <View className="mt-2 pl-2">
         <View className="flex-row justify-between mt-2">
  {/* First Column */}
  <View className="flex-1">
    <Text className="text-sm text-gray-600 mb-1">
      Start Location: {tripDetails.startLocation}
    </Text>
    <Text className="text-sm text-gray-600 mb-1">
      End Location: {tripDetails.endLocation}
    </Text>
  </View>

  {/* Second Column */}
  <View className="flex-1 left-7">
    <Text className="text-lg text-green-600 mb-1">Otp: 13245</Text>
  </View>
</View>


            <View  className='flex-row mt-2 justify-between items-center'>
        <TouchableOpacity className='p-1  rounded'>
      <Text className='text-purple-500  font-bold'>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-1 bg-gray-200  rounded right-2  '>
      <Text className='text-purple-500  font-bold'>Track</Text>
          </TouchableOpacity>
            </View>

           </View>
        )}
      </View>
    </View>
  );
};

export default ScheduleCard;
