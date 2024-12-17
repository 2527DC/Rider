import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import BookingHistory from './screens/BookingHistory';
import ProfileScreen from './screens/ProfileScreen';
import Schedule from './screens/Schedule';
import Reviews from './screens/Reviews';
import Practice from './screens/Practice';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props) => {
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
            // Perform logout actions here (e.g., clearing tokens, navigating to login)   
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], // Replace 'Login' with your actual login screen name
            });
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <DrawerContentScrollView {...props}>
        {/* Custom Header */}
        <View style={{ backgroundColor: '#3b82f6', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}>
          <Image
            source={require('./assets/image/images.jpg')}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>John Doe</Text>
          <Text style={{ fontSize: 14, color: '#f0f0f0' }}>johndoe@example.com</Text>
        </View>

        {/* Default Drawer Items */}
        <DrawerItemList {...props} />

        {/* Logout Button */}
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

// Drawer Navigator
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true, // Hide header globally for all screens
        drawerItemStyle: {
          borderWidth: 1,
          borderColor: 'white',
          marginVertical: 5,
          borderRadius: 16,
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: '#60a5fa',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="BookingHistory" component={BookingHistory} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Reviews" component={Reviews} />
      <Drawer.Screen name="Practice" component={Practice} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
