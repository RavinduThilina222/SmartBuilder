import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";

export default function LabourPageScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0];
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ImageBackground
      source={require("./../../assets/images/material_home.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.main}>
        <View style={styles.container}>
          {/* Menubar and Navigation Pane */}
          <MenubarComponent onMenuPress={toggleMenu} />
          <Animated.View
            style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}
          >
            <NavigationPaneAdmin />
          </Animated.View>

          {/* Page Title */}
          <Text style={styles.title}>Hire Labour</Text>
          {/* Scrollable Content */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Project Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Project (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter project name..."
                placeholderTextColor="#ccc"
              />
            </View>

            {/* Date Selection Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Select Date</Text>
              <TouchableOpacity
                style={styles.calendarButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.calendarText}>
                  {date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date" // Change to "time" if time picker is needed
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChangeDate}
                />
              )}
            </View>

            {/* Work Duration Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Work Duration</Text>
              <TouchableOpacity style={styles.radioButton}>
                <Text style={styles.radioText}>Full-Time (8 hours/day)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioButton}>
                <Text style={styles.radioText}>Part-Time</Text>
              </TouchableOpacity>
            </View>

            {/* Additional Details Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Additional Requirements</Text>
              <TextInput
                style={styles.textArea}
                multiline={true}
                placeholder="Enter additional details..."
                placeholderTextColor="#ccc"
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.hireButton}>
                <Text style={styles.buttonText}>Hire</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* Footer */}
          <Text style={styles.footer}>©2024 SMARTBUILDER</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundImage:'rgba(255, 255, 255, 0.8)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
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
    opacity:0.9,
  },
  navigationPane: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "Black",
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    color: "#333",
  },
  calendarButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  calendarText: {
    color: "#333",
    fontSize: 16,
  },
  radioButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  radioText: {
    fontSize: 12,
    color: "#333",
  },
  textArea: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    color: "#333",
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 11,
    alignItems: "center",
    marginRight: 10,
  },
  hireButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 11,
    alignItems: "center",
    marginLeft: 10,
    borderwidth: 0.5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 20,
  },
});


