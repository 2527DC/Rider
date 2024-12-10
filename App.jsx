import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

// Import Firebase if you're using Firebase to check initialization
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

function App() {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const checkAppInitialized = () => {
    try {
      const firebaseInitialized = firebase.apps.length > 0;

      if (firebaseInitialized) {
        // Get the default app's name
        const firebaseAppName = firebase.app().name;
        console.log('Firebase Initialized Name:', firebaseAppName);
      } else {
        console.log('Firebase is not initialized.');
      }

      setIsAppInitialized(firebaseInitialized);
    } catch (error) {
      console.error('Error checking initialization:', error);
      setIsAppInitialized(false);
    }
  };

  const writeData = async () => {
    try {
      const dbRef = database()
        .ref('/users/123'); // Reference to a node

      // Data to add
      const data = {
        name: 'John Doe',
        age: 30,
      };

      // Add data to the database
      await dbRef.set(data);

      console.log('Data written successfully:', data);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  useEffect(() => {
    checkAppInitialized();
    
    // Write data after Firebase initialization
    if (isAppInitialized) {
      writeData();
    }
  }, [isAppInitialized]); // Dependency on isAppInitialized to control data write

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        {isAppInitialized
          ? 'App is initialized'
          : 'App is not initialized'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default App;
