import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

const ShiftList = ({ button, shifts }) => {
  const [selectedShift, setSelectedShift] = useState(null); // Track selected shift

  const handleShiftSelect = (index) => {
    setSelectedShift(index); // Update the selected shift when a shift is clicked
  };

  return (
    <View className="mt-4 px-4">
      <Text className="font-bold text-xl text-center mb-4">
        When is your {button ? "Login" : "Logout"}?
      </Text>
      
      <ScrollView>
        <View className="flex-row flex-wrap justify-center">
          {shifts.map((shift, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleShiftSelect(index)} // Handle button press to select shift
            >
              <View
                style={{
                  marginBottom: 10, // Adds spacing between rows
                  alignItems: 'center', // Centers text inside each shift block
                  backgroundColor: selectedShift === index ? 'green' : '#D3D3D3', // Change color based on selection
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ color: selectedShift === index ? 'white' : 'black', fontSize: 16 }}>
                  {shift}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ShiftList;
