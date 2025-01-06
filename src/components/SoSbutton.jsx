import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function SoSbutton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-red-500 w-20 h-10 rounded-full flex items-center justify-center shadow-lg"
    >
      <Text className="text-white text-lg font-bold">SOS</Text>
    </TouchableOpacity>
  );
}
