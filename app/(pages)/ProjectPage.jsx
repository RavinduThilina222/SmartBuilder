import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";
import { router } from "expo-router";

const ProjectPage = () => {
  const route = useRoute();
  const { document_id } = route.params;
  const [projectDetails, setProjectDetails] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const projectDoc = doc(db, 'projects', document_id);
      const projectSnapshot = await getDoc(projectDoc);
      if (projectSnapshot.exists()) {
        setProjectDetails(projectSnapshot.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchProjectDetails();
  }, [document_id]);

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

  if (!projectDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleProjectPress = () => {
    router.push({
      pathname: 'ProjectDetailsPage',
      params: { title: projectDetails.title }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={styles.container}>
        <MenubarComponent onMenuPress={toggleMenu} />
        <Animated.View style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}>
          <NavigationPaneAdmin />
        </Animated.View>
        <View style={{ marginTop: 50, alignItems: 'flex-start' }}>
          <Text style={styles.projectTitle}>{projectDetails.title}</Text>
        </View>
        <View style={styles.detailsCard}>
          {!projectDetails.planURL && <Text style={styles.planNumber}>no plans found</Text>}
          {projectDetails.planURL && (
            <Image source={{ uri: projectDetails.planURL }} style={styles.uploadedImage} />
          )}
        </View>
        
        <View style={styles.timelineCard}>
          <Text style={styles.timeline}>Timeline: {projectDetails.timeline}</Text>
          <Text style={styles.subTimeline}>Excavation: {projectDetails.subTimelines.excavation}</Text>
          <Text style={styles.subTimeline}>Foundation: {projectDetails.subTimelines.foundation}</Text>
          <Text style={styles.subTimeline}>Structure: {projectDetails.subTimelines.structure}</Text>
          <Text style={styles.subTimeline}>Finishing: {projectDetails.subTimelines.finishing}</Text>
        </View>
        <TouchableOpacity style={styles.moreDetailsButton}
        onPress={handleProjectPress}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.estimateButton}>
          <Text style={styles.buttonText}>$ Estimate</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 10 },
  detailsCard: { backgroundColor: "#E0E0E0", padding: 50, borderRadius: 5, marginBottom: 10 },
  projectTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  planNumber: { color: "#757575" , textAlign: "center", marginBottom: 10 },
  addPlanButton: { backgroundColor: "#00ACC1", padding: 10, borderRadius: 5, marginBottom: 10 },
  timelineCard: { backgroundColor: "#B2EBF2", padding: 10, borderRadius: 5, marginBottom: 10 },
  moreDetailsButton: { backgroundColor: "#66BB6A", padding: 10, borderRadius: 5, marginBottom: 10 },
  estimateButton: { backgroundColor: "#039BE5", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  footer: { textAlign: "center", color: "#888", marginTop: 0, fontSize: 12 },
  timeline: {
    fontSize: 18,
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

export default ProjectPage;