import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get("window");

export default function LabourPage() {
  const [location, setLocation] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [contractType, setContractType] = useState('');
  const [experience, setExperience] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('./../../assets/images/material_home.jpg')}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Image
            source={require('../../assets/images/smartbuilder_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>SMARTBUILDER</Text>
        </View>
        <TouchableOpacity>
          <Icon name="account-circle" size={28} color="white" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Title */}
              <Text style={styles.title}>Labour</Text>
      {/* Main Content */}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Location</Text>
        <RNPickerSelect
          onValueChange={(value) => setLocation(value)}
          items={[
            { label: 'New York', value: 'new_york' },
            { label: 'Los Angeles', value: 'los_angeles' },
            { label: 'Chicago', value: 'chicago' },
          ]}
          placeholder={{ label: 'Select location', value: null }}
          style={pickerSelectStyles}
          Icon={() => <Icon name="arrow-drop-down" size={24} color="#777" />}
        />

        <Text style={styles.label}>Job Category</Text>
        <RNPickerSelect
          onValueChange={(value) => setJobCategory(value)}
          items={[
            { label: 'Electrician', value: 'electrician' },
            { label: 'Plumber', value: 'plumber' },
            { label: 'Carpenter', value: 'carpenter' },
          ]}
          placeholder={{ label: 'Select job category', value: null }}
          style={pickerSelectStyles}
          Icon={() => <Icon name="arrow-drop-down" size={24} color="#777" />}
        />

        <Text style={styles.label}>Language</Text>
        <RNPickerSelect
          onValueChange={(value) => setLanguage(value)}
          items={[
            { label: 'English', value: 'english' },
            { label: 'Spanish', value: 'spanish' },
            { label: 'French', value: 'french' },
          ]}
          placeholder={{ label: 'Select language', value: null }}
          style={pickerSelectStyles}
          Icon={() => <Icon name="arrow-drop-down" size={24} color="#777" />}
        />

        <Text style={styles.label}>Contract Type</Text>
        <RNPickerSelect
          onValueChange={(value) => setContractType(value)}
          items={[
            { label: 'Full-time', value: 'full_time' },
            { label: 'Part-time', value: 'part_time' },
          ]}
          placeholder={{ label: 'Select contract type', value: null }}
          style={pickerSelectStyles}
          Icon={() => <Icon name="arrow-drop-down" size={24} color="#777" />}
        />

        <Text style={styles.label}>Experience</Text>
        <RNPickerSelect
          onValueChange={(value) => setExperience(value)}
          items={[
            { label: '1 year', value: '1_year' },
            { label: '2 years', value: '2_years' },
            { label: '3+ years', value: '3_years' },
          ]}
          placeholder={{ label: 'Select experience', value: null }}
          style={pickerSelectStyles}
          Icon={() => <Icon name="arrow-drop-down" size={24} color="#777" />}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOk}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6, // Semi-transparent
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#006D65",
    height: 60,
    paddingHorizontal: 16,
  },
  menuIcon: {
    padding: 4,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileIcon: {
    padding: 4,
  },
  title: {
    fontSize: 24,
    paddingTop: 40,
    paddingBottom:5,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
    marginVertical: 5,
  },
  formContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    marginTop: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  buttonBack: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonOk: {
    backgroundColor: "#006D65",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
});

// Picker styles
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#000",
    marginBottom: 20,
    fontSize: 16,
  },
  inputAndroid: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#000",
    marginBottom: 15,
    fontSize: 16,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});
