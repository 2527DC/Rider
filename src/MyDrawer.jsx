import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './screens/ProfileScreen';
import Schedule from './screens/Schedule';
import Practice from './screens/Practice';
import TripHistory from './screens/TripHistory';
import RAC from './screens/RAC';
import TrackingDriver from './components/TrackingDriver';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Create the Stack Navigator

const CustomDrawerContent = (props) => {
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: '#3b82f6', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}>
          <Image
            source={require('./assets/image/images.jpg')}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>John Doe</Text>
          <Text style={{ fontSize: 14, color: '#f0f0f0' }}>johndoe@example.com</Text>
        </View>
        <DrawerItemList {...props} />
        <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f44336',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignItems: 'center',
              marginVertical: 5,
            }}
            onPress={handleLogout}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Practice"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          width: 240,
          backgroundColor: 'white',
        },
        drawerItemStyle: {
          borderWidth: 1,
          borderColor: 'white',
          marginVertical: 5,
          borderRadius: 16,
          width: '90%',
          alignSelf: 'center',
        },
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: 'white',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="schedule" color={color} size={size} />
          ),
        }}
      />
     
      <Drawer.Screen
        name="Practice"
        component={Practice}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="TripHistory"
        component={TripHistory}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="RAC"
        component={RAC}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="directions-car-filled" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="TrackingDriver"      component={TrackingDriver} />
    </Stack.Navigator>
  );
};

export default MyStack;
