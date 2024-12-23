import React, { useState } from 'react';
import { View, Text, Button, Animated, TouchableOpacity, Dimensions } from 'react-native';

const { height } = Dimensions.get('window'); // Get screen height

const SlidingView = () => {
  const [slideAnim] = useState(new Animated.Value(height)); // Start the view off-screen at the bottom

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to the top of the screen (visible at the bottom)
      duration: 500,
      useNativeDriver: true, // for better performance
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: height, // Slide back off-screen to the bottom
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-1 justify-center items-center">
      {/* Notch Button */}
      <TouchableOpacity
        onPress={slideIn}
        className="absolute top-4 right-4 bg-gray-700 p-3 rounded-full"
        style={{ transform: [{ rotate: '90deg' }] }} // Rotate to make it look like a left arrow (<)
      >
        <Text className="text-white text-2xl">{"<"}</Text>
      </TouchableOpacity>

      {/* Sliding View */}
      <Animated.View
        className="absolute left-0 right-0 bg-blue-200 p-5"
        style={{
          transform: [{ translateY: slideAnim }],
          bottom: 0, // Keep the view at the bottom of the screen
          height: height * 0.3, // Set the height of the sliding view (30% of screen height)
        }}
      >
        <View className="flex justify-center items-center">
          <Text className="text-xl mb-2">Sliding View Content</Text>
          <Button title="Hide" onPress={slideOut} />
        </View>
      </Animated.View>
    </View>
  );
};

export default SlidingView;
