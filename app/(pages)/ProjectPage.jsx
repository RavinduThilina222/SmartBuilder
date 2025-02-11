import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from '../../components/NavigationPaneAdmin';

const ProjectPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane

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
      <View style={styles.container}>
        <MenubarComponent onMenuPress={toggleMenu} />
        <Animated.View style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}>
          <NavigationPaneAdmin />
        </Animated.View>
        <View style={{ marginTop: 50, alignItems: 'flex-start' }}>
          <Text style={styles.projectTitle}>Project_05</Text>
        </View>
        <View style={styles.detailsCard}>
          <Text style={styles.planNumber}>Plan No: 8043</Text>
        </View>
        <TouchableOpacity style={styles.addPlanButton}>
          <Text style={styles.buttonText}>+ Add Plan</Text>
        </TouchableOpacity>
        <View style={styles.timelineCard}>
          <Text style={styles.timeline}>Timeline: 2024/08/01 - 2025/01/25</Text>
          <Text style={styles.subTimeline}>Excavation: 2024/08/01 - 2024/08/01</Text>
          <Text style={styles.subTimeline}>Foundation: 2024/08/08 - 2024/08/10</Text>
          <Text style={styles.subTimeline}>Structure: 2024/11/15 - 2024/11/17</Text>
          <Text style={styles.subTimeline}>Finishing: 2025/01/20 - 2025/01/25</Text>
        </View>
        <TouchableOpacity style={styles.moreDetailsButton}>
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
  planNumber: { color: "#757575" },
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
});

export default ProjectPage;