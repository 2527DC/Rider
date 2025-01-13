import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import axiosClient from '../Store/API_CLIENT';
import API_ENDPOINTS from '../constant/Constants';

const Practice = () => {
  const [logType, setLogType] = useState(""); // State to store selected log type
  const [selectedDay, setSelectedDay] = useState(""); // State to store selected day
  const [filteredData, setFilteredData] = useState([]); // State to store filtered data

  const handlePress = async () => {
    const request = {
      "api_token": "TuaPjW443femKIauadpE0VskcpvSwBke0dsS39YeOaiAAkS8rsek1vuXx9F3",
      "user_id": "4"
    };

    const response = await axiosClient.post(API_ENDPOINTS.SHIFTS, request);

    if (response.status === 200) {
      console.log("I am Chethan, response success");
      console.log("This is the response:", response.data["11"]);

      const arraydata = response.data["11"];

      // Filter the data based on the selected log type and day
      const filtered = arraydata.filter(da => 
        da.log === logType && (selectedDay ? da.days_available.includes(selectedDay) : true)
      );
      setFilteredData(filtered);

      filtered.forEach(da => {
        console.log(da.shift);
        console.log(da.log);
        console.log(da.days_available);
      });
    } else {
      console.log("Response not successful");
    }
  };

  return (
    <View>
      <Button title="Get Data" onPress={handlePress} />

      {/* Display selected log type */}
      <Text style={{ marginTop: 10 }}>
        Selected Log Type: {logType ? logType : "None"}
      </Text>

      {/* Display selected day */}
      <Text style={{ marginTop: 10 }}>
        Selected Day: {selectedDay ? selectedDay : "None"}
      </Text>

      {/* Button to filter by login */}
      <Button title="Filter Login" onPress={() => setLogType("login")} />
      {/* Button to filter by logout */}
      <Button title="Filter Logout" onPress={() => setLogType("logout")} />

      {/* Buttons for each day */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <Button
            key={day}
            title={`Filter ${day}`}
            onPress={() => setSelectedDay(day)} 
          />
        ))}
      </View>

   
    </View>
  );
};

export default Practice;
