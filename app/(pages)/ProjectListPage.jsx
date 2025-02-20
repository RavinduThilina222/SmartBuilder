import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from "expo-router";

const ProjectListPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCol = collection(db, 'projects');
      const projectsSnapshot = await getDocs(projectsCol);
      const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsList);
    };

    fetchProjects();
  }, []);

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

  const handleProjectPress = (project) => {
    router.push({
      pathname: 'ProjectPage',
      params: { document_id: project.id }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={styles.container}>
        <MenubarComponent onMenuPress={toggleMenu} />
        <Animated.View style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}>
          <NavigationPaneAdmin />
        </Animated.View>
        <View style={{ marginTop: 60, alignItems: 'flex-start' }}>
          <Text style={styles.header}>PROJECTS</Text>
        </View>
        <TouchableOpacity style={styles.newProjectButton} onPress={() => router.push('AddProject')}>
          <Text style={styles.buttonText}>+ New Project</Text>
        </TouchableOpacity>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.projectItem} onPress={() => handleProjectPress(item)}>
              <Text style={styles.projectName}>{item.title}</Text>
              <Text style={styles.timeline}>{item.timeline}</Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00838F", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 10 },
  newProjectButton: { backgroundColor: "#00E676", padding: 10, borderRadius: 5, marginBottom: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  projectItem: { backgroundColor: "#00796B", padding: 15, borderRadius: 5, marginVertical: 5 },
  projectName: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  timeline: { color: "#ddd" },
  footer: { textAlign: "center", color: "#888", marginTop: 20, fontSize: 12 },
  navigationPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
  },
});

export default ProjectListPage;