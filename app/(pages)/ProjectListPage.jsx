import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Animated, TouchableWithoutFeedback } from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";
const projects = [
  { id: "1", name: "Project_05", timeline: "2024/08/01 - 2025/01/25" },
  { id: "2", name: "Project_04", timeline: "2024/03/01 - 2024/12/01" },
  { id: "3", name: "Project_03", timeline: "2024/01/07 - 2025/01/10" },
  { id: "4", name: "Project_02", timeline: "2023/11/04 - 2024/06/12" },
  { id: "5", name: "Project_01", timeline: "2023/10/01 - 2024/11/25" },
];

const ProjectListPage = () => {
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
      <View style={{ marginTop: 60, alignItems: 'flex-start' }}>
        <Text style={styles.header}>PROJECTS</Text>
      </View>
      <TouchableOpacity style={styles.newProjectButton}>
        <Text style={styles.buttonText}>+ New Project</Text>
      </TouchableOpacity>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.projectItem}>
            <Text style={styles.projectName}>{item.name}</Text>
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
});

export default ProjectListPage;