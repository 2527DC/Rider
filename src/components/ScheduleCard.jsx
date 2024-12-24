import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import LocationIcon from "react-native-vector-icons/MaterialIcons";
import TrackIcon from "react-native-vector-icons/FontAwesome5";
import Svg, { Line } from "react-native-svg";
import LoginIcon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../Store/AppContext";
import ShiftList from "./ShiftList";
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";

// Edit Component
const EditComponent = ({ setEdit, shifts, selectedButton, onConfirm }) => (
  <View className="p-4 bg-white shadow rounded-md">
    <Text className="text-lg text-center mb-4 font-bold text-gray-700">
      Edit Trip Details
    </Text>
    <ScrollView>
      <ShiftList button={selectedButton === "login"} shifts={shifts} />
    </ScrollView>

    {/* OK Button */}
    <TouchableOpacity
      className="bg-green-500 mt-4 px-4 py-2 rounded-full self-center"
      onPress={() => {
        onConfirm();
        setEdit(false);
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
  const { shifts, shiftValue } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [editClicked, setEdit] = useState(false);
  const [id, setId] = useState("");
  const navigation = useNavigation();
  const toggleCard = () => setExpanded(!expanded);

  const handleTracking=(vehicleNo)=>{

    if (tripDetails.vehicleNo!=="") {
      navigation.navigate('TrackingDriver', { vehicleNo });
    }  
  }

  const handleCancelBooking = (id) => {

    const path = `/schedules/EMPLOYEE_001/bookings/id/${id}`;
    console.log(path + " in the  cancelled  ");
    
    const updatedData = { status: "cancelled"};

    database()
      .ref(path)
      .update(updatedData)
      .then(() => console.log("Update successful for booking ID:", id))
      .catch((error) => console.error("Update failed:", error));


  };

  const handleOkClick = () => {
    const path = `/schedules/EMPLOYEE_001/bookings/id/${id}`;
    console.log(path + " in the edit ");
    
    const updatedData = { shift: shiftValue, status: "Scheduled" };

    database()
      .ref(path)
      .update(updatedData)
      .then(() => console.log("Update successful for booking ID:", id))
      .catch((error) => console.error("Update failed:", error));

  
  };

  return (
    <View className="m-2 mt-5 relative">
      <Text className="absolute top-[-20px] left-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
        {tripDetails.date}
      </Text>

      {editClicked ? (
        <EditComponent
          setEdit={setEdit}
          shifts={shifts}
         
          onConfirm={handleOkClick}
        />
      ) : (
        <View className="border border-gray-300 rounded-md bg-white p-2 shadow-sm">
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={toggleCard}
          >
            <LoginIcon name="login" size={20} color="#7C3AED" />
            <Text className="text-purple-600  font-bold text-lg">{tripDetails.type}</Text>
            <Text className="text-blue-600  font-bold text-lg">{tripDetails.shift}</Text>
            <Text
              className={`text-lg  font-bold  ${
                tripDetails.status === "cancelled"
                  ? "text-red-700"
                  : "text-green-600"
              }`}
            >
              {tripDetails.status}
            </Text>
            <Text className="text-2xl font-bold text-gray-400">
              {expanded ? "^" : "˅"}
            </Text>
          </TouchableOpacity>

          {expanded && (
            <View className="pl-2">
              <View className="flex-row mt-2">
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <LocationIcon name="location-on" size={20} color="#900" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <Text className="text-lg font-semibold text-gray-600 ml-2">
                        {tripDetails.startLocation}
                      </Text>
                    </ScrollView>
                  </View>

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

                  <View className="flex-row items-center">
                    <LocationIcon name="location-on" size={20} color="green" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <Text className="text-lg font-semibold text-gray-600 ml-2">
                        {tripDetails.endLocation}
                      </Text>
                    </ScrollView>
                  </View>
                </View>

                {tripDetails.vehicleNo !== "" && (
                  <View className="flex-1 items-center">
                    <Text className="text-lg font-bold text-purple-600 px-2 rounded mt-1">
                      {tripDetails.driverName}
                    </Text>
                    <Text className="text-lg font-bold text-purple-600 px-2 py-1 rounded mt-1">
                      {tripDetails.vehicleNo}
                    </Text>
                  </View>
                )}
              </View>

              <View className="flex-row justify-between items-center py-1 px-1">
                <TouchableOpacity
                  className="bg-gray-200 px-2  rounded"
                  onPress={() => {
                  
                     handleCancelBooking( tripDetails.id);
                  }}
                >
                  <Text className="text-lg font-bold text-red-500">X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-200 px-2 py-1 rounded"
                  onPress={() => {
                    setEdit(true);
                    setId(tripDetails.id);
                  }}
                >
                  <Text className="text-lg font-bold text-purple-600">Edit</Text>
                </TouchableOpacity>
                {tripDetails.otp !== "" && (
                  <Text className="text-lg font-bold text-purple-600 px-2 py-1 rounded">
                    Otp: {tripDetails.otp}
                  </Text>
                )}
                <TouchableOpacity className="bg-gray-200 px-2 py-1 rounded" 
                onPress={()=>{handleTracking(tripDetails.vehicleNo)}}>
                  <Text className="text-lg font-bold text-purple-600">
                    Track{" "}
                    <TrackIcon name="location-arrow" size={13} color="#900" />
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
