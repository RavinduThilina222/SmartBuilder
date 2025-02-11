import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  ScrollView,
  Alert
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons'; // For icons
import { collection, addDoc } from 'firebase/firestore';
import { db } from './../../firebase.config';
import { router, useRouter } from 'expo-router';

const logo = require("../../assets/images/smartbuilder_logo.png");

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !mobileNumber || !gender || !address || !password) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      await addDoc(collection(db, "User"), {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Mobile_Number: mobileNumber,
        Gender: gender,
        Address: address,
        Password: password,
        Role: 'User'
      });
      Alert.alert('Success', 'Account created successfully.');
      router.push('Login');
    } catch (error) {
      console.log('Signup error:', error.message);
      Alert.alert('Signup Error', error.message);
    }
  };

  const genders = ['Male', 'Female', 'Other'];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <Image source={logo} style={styles.logo} />

        {/* Title */}
        <Text style={styles.title}>Create Your Account</Text>

        {/* First Name Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#3A9D9D" style={styles.icon} />
          <TextInput
            placeholder="First Name"
            style={styles.input}
            placeholderTextColor="#777"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* Last Name Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#3A9D9D" style={styles.icon} />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            placeholderTextColor="#777"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#3A9D9D" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Mobile Number Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color="#3A9D9D" style={styles.icon} />
          <TextInput
            placeholder="Mobile Number"
            style={styles.input}
            placeholderTextColor="#777"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>

        {/* Gender Dropdown */}
        <View style={styles.inputContainer}>
          <FontAwesome name="venus-mars" size={20} color="#3A9D9D" style={styles.icon} />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: gender ? '#333' : '#777' }}>
              {gender || 'Select Gender'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={genders}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setGender(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Address Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="address-card" size={20} color="#3A9D9D" style={styles.icon} />
          <TextInput
            placeholder="Address"
            style={styles.input}
            placeholderTextColor="#777"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="key" size={20} color="#3A9D9D" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            style={styles.input}
            placeholderTextColor="#777"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.icon}
          >
            <Feather
              name={passwordVisible ? "eye" : "eye-off"}
              size={20}
              color="#3A9D9D"
            />
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
        >
          <Feather name="user-plus" size={20} color="white" style={styles.signUpIcon} />
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>Copyright ©2024 SMARTBUILDER</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    backgroundColor: '#3A9D9D',
    alignItems: 'center',
    paddingVertical: 80,
  },
  logo: {
    width: 262,
    height: 172,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: '#00d6ff',
    marginBottom: 20,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: '85%',
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
  },
  signUpButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  signUpIcon: {
    marginRight: 10,
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SignUp;