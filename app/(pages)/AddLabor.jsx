import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";

export default function AddLabourScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane

  // Input states
  const [labourID, setLabourID] = useState("");
  const [labourName, setLabourName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -250 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSave = () => {
    console.log("Labour Details:");
    console.log(`ID: ${labourID}, Name: ${labourName}, Address: ${address}, City: ${city}, Phone: ${phoneNo}`);
    alert("Labour details saved successfully!");
    // Add your logic for saving labour details here
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.main}>
        <Image
          source={require("./../../assets/images/material_home.jpg")}
          style={styles.backgroundImage}
        />
        <View style={styles.container}>
          <MenubarComponent onMenuPress={toggleMenu} />
          <Animated.View
            style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}
          >
            <NavigationPaneAdmin />
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Add Labour</Text>

          {/* ScrollView for form */}
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <View style={styles.form}>
              <Text style={styles.label}>Labour ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Labour ID"
                placeholderTextColor="#ccc"
                value={labourID}
                onChangeText={(text) => setLabourID(text)}
              />

              <Text style={styles.label}>Labour Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Labour Name"
                placeholderTextColor="#ccc"
                value={labourName}
                onChangeText={(text) => setLabourName(text)}
              />

              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address"
                placeholderTextColor="#ccc"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />

              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter City"
                placeholderTextColor="#ccc"
                value={city}
                onChangeText={(text) => setCity(text)}
              />

              <Text style={styles.label}>Phone No</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Phone No"
                placeholderTextColor="#ccc"
                value={phoneNo}
                onChangeText={(text) => setPhoneNo(text)}
                keyboardType="phone-pad"
              />
            </View>
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setLabourID("");
                setLabourName("");
                setAddress("");
                setCity("");
                setPhoneNo("");
              }}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>©2024 SMARTBUILDER</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  navigationPane: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.6, // Optional: to make the background image semi-transparent
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 20
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
  scrollView: {
    flex: 1,
    marginBottom: 18, // Adjusted to ensure footer visibility
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    marginVertical: 11,
    marginHorizontal: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#009688",
    padding: 9,
    marginVertical: 7,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
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
    marginTop: 20,
  },
});
