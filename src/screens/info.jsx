
// import React from 'react'
// // import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
// import OtpVerification from '../components/OtpVerification';
// const EmailLoginScreen = ({navigation}) => {
//   return (
//     <View className="flex-1 bg-blue-100">
//       {/* Image at the top */}
//       <View>
//         <Image
//           source={require('../assets/image/Ellipse.png')} // Update this path to your image file
//           className="w-full h-52"
//           resizeMode="cover"
//         />
//       </View>

//       {/* Welcome Back Section */}
//       <View className="flex-1 items-center ml-4">
//         <Text className="text-black text-2xl font-bold">Welcome Back</Text>

//         {/* Centered Subtext */}
//         <Text className="text-blue-900 text-base text-bold left-20">
//           Please enter your email
//         </Text>

//         {/* Email Icon */}
//         <Image
//           source={require('../assets/image/mail.png')} // Update this path to your image file
//           className="w-full h-65 mt-4"
//           resizeMode="cover"
//         />
//       </View>
      
//       {/* Input Section */}
//       <View className="flex-1 justify-center p-5 ml-3">
//         {/* Label */}
//         <View className="mb-2">
//           <Text className="text-sm font-bold text-gray-700">Email</Text>
//         </View>

//         {/* Input Field with Arrow */}
//         <View className="flex-row">
//           <TextInput
//             placeholder="Enter your email"
//             placeholderTextColor="#a3a3a3" // Light gray placeholder color
//             className="border border-blue-300 w-3/4 rounded-md px-4 py-2 text-gray-900 bg-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//           <TouchableOpacity className="p-1" onPress={()=>navigation.navigate("otp")}>
//             <MaterialIcons name="arrow-forward" size={30} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
      
//     </View>
//   )
// }

// export default EmailLoginScreen