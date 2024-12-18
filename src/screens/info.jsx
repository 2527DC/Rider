import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library

const TripHistory = () => {
  const navigation = useNavigation();


  const handleFilterButton=()=>{

    console.log("Filter butto pressed ");
    
  }
  useEffect(() => {
    // Modify the header when the component is mounted
    navigation.setOptions({
      title: 'Trip History', // Custom title for the header
      headerStyle: {
        backgroundColor: 'white', // Change header background color
      },
      headerTintColor: 'black', // Change text color
      headerTitleStyle: {
        fontWeight: 'bold', // Make the title bold
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleFilterButton}>
          <Filter name="filter-menu-outline" size={27} color="black" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const filterType=["TripStatus","Trip Rating", "Vehicle Type"]
  const toshow ={
    tripStatusOptions : ['All', 'Complete', 'No Show', 'Cancelled'],
    tripRatingOptions :['All', 'No Rating', '1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
    vehicleTypeOptions :['All', 'Cab', 'Shuttle']
  }


  return (
    <View className='flex-1 w-full '>
      <View className='flex-row  justify-between p-2 bg-blue-300 '>
        <View>
        <TouchableOpacity className='p-1   m-1 bg-red-300'>
       {filterType.map((data,i)=> <Text className='m-1 bg-green-300' key={i}>{data}</Text>)}
        </TouchableOpacity>
        </View>
       
       <View>
        <View>
            { toshow.map((data,i)=><>
            

            </>)}
        </View>
       </View>
      </View>

      <View className='flex-1'> 
        <View>

        </View>
      </View>
    </View>
  );
};

export default TripHistory;
