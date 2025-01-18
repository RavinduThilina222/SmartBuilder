import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Menubar = ({ onMenuPress }) => {
  return (
    <View style={styles.container}>
      {/* Hamburger Menu Icon */}
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={30} color="#fff" style={styles.icon} />
      </TouchableOpacity>

      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./../assets/images/smartbuilder_logo.png')} // Replace with the actual path to your logo file
          style={styles.logo}
        />
        <Text style={styles.title}>SMARTBUILDER</Text>
      </View>

      {/* Notification Icon */}
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={30} color="#fff" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#009688", // Teal color
    padding: 15,
    paddingHorizontal: 15,
    borderBottomEndRadius: 10,
    margin: 0,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40, // Adjust width
    height: 40, // Adjust height
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    paddingHorizontal: 5,
  },
});

export default Menubar;