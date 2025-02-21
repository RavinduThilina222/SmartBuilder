import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


const logo = require("../../assets/images/smartbuilder_logo.png");

const Welcome = () => {
  
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      
      <Text style={styles.title}>Welcome to SmartBuilder</Text>
      <Text style={styles.subtitle}>The ultimate tool for building</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={()=> router.push('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      {/* Footer */}
      <Text style={styles.footerText}>Copyright ©2024 SMARTBUILDER</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3A9D9D',
        paddingVertical: 200
    },
    logo: {
        width: 262,
        height: 172
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontStyle: 'normal', 
        fontFamily: 'sans-serif',
        fontWeight: '500',
        paddingTop: 40
    },
    subtitle: {
        fontSize: 14,
        color: 'white',
        fontStyle: 'italic',
        fontFamily: 'sans-serif',
        fontWeight: '300',
        paddingTop: 10
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#7087d4',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    footerText: {
      color: '#ffffff',
      fontSize: 14,
      marginTop: 150,
    },
});

