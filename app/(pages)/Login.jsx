import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements'; // For checkbox
import { FontAwesome, Feather } from '@expo/vector-icons'; // For icons
import { useRouter } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../../firebase.config';

const logo = require("../../assets/images/smartbuilder_logo.png");

const Login = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    console.log('handleLogin called');
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    try {
      const q = query(collection(db, "User"), where("Email", "==", email), where("Password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log('Login successful');
        router.push('ProjectListPage');
      } else {
        Alert.alert('Login Error', 'Invalid email or password.');
      }
    } catch (error) {
      console.log('Login error:', error.message);
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Welcome To SMARTBUILDER</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#3A9D9D" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
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
        onPress={handleLogin}
      >
        <Feather name="log-in" size={20} color="white" style={styles.loginIcon} />
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Sign Up Link to signup page */}
      <TouchableOpacity
        onPress={() => router.push('signup')}
      >
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