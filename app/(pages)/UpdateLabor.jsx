import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";

export default function UpdateLabourScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0];

  // Input states
  const [labourID, setLabourID] = useState("");
  const [labourName, setLabourName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleUpdate = () => {
    if (labourID.trim() === "") {
      alert("Please enter a Labour ID to update.");
      return;
    }

    alert(`Updated Labour Details:\nID: ${labourID}\nName: ${labourName}\nAddress: ${address}\nCity: ${city}\nPhone: ${phoneNo}`);
    // Clear the input fields after updating
    setLabourID("");
    setLabourName("");
    setAddress("");
    setCity("");
    setPhoneNo("");
  };

  return (
    <View style={styles.main}>
      <Image
        source={require("./../../assets/images/material_home.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        {/* Menubar and Navigation Pane */}
        <MenubarComponent onMenuPress={toggleMenu} />
        <Animated.View
          style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}
        >
          <NavigationPaneAdmin />
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>Update Labour</Text>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Labour ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Labour ID"
              placeholderTextColor="#ccc"
              value={labourID}
              onChangeText={(text) => setLabourID(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Labour Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Labour Name"
              placeholderTextColor="#ccc"
              value={labourName}
              onChangeText={(text) => setLabourName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              placeholderTextColor="#ccc"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter City"
              placeholderTextColor="#ccc"
              value={city}
              onChangeText={(text) => setCity(text)}
            />
          </View>

          <View style={styles.inputContainer}>
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
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>©2024 SMARTBUILDER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "center",
  },
  navigationPane: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
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
