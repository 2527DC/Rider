import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Blue Wave */}
      <View style={styles.topWave} />

      {/* Login Text */}
      <Text style={styles.loginText}>Login via Email</Text>

      {/* Logo */}
      <Image
        source={{ uri: "https://your-logo-url.com/logo.png" }} // Replace with your logo URL or local image path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Bottom Blue Triangle */}
      <View style={styles.bottomTriangle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topWave: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
    backgroundColor: "#4285F4", // Adjust the color
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  loginText: {
    fontSize: 20,
    color: "#000",
    marginTop: 180,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  bottomTriangle: {
    position: "absolute",
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 150,
    borderRightWidth: 150,
    borderBottomWidth: 200,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#4285F4",
  },
})