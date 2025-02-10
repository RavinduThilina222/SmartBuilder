import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback, Image, Modal, FlatList } from 'react-native';
import React,{useState} from 'react';
import MenubarComponent from '../../components/MenubarComponentAdmin';
import NavigationPaneAdmin from '../../components/NavigationPaneAdmin';

export default function DeleteMaterials() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0];


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -250 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleScreenTap = () => {
    closeMenu();
  };

  return (
     <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={styles.main}>
        <Image
          source={require('./../../assets/images/material_home.jpg')}
          style={styles.backgroundImage}
        />
        <View>
          <MenubarComponent onMenuPress={toggleMenu} />
          <Animated.View style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}>
            <NavigationPaneAdmin />
          </Animated.View>

          <View style={styles.container}>
            <Text style={styles.title}>Delete Material</Text>

            

            {/* Footer */}
            <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    resizeMode: "cover",
  },
  navigationPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
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
    opacity: 0.4, // Optional: to make the background image semi-transparent
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
    borderRadius: 10,
    margin: 15,
    marginTop: 150,
  },
  menuIcon: {
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 24,
    paddingTop: 40,
    paddingBottom: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#3C9796",
    color: "#565252",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 50,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    marginTop: 20,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#009688",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 18,
  },
});