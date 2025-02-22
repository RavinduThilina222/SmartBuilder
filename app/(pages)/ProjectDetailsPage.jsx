import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity,StyleSheet, Animated, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native';
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";
import { db } from "../../firebase.config";
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';


export default function ProjectDetailsPage() {
  const route = useRoute();
  console.log('Route:', route); // Add logging
  const title = route?.params?.title || ''; // Ensure route.params is defined and get the title
  console.log('Title:', title); // Add logging

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [projectId, setProjectId] = useState(null); // Store the document ID
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane

  useEffect(() => {
    if (title) {
      const fetchProjectDetails = async () => {
        try {
          const q = query(collection(db, 'projects'), where('title', '==', title));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const projectDoc = querySnapshot.docs[0];
            const projectData = projectDoc.data();
            setProjectDetails(projectData);
            setProjectId(projectDoc.id); // Store the document ID
            analyzeImage(projectData.planURL);
          } else {
            console.log("No such document!");
            setError("No such document!");
          }
        } catch (err) {
          console.error("Error fetching project details:", err);
          setError("Error fetching project details");
        } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    } else {
      setLoading(false);
      setError("No title provided");
    }
  }, [title]);

  const analyzeImage = async (imageUrl) => {
    const genAI = new GoogleGenerativeAI("AIzaSyBxqhO8Gn5bveeXoO8IzTC6_REFldxQ1eI");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
    Image.getSize(imageUrl, (width, height) => {
      const prompt = `Analyze the dimensions of the project plan image: ${imageUrl}. The dimensions are ${width}x${height} feet and inches. Please provide detailed analysis of the dimensions for the all different rooms such as the kitchen, living room, bedrooms, and bathrooms in JSON format.
      And also set avarage value for each dimention.
      No need to describe the image, just provide the analysis of the  dimension values in JSON format.
      don't need multiple values for the same dimention, just provide the avarage value for each dimention.
      for the wall thickness(not need depth),trench,columns dimentions  assigned the assumed dimension values like height, width, depth for each dimention.
      Also include the roof details(use asbestos sheet) and area of the roof in the analysis.
      include the floor details and area of the floor in the analysis.`;

    
      model.generateContent(prompt)
        .then(result => {
          setAnalysisResult(result.response.text());
        })
        .catch(error => {
          console.error('Error analyzing image:', error);
          setError('Error analyzing image');
        });
    }, error => {
      console.error('Error getting image size:', error);
      setError('Error getting image size');
    });
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

  const saveDimensions = async () => {
    if (projectDetails && analysisResult && projectId) {
      try {
        console.log('Project ID:', projectId); // Add logging
        const projectRef = doc(db, 'projects', projectId); // Use the stored document ID
        const projectDoc = await getDoc(projectRef);
        if (projectDoc.exists()) {
          await updateDoc(projectRef, {
            dimensions: analysisResult
          });
          alert('Dimensions saved successfully!');
        } else {
          console.error('No document to update:', projectId);
          alert('No document to update');
        }
      } catch (error) {
        console.error('Error saving dimensions:', error);
        alert('Error saving dimensions');
      }
    } else {
      alert('No dimensions to save');
    }
  };

  const renderTable = (data) => (
    <View style={styles.table}>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.tableRow}>
          <Text style={styles.tableCell}>{key}</Text>
          <Text style={styles.tableCell}>{JSON.stringify(value)}</Text>
        </View>
      ))}
    </View>
  );

  const handleEstimationPress = () => {
      router.push({
        pathname: 'EstimatePage',
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
        <ScrollView style={{ marginTop: 60 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : projectDetails ? (
            <>
              <Text style={styles.sectionHeader}>{projectDetails.title}</Text>
              <Image source={{ uri: projectDetails.planURL }} style={styles.uploadedImage} />
              <Text style={styles.subHeader}>Construction Specification</Text>
              
              {/* Display analysis result */}
              {analysisResult && (
                <View style={styles.analysisResult}>
                  <Text style={styles.subHeader}>Analysis Result</Text>
                  {typeof analysisResult === 'object' ? (
                    <>
                      {renderTable(analysisResult.project_plan_dimensions)}
                      {renderTable(analysisResult.room_dimensions)}
                      {renderTable(analysisResult.structural_elements)}
                      {renderTable(analysisResult.roof)}
                      {renderTable(analysisResult.floor)}
                    </>
                  ) : (
                    <Text>{analysisResult}</Text>
                  )}
                </View>
              )}
            </>
          ) : (
            <Text style={styles.errorText}>No project details available</Text>
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={saveDimensions} />
        </View>
        <TouchableOpacity style={styles.estimateButton}
          onPress={handleEstimationPress}>
          <Text style={styles.buttonText}>$ Estimate</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7F8',
    padding: 10,
  },
  header: {
    backgroundColor: '#008080',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#005757',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#007575',
  },
  subSection: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    color: '#005757',
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  navigationPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
  },
  footer: { textAlign: "center", color: "#888", marginTop: 20, fontSize: 12 },
  uploadedImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  estimateButton: { backgroundColor: "#3b28c9", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  analysisResult: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
  },
});