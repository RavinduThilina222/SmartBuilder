import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const NavigationPaneAdmin = () => {
  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      {/* Materials */}
      <TouchableOpacity style={styles.navItem}>
        <MaterialIcons name="build" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Materials</Text>
      </TouchableOpacity>

      {/* Suppliers */}
      <TouchableOpacity style={styles.navItem}>
        <FontAwesome5 name="file" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Estimations</Text>
      </TouchableOpacity>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Admin */}
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-circle-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Admin</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="settings-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Settings</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009688", // Teal background
    padding: 15,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  spacer: {
    flex: 1,
  },
});

export default NavigationPaneAdmin;
