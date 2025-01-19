import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangePasswordPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Change your Password</Text>
      <TextInput style={styles.input} placeholder="Current Password" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="New Password" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>Copyright ©2024 SMARTBUILDER</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0da192',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
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
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 20,
  },
});

export default ChangePasswordPage;
