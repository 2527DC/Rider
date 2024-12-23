import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import LocationIcon from "react-native-vector-icons/MaterialIcons";
import TrackIcon from "react-native-vector-icons/FontAwesome5";
import Svg, { Line } from "react-native-svg";
import LoginIcon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../Store/AppContext";
import ShiftList from "./ShiftList";
import database from '@react-native-firebase/database';
// Edit Component with access to setEdit
const EditComponent = ({ setEdit, shifts, selectedButton, onConfirm }) => (
  <View className="p-4 bg-white shadow rounded-md space-">
    <Text className="text-lg text-center mb-4 font-bold text-gray-700 ">
      Edit Trip Details
    </Text>
    <ScrollView>
      <ShiftList button={selectedButton === "login"} shifts={shifts} />
    </ScrollView>

    {/* OK Button */}
    <TouchableOpacity
      className="bg-green-500 mt-4 px-4 py-2 rounded-full self-center"
      onPress={() => {
        onConfirm(); // Perform action on OK click
        setEdit(false); // Close the edit view
      }}
    >
      <Text className="text-white font-bold">OK</Text>
    </TouchableOpacity>

    {/* Close Button */}
    <TouchableOpacity
      className="absolute top-2 right-2 bg-red-100 p-2 rounded-full"
      onPress={() => setEdit(false)}
    >
      <Text className="text-red-500 font-bold">X</Text>
    </TouchableOpacity>
  </View>
);


const ScheduleCard = ({ tripDetails }) => {
  const { shifts } = useAppContext(); // Use the hook inside the functional component
  const [expanded, setExpanded] = useState(false);
  const [editClicked, setEdit] = useState(false);
  const [selectedButton, setSelectedButton] = useState(""); // Example state for button logic
 const [id ,setId]= useState("")
  const toggleCard = () => {
    setExpanded(!expanded);
  };

  const handleOkClick = () => {
    // Firebase Realtime Database path
    const path = `/schedules/EMPLOYEE_001/bookings/id/${id}`;
  
    // Data to update
    const updatedData = {
  shift: "10:30", // Replace 'fieldName' with the actual field and 'newValue' with the desired value
    };
  
    // Perform the update
    database()
      .ref(path)
      .update(updatedData)
      .then(() => {
        console.log("Update successful for booking ID:", id);
      })
      .catch((error) => {
        console.error("Update failed: ", error);
      });
  };
  return (
    <View className="m-2 mt-5 relative">
      {/* Trip Date */}
      <Text className="absolute top-[-20px] left-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
        {tripDetails.date}
      </Text>

      {editClicked ? (
      <EditComponent
        setEdit={setEdit}
        shifts={shifts}
        selectedButton={selectedButton}
        onConfirm={handleOkClick} // Pass the handler
      />
    ) : (
        <View className="border border-gray-300 rounded-md bg-white p-2 shadow-sm">
          {/* Header Section */}
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={toggleCard}
          >
           
           <Text className="text-sm font-bold text-gray-700 ml-3">
  <LoginIcon name="login" size={20} color="#7C3AED" />
  <Text className="text-purple-600">{tripDetails.type}</Text>  {/* Apply style for type */}
  {"    "}
  <Text className="text-blue-600">{tripDetails.shift}</Text>  {/* Apply style for shift */}
  {"    "}
  <Text className="text-green-600">{tripDetails.status}</Text>  {/* Apply style for status */}
</Text>

            <Text className="text-lg font-bold text-gray-400">
              {expanded ? "^" : "˅"}
            </Text>
          </TouchableOpacity>

          {/* Collapsible Content */}
          {expanded && (
            <View className="mt-2 pl-2">
              <View className="flex-row mt-2">
                {/* Location Icons and Lines */}
                <View className="flex-1">
                  {/* Start Location */}
                  <View className="flex-row items-center">
                    <LocationIcon name="location-on" size={20} color="#900" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <Text className="text-xs text-gray-600 ml-2">
                        {tripDetails.startLocation}
                      </Text>
                    </ScrollView>
                  </View>

                  {/* Dotted Line */}
                  <Svg height="60" width="2" className="ml-2">
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
                      <Text className="text-xs text-gray-600 ml-2">
                        {tripDetails.endLocation}
                      </Text>
                    </ScrollView>
                  </View>
                </View>

                {/* Driver and Vehicle Info */}
                {tripDetails.vehicleNo === ""?"": <View className="flex-1 items-center">
               <Text className="text-xs font-bold text-purple-600 bg-gray-200 px-2 py-1 rounded mt-1">
                    driver :{tripDetails.driverName}
                  </Text>
                  <Text className="text-xs font-bold text-purple-600 bg-gray-200 px-2 py-1 rounded mt-1">
                    vehicle no :{tripDetails.vehicleNo}
                  </Text> 
                </View>}
              </View>
             
              {/* Action Buttons */}
              <View className="flex-row justify-between items-center mt-2">
                <TouchableOpacity className="bg-gray-200 px-2 py-1 rounded">
                  <Text className="text-xs font-bold text-red-500">X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-200 px-2 py-1 rounded"
                  onPress={() => {
                    setEdit(true);
                    setId(tripDetails.id);
                    console.log( "this is the edidt trip detail "  + tripDetails.id)
                     
                  }}
                >
                  <Text className="text-xs font-bold text-purple-600">Edit</Text>
                </TouchableOpacity>
            {tripDetails.otp===""?"":    <Text className="text-base font-bold text-purple-600  px-2 py-1 rounded">
                  Otp:{tripDetails.otp}
                </Text>}
                <TouchableOpacity className="bg-gray-200 px-2 py-1 rounded">
                  <Text className="text-xs font-bold text-purple-600">
                    Track <TrackIcon name="location-arrow" size={13} color="#900" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ScheduleCard;
