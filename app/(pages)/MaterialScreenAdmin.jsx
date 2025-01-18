import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import MenubarComponent from "./../../components/MenubarComponent";


export default function MaterialsScreen() {
  return (
    <ImageBackground
      source={require('./../../assets/images/material_home.jpg')} // Replace with your background image URL or require('./path/to/image.jpg')
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header */}
        <MenubarComponent />

        {/* Title */}
        <Text style={styles.title}>Materials</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton title="Add Materials" />
          <CustomButton title="View Materials" />
          <CustomButton title="Update Materials" />
          <CustomButton title="Delete Materials" />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>©2024 SMARTBUILDER</Text>
      </View>
    </ImageBackground>
  );
}

const CustomButton = ({ title }) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  
  menuIcon: {
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 24,
    paddingTop: 40,
    paddingBottom:20,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#009688",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#fff",
  },
});
