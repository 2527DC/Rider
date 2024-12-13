import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const [nameChange, setNameChange] = useState(false);

  return (
    <ScrollView className="flex-1 ">
      <View className="p-5 ">
        {/* Profile Header */}
        <View className="mb-4 rounded-2xl bg-blue-400 shadow-md">
          <View className="items-center p-6">
            <Image
              source={require('../assets/image/images.jpg')} // Replace with your image path
              className="w-[96px] h-[80px] rounded-full border-4 border-white"
            />
            <TouchableOpacity className="mt-3 py-2 px-4 border border-white rounded-full">
              <Text className="text-white font-bold text-center">Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Info */}
        <View className="mb-4 rounded-2xl  shadow-md">
          <View className="p-5 bg-blue-100 ">
            <Text className="text-xl font-bold text-gray-800 mb-4">Personal Information</Text>

            {/* Name Section */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <Text className="text-md text-gray-600">Full Name</Text>
                <Text className="text-base text-gray-800 mt-1">John Doe</Text>
              </View>
              <TouchableOpacity onPress={() => setNameChange(!nameChange)}>
                <Text className="text-blue-500 font-bold underline">Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Name Edit Section */}
            {nameChange && (
              <View className="p-4 rounded-xl mb-4 border border-gray-300">
                <View className="flex-row items-center">
                  <TextInput
                    className="flex-1 border border-gray-300 rounded-md p-2"
                    placeholder="Enter Name"
                  />
                  <TouchableOpacity className="p-2 ml-2 bg-blue-500 rounded-md">
                    <Text className="text-white">Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Contact Information */}
            <View>
              {/* Phone */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Phone Number</Text>
                <Text className="text-base text-gray-800 mt-1">+1 (555) 123-4567</Text>
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Email Address</Text>
                <Text className="text-base text-gray-800 mt-1">john.doe@example.com</Text>
              </View>

              {/* Gender */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Gender</Text>
                <Text className="text-base text-gray-800 mt-1">Male</Text>
              </View>

              {/* Address */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Address</Text>
                <Text className="text-base text-gray-800 mt-1">1234 Main St, City, Country</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}


// import React from 'react';
// import { ScrollView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
// import { Card } from 'react-native-paper'; // For cards
// import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons if needed

// export default function ProfileScreen() {
//   return (
//     <ScrollView style={styles.scrollView}>
//       <View style={styles.container}>
//         {/* Profile Header Card */}
//         <Card style={styles.card}>
//           <View style={styles.profileContainer}>
//             <Image
//               source={require('./assets/ic_dummy_user.png')} // Replace with your image path
//               style={styles.profileImage}
//             />
//             <TouchableOpacity style={styles.uploadButton}>
//               <Text style={styles.uploadButtonText}>Upload Photo</Text>
//             </TouchableOpacity>
//           </View>
//         </Card>

//         {/* Personal Info Card */}
//         <Card style={styles.card}>
//           <View style={styles.infoContainer}>
//             <Text style={styles.title}>Personal Information</Text>

//             {/* Name Section */}
//             <View style={styles.row}>
//               <View style={styles.column}>
//                 <Text style={styles.label}>Full Name</Text>
//                 <Text style={styles.value}>John Doe</Text>
//               </View>
//               <TouchableOpacity>
//                 <Text style={styles.editButton}>Edit</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Edit Name Section */}
//             <Card style={styles.editCard}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Name"
//               />
//               <TouchableOpacity style={styles.saveButton}>
//                 <Text style={styles.saveButtonText}>Save Changes</Text>
//               </TouchableOpacity>
//             </Card>

//             {/* Contact Information */}
//             <View>
//               {/* Phone */}
//               <View style={styles.infoSection}>
//                 <Text style={styles.label}>Phone Number</Text>
//                 <Text style={styles.value}>+1 (555) 123-4567</Text>
//               </View>

//               {/* Email */}
//               <View style={styles.infoSection}>
//                 <Text style={styles.label}>Email Address</Text>
//                 <Text style={styles.value}>john.doe@example.com</Text>
//               </View>

//               {/* Gender */}
//               <View style={styles.infoSection}>
//                 <Text style={styles.label}>Gender</Text>
//                 <Text style={styles.value}>Male</Text>
//               </View>

//               {/* Address */}
//               <View style={styles.infoSection}>
//                 <Text style={styles.label}>Address</Text>
//                 <Text style={styles.value}>1234 Main St, City, Country</Text>
//               </View>
//             </View>
//           </View>
//         </Card>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//     backgroundColor: '#f5f5f5', // Replace with your background color
//   },
//   container: {
//     padding: 20,
//   },
//   card: {
//     marginBottom: 16,
//     borderRadius: 16,
//     elevation: 4,
//     backgroundColor: '#ffffff', // Replace with your card background color
//   },
//   profileContainer: {
//     alignItems: 'center',
//     padding: 24,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: '#007BFF', // Replace with your border color
//   },
//   uploadButton: {
//     marginTop: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     borderColor: '#007BFF',
//     borderRadius: 20,
//   },
//   uploadButtonText: {
//     color: '#007BFF',
//     textAlign: 'center',
//   },
//   infoContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333333', // Replace with your text color
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   column: {
//     flex: 1,
//   },
//   label: {
//     fontSize: 14,
//     color: '#777777', // Replace with your text color
//   },
//   value: {
//     fontSize: 16,
//     color: '#333333',
//     marginTop: 4,
//   },
//   editButton: {
//     color: '#007BFF',
//     textDecorationLine: 'underline',
//   },
//   editCard: {
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#cccccc',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//   },
//   saveButton: {
//     alignSelf: 'flex-end',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#007BFF',
//     borderRadius: 20,
//   },
//   saveButtonText: {
//     color: '#ffffff',
//   },
//   infoSection: {
//     marginBottom: 16,
//   },
// });