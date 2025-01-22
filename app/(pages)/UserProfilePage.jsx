import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Picker } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const UserProfilePage = () => {
  const [gender, setGender] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SMARTBUILDER</Text>
      </View>
      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={<FontAwesome name="user-circle-o" size={24} color="black" />} />
        <TouchableOpacity>
          <Text style={styles.uploadText}>Upload a Profile Picture</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Last Name" />
      <View style={styles.input}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Address" />
      <TextInput style={styles.input} placeholder="Username" />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete your Account</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>Copyright ©2024 SMARTBUILDER</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#0da192',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#ff5252',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default UserProfilePage;