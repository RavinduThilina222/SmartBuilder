import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback, Image, Modal, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from './../../firebase.config.js';
import MenubarComponent from '../../components/MenubarComponentAdmin';
import NavigationPaneAdmin from '../../components/NavigationPaneAdmin';

export default function AddMaterial() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane
  const [materialType, setMaterialType] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [materialPrice, setMaterialPrice] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddMaterial = async () => {
    if (!materialType || !materialName || !materialPrice || !image) {
      alert('Please fill all the fields and upload an image.');
      return;
    }
  
    try {
      // Fetch the image and convert it to a blob
      const response = await fetch(image);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
  
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `/materials/${Date.now()}_${materialName}`);
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);
  
      // Add material data to Firestore
      await addDoc(collection(db, 'materials'), {
        materialType,
        materialName,
        materialPrice,
        imageUrl,
      });
  
      alert('Material added successfully!');
  } catch (error) {
    console.error('Error adding material: ', error);
    alert(`Error adding material: ${error.message}`);
  }
  };

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

  const materialOptions = [
    { label: 'Wood', value: 'wood' },
    { label: 'Metal', value: 'metal' },
    { label: 'Plastic', value: 'plastic' },
    // Add more items as needed
  ];

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
            <Text style={styles.title}>Add Material</Text>

            {/* Dropdown */}
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(true)}
              >
                <Text style={{ color: materialType ? '#fff' : '#fff' }}>
                  {materialType || 'Select the material type'}
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={materialOptions}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                          setMaterialType(item.label);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalItemText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>

            {/* Material Name */}
            <TextInput
              style={styles.input}
              placeholder="Enter the material name"
              placeholderTextColor="#fff"
              value={materialName}
              onChangeText={setMaterialName}
            />

            {/* Material Price */}
            <TextInput
              style={styles.input}
              placeholder="Enter the material price"
              placeholderTextColor="#fff"
              value={materialPrice}
              keyboardType="numeric"
              onChangeText={setMaterialPrice}
            />

            {/* Upload Image */}
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.uploadedImage} />
              ) : (
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              )}
            </TouchableOpacity>

            {/* Add Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddMaterial}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

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