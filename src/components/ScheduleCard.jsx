import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TrackIcon from "react-native-vector-icons/FontAwesome5";
import Svg, { Line } from "react-native-svg";
import LoginIcon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../Store/AppContext";
import ShiftList from "./ShiftList";
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome"

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
  const currentTime = new Date();



  const handleTracking = (vehicleNo) => {

    // Log the planned pickup time (ppu)
    console.log("This is the pickup time:", tripDetails.ppu);
  
    // Assuming tripDetails.ppu is in a format like "HH:mm"
    // const [plannedHours, plannedMinutes] = tripDetails.ppu.split(":").map(Number);
    const [plannedHours, plannedMinutes] = "11:12".split(":").map(Number);
  
    // Create a Date object for the planned pickup time
    const plannedPickUpTime = new Date();
    plannedPickUpTime.setHours(plannedHours, plannedMinutes, 0, 0);
  
    // Calculate 30 minutes before the planned pickup time
    const thirtyMinutesBeforePickUp = new Date(plannedPickUpTime.getTime() - 30 * 60 * 1000);
  
    // Calculate 60 minutes after the planned pickup time
    const sixtyMinutesAfterPickUp = new Date(plannedPickUpTime.getTime() + 60 * 60 * 1000);
  
    // Get the current time
    const currentTime = new Date();
  
    // Check if the vehicle number is provided
    if (vehicleNo !== "") {
  
      // Check if the current time is before 30 minutes before or after 60 minutes of the planned pickup time
      if (currentTime < thirtyMinutesBeforePickUp) {
        // Show a toast if the tracking is attempted before 30 minutes of the planned pickup time
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Cannot Track Before Minimum Time',
          text2: 'Tracking is only available 30 minutes before the planned pickup time.',
          visibilityTime: 3000,
          autoHide: true,
        });
      } else if (currentTime > sixtyMinutesAfterPickUp) {
        // Show a toast if the tracking is attempted more than 60 minutes after the pickup time
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Tracking Period Over',
          text2: 'Tracking is only available within 60 minutes after the planned pickup time.',
          visibilityTime: 3000,
          autoHide: true,
        });
      } else {
        // Navigate to the TrackingDriver screen with the vehicle number
        navigation.navigate('TrackingDriver', { vehicleNo });
        console.log(vehicleNo + " this is the vehicle number");
      }
  
    } else {
      // Show a toast message if no vehicle is assigned
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Driver Not assigned',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };
  
  const handleCancelBooking = (id, ) => {

    const shift="9:59"
    const path = `/schedules/EMPLOYEE_001/bookings/id/${id}`;
    console.log(path + " in the cancelled");

    // Getting the current time in 24-hour format

    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // Parsing the shift time (assuming shift is in 'HH:mm' format)
    const [shiftHours, shiftMinutes] = shift.split(":").map(Number);
    const shiftTimeInMinutes = shiftHours * 60 + shiftMinutes;
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    // Checking if the current time is at least 2 minutes before the shift time
    if (shiftTimeInMinutes - currentTimeInMinutes <= 2) {
     

       Toast.show({
        type: 'error',
        position: 'bottom',
        text1: ' Cannot cancle the booking ',
        visibilityTime: 2000,
        autoHide: true,
       })
      
        return;
    }

    const updatedData = { status: "cancelled" };

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
      // Function to check if the "Edit" button should be shown
      
      const shouldShowEditButton = () => {

      const shift= "12:59"
       
        const shiftTime = new Date();
        const [shiftHours, shiftMinutes] = tripDetails.shift.split(":").map(Number);
        shiftTime.setHours(shiftHours, shiftMinutes, 0, 0);
       
        //  brfore the shift  to show the button value in minutes 
        const twoMinutesBeforeShift = new Date(shiftTime.getTime() - 2* 60 *1000);

        // Check if the current time is before the 2-minute mark

        console.log( currentTime < twoMinutesBeforeShift +" man in the action ");
        
        return currentTime < twoMinutesBeforeShift;
      };


        const  handleEdit =()=>{
                    setEdit(true);
                    setId(tripDetails.id);
        }


    const showAdhoc=()=>{

            
          }

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
                <MaterialIcons name="location-on" size={20} color="#900" />
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
                <MaterialIcons name="location-on" size={20} color="green" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Text className="text-lg font-semibold text-gray-600 ml-2">
                    {tripDetails.endLocation}
                  </Text>
                </ScrollView>
              </View>
            </View>

            {tripDetails.vehicleNo !== "" && (
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold text-purple-600 px-2 py-1 rounded mt-1">
                  {tripDetails.vehicleNo}
                </Text>

                <Text className="text-md font-bold text-purple-600 px-2 rounded mt-1">
                  Planned Pick Up: {tripDetails.ppu}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row justify-between items-center py-1 px-1">
            <TouchableOpacity
              className="bg-gray-200 px-2  rounded"
              onPress={() => {
                handleCancelBooking(tripDetails.id, tripDetails.shift);
              }}
            >
              <Text className="text-lg font-bold text-red-500">X</Text>
            </TouchableOpacity>

            {tripDetails.status !== "cancelled" && (
              <>
                {tripDetails.status !== "vehicle allocated" && shouldShowEditButton() && (
                  <TouchableOpacity
                    className="bg-gray-200 px-2 py-1 rounded"
                    onPress={handleEdit}
                  >
                    <MaterialIcons name="edit" size={20} color="green" />
                  </TouchableOpacity>
                )}

                {tripDetails.status === "vehicle allocated" ? (
                  <TouchableOpacity
                    className="bg-gray-200 rounded"
                    onPress={console.log("adhoc has been pressed ")}
                  >
                    <FontAwesome name="buysellads" size={30} color="green" />
                  </TouchableOpacity>
                ) : (
                  ""
                )}

                {tripDetails.otp !== "" && (
                  <Text className="text-lg font-bold text-purple-600 px-2 py-1 rounded">
                    Otp: {tripDetails.otp}
                  </Text>
                )}

                <TouchableOpacity
                  className="bg-gray-200 px-2 py-1 rounded"
                  onPress={() => {
                    handleTracking(tripDetails.vehicleNo);
                  }}
                >
                  <Text className="text-lg font-bold text-purple-600">
                    Track{" "}
                    <TrackIcon name="location-arrow" size={13} color="#900" />
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  )}

</View>

  );
};

export default ScheduleCard;
  