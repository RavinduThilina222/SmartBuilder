import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback, Image, TextInput, ScrollView } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";
import { db } from "../../firebase.config";
import { collection, addDoc } from 'firebase/firestore';
import { router } from "expo-router";

const AddProject = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane
  const [timeline, setTimeline] = useState("2024/08/01 - 2025/01/25");
  const [subTimelines, setSubTimelines] = useState({
    excavation: "2024/08/01 - 2024/08/01",
    foundation: "2024/08/08 - 2024/08/10",
    structure: "2024/11/15 - 2024/11/17",
    finishing: "2025/01/20 - 2025/01/25"
  });
  const [projectTitle, setProjectTitle] = useState("Project Title");
  const [projectEstimation, setProjectEstimation] = useState("");
  const [dimention, setDimention] = useState("");

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

  const handleAddPlanPress = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        console.log('Selected asset: ', asset);
  
        const data = new FormData();
        data.append('file', asset.uri);
        data.append('upload_preset', 'plan_upload'); 
        data.append('cloud_name', 'dipz290mx');

        console.log('FormData: ', data);

        try {
          const res = await fetch('https://api.cloudinary.com/v1_1/dipz290mx/image/upload', {
            method: 'POST',
            body: data,
          });
          const result = await res.json();
          if (result.error) {
            console.error('Upload failed: ', result.error.message);
          } else {
            console.log('Upload success: ', result);
            setUploadedImageUrl(result.secure_url); // Store the uploaded image URL
          }
        } catch (error) {
          console.error('Upload failed:: ', error);
        }
      } else {
        console.log('No assets found in response');
      }
    });
  };

  const handleAddProjectPress = () => {
    // Add project to database
    const projectData = {
      title: projectTitle,
      timeline: timeline,
      subTimelines: subTimelines,
      planURL: uploadedImageUrl,
      estimation: projectEstimation,
      dimention: dimention,
    };

    addDoc(collection(db, 'projects'), projectData)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  const analyzeProject = () => {
    // Analyze project plan 
    router.push({
      pathname: 'ProjectDetailsPage',
      params: { title: projectTitle }
    });
  }

  const analyzeEstimation  = (dimention, material) => {
    // Analyze project estimation
  }

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.container}>
        <MenubarComponent onMenuPress={toggleMenu} />
        <Animated.View style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}>
          <NavigationPaneAdmin />
        </Animated.View>
        
          <View style={{ marginTop: 50, alignItems: 'flex-start' }}>
            <TextInput
              style={styles.title}
              value={projectTitle}
              onChangeText={setProjectTitle}
            />
          </View>
          <TouchableOpacity onPress={handleAddPlanPress}>
            <View style={styles.detailsCard}>
              {!uploadedImageUrl ? (
                <Text style={styles.planNumber}>No plans found. Upload project plan</Text>
              ) : (
                <Image source={{ uri: uploadedImageUrl }} style={styles.uploadedImage} />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.timelineCard}>
            <Text style={styles.timeline}>Timeline: <TextInput
              style={styles.timeline}
              value={timeline}
              onChangeText={setTimeline}
            />
            </Text> 
            <Text style={styles.subTimeline}>Excavation: <TextInput
              style={styles.subTimeline}
              value={subTimelines.excavation}
              onChangeText={(text) => setSubTimelines({ ...subTimelines, excavation: text })}
            /></Text>
            <Text style={styles.subTimeline}>Foundation: <TextInput
              style={styles.subTimeline}
              value={subTimelines.foundation}
              onChangeText={(text) => setSubTimelines({ ...subTimelines, foundation: text })}
            /></Text>
            <Text style={styles.subTimeline}>Structure: <TextInput
              style={styles.subTimeline}
              value={subTimelines.structure}
              onChangeText={(text) => setSubTimelines({ ...subTimelines, structure: text })}
            /></Text>
            <Text style={styles.subTimeline}>Finishing: <TextInput
              style={styles.subTimeline}
              value={subTimelines.finishing}
              onChangeText={(text) => setSubTimelines({ ...subTimelines, finishing: text })}
            /></Text>
          </View>
          <TouchableOpacity style={styles.addPlanButton} onPress={handleAddProjectPress}>
            <Text style={styles.buttonText}>+ Add Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreDetailsButton} onPress={analyzeProject}>
            <Text style={styles.buttonText}>More Details</Text>
          </TouchableOpacity>
          
          <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
      
      </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 10 },
  detailsCard: { backgroundColor: "#E0E0E0", padding: 50, borderRadius: 5, marginBottom: 10 },
  projectTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  planNumber: { color: "#757575", textAlign: "center", marginBottom: 10 },
  addPlanButton: { backgroundColor: "#00ACC1", padding: 10, borderRadius: 5, marginBottom: 75 },
  timelineCard: { backgroundColor: "#B2EBF2", padding: 10, borderRadius: 5, marginBottom: 10 },
  moreDetailsButton: { backgroundColor: "#66BB6A", padding: 10, borderRadius: 5, marginBottom: 10 },
  estimateButton: { backgroundColor: "#039BE5", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  footer: { textAlign: "center", color: "#05f", marginTop: 50, fontSize: 12 },
  timeline: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subTimeline: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    paddingLeft: 10,
  },
  navigationPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
    backgroundColor: '#fff', // Ensure the navigation pane has a background color
    shadowColor: '#000', // Add shadow for better visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default AddProject;