import React from "react";
import { Image, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from "react-native";
import Svg, {  Rect } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LoginOption = ({ navigation }) => {
 
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header Image */}
        <View className="flex-row">
          <Image
            source={require('../assets/image/Ellipse1.png')}
            className="w-full h-48"
          />
        </View>

        {/* ETS Image */}
        <View className="items-center justify-between">
          <Image
            source={require('../assets/image/ETS.jpeg')}
            className="w-1/2 h-28"
            resizeMode="contain"
          />
        </View>

        {/* SVG */}
        <View className="  flex-1 ">
          <Svg width="302" height="261" viewBox="25 154 102 1161" fill="none">
    <Rect
      width="742.985"
      height="719.227"
      transform="matrix(1.000357 0.957232 -6.9962169 3.0022   -415.239 0.879297 )"
      fill="#1D92F1"
      fillOpacity="0.65"
    />
     <Rect
      width="742.985"
      height="719.227"
      transform="matrix(1.000357 0.957232 -2.9962169 3.0022   -415.239 0.879297 )"
      fill="#1D92F1"
      fillOpacity="0.65"
    />
 
 
  
  </Svg>
<View className="w-full items-center p-9">
          
          {/* Login Via Email Button */}
          <TouchableOpacity  onPress={()=>  navigation.navigate('PhoneLogin')} className="border-2 border-blue-500 rounded-xl bg-blue-100 flex-row items-center mb-4 px-6 py-2">
            <Text className="text-2xl text-blue-500 font-semibold mr-2">Login Via Phone</Text>
            <MaterialIcons name="local-phone" size={30} color="blue" />
          </TouchableOpacity>

          {/* Login Via Phone Button */}
          <TouchableOpacity onPress={()=>  navigation.navigate("EmailLogin" )} className="border-2 border-blue-500 bg-blue-100 rounded-xl flex-row items-center px-6 py-2">
            <Text className="text-2xl text-blue-500 font-semibold mr-2">Login Via Email</Text>
            <MaterialIcons name="mail" size={30} color="blue" />
          </TouchableOpacity>
        </View>
        </View>

        {/* Buttons at the Bottom */}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginOption;
