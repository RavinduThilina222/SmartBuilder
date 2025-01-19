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

export default function DeleteLabourScreen() {
  const [labourID, setLabourID] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = () => {
    if (labourID.trim() === "") {
      alert("Please enter a Labour ID to delete.");
      return;
    }

    alert(`Deleted Labour ID: ${labourID}`);
    setLabourID(""); // Clear the input field after deletion
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
        <Text style={styles.title}>Delete Labour</Text>

        {/* Label and Input */}
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

        {/* Delete Button */}
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
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
  inputContainer: {
    marginBottom: 20,
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
    backgroundColor: "#e53935",
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
