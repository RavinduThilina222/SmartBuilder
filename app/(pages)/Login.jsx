import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { CheckBox } from 'react-native-elements'; // For checkbox
import { FontAwesome, Feather } from '@expo/vector-icons'; // For icons

const logo = require("../../assets/images/smartbuilder_logo.png");

const Login = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Welcome To SMARTBUILDER</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#3A9D9D" style={styles.icon} />
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#777"
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

      {/* Forgotten Account Link */}
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgotten Account?</Text>
      </TouchableOpacity>

      {/* Remember Me Checkbox */}
      <View style={styles.rememberMeContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          style={styles.checkbox}
        />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Feather name="log-in" size={20} color="white" style={styles.loginIcon} />
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity>
        <Text style={styles.signUpText}>Sign up here</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>Copyright ©2024 SMARTBUILDER</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  forgotText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 5,
    textAlign: 'left',
    marginRight: '50%'
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginTop: 5,
    textAlign: 'left',
    marginRight: '50%'
  },
  checkbox: {
    marginRight: 10,
  },
  rememberMeText: {
    color: '#ffffff',
    fontSize: 14,
  },
  loginButton: {
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
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  signUpText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 50,
  },
});

export default Login;
