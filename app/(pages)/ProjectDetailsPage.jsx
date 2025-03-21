import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import MenubarComponent from "../../components/MenubarComponentAdmin";
import NavigationPaneAdmin from "../../components/NavigationPaneAdmin";
import { db } from "../../firebase.config";
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

export default function ProjectDetailsPage() {
  const route = useRoute();
  console.log('Route:', route);
  const title = route?.params?.title || '';
  console.log('Title:', title);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slideAnim = useState(new Animated.Value(-250))[0];

  // Default template for manual entry
  const [dimensions, setDimensions] = useState({
    project_dimensions: {
      width: "",
      length: "",
      area: ""
    },
    rooms: {
      kitchen: { width: "", length: "" },
      living_room: { width: "", length: "" },
      bedrooms: { width: "", length: "" },
      bathrooms: { width: "", length: "" }
    },
    structural_elements: {
      wall: { thickness: "", height: "" },
      trench: { width: "", depth: "" },
      columns: { width: "", depth: "", height: "" }
    },
    roof: {
      material: "asbestos sheet",
      area: ""
    },
    floor: {
      material: "concrete",
      area: ""
    }
  });

  useEffect(() => {
    if (title) {
      const fetchProjectDetails = async () => {
        try {
          const q = query(collection(db, 'projects'), where('title', '==', title));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const projectDoc = querySnapshot.docs[0];
            const projectData = projectDoc.data();
            console.log("Fetched dimensions from Firestore:", projectData.dimensions);
            setProjectDetails(projectData);
            setProjectId(projectDoc.id);
            
            // Check if dimensions already exist
            if (projectData.dimensions) {
              try {
                // Check if dimensions is a string
                let dimensionsData = projectData.dimensions;
            
                // Remove Markdown-style code block delimiters if present
                if (typeof dimensionsData === 'string') {
                  dimensionsData = dimensionsData.replace(/```json|```/g, '').trim();
                }
            
                // Parse the cleaned string or use it directly if it's already an object
                const parsedDimensions = typeof dimensionsData === 'string'
                  ? JSON.parse(dimensionsData)
                  : dimensionsData;
            
                setAnalysisResult(parsedDimensions);
                setDimensions(parsedDimensions);
              } catch (err) {
                console.log("Error parsing stored dimensions, using default template:", err);
              }
            } else {
              analyzeImage(projectData.planURL);
            }
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
  
    try {
      Image.getSize(imageUrl, (width, height) => {
        const prompt = `You are tasked with creating a sample construction project dimension template in JSON format.
        
        The template should include:
        1. Overall project dimensions (width, length, area)
        2. Room dimensions for kitchen, living room, bedrooms, and bathrooms
        3. Structural elements like walls, trenches, and columns
        4. Roof details using asbestos sheet
        5. Floor details
        
        Please fill in reasonable default values for a standard residential building, using feet for measurements.
        
        Return ONLY a valid JSON object in the following structure:
        {
          "project_dimensions": {
            "width": "X feet",
            "length": "Y feet",
            "area": "Z sq ft"
          },
          "rooms": {
            "kitchen": { "width": "A feet", "length": "B feet" },
            "living_room": { "width": "C feet", "length": "D feet" },
            "bedrooms": { "width": "E feet", "length": "F feet" },
            "bathrooms": { "width": "G feet", "length": "H feet" }
          },
          "structural_elements": {
            "wall": { "thickness": "I feet", "height": "J feet" },
            "trench": { "width": "K feet", "depth": "L feet" },
            "columns": { "width": "M feet", "depth": "N feet", "height": "O feet" }
          },
          "roof": {
            "material": "asbestos sheet",
            "area": "P sq ft"
          },
          "floor": {
            "material": "concrete",
            "area": "Q sq ft"
          }
        }`;
    
        model.generateContent(prompt)
          .then(result => {
            const responseText = result.response.text();
            console.log('Response Text:', responseText);
    
            try {
              // Extract JSON from the response text
              const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                               responseText.match(/{[\s\S]*}/);
              
              if (jsonMatch) {
                const jsonStr = jsonMatch[1] || jsonMatch[0];
                const parsedData = JSON.parse(jsonStr.trim());
                console.log("Successfully parsed JSON data");
                setAnalysisResult(parsedData);
                setDimensions(parsedData);
              } else {
                // If no JSON found, switch to manual entry
                console.log("No JSON found in response, switching to manual entry");
                setManualEntryMode(true);
              }
            } catch (error) {
              console.error('Error parsing analysis result:', error);
              // Switch to manual entry on parse error
              setManualEntryMode(true);
            }
          })
          .catch(error => {
            console.error('Error analyzing image:', error);
            setManualEntryMode(true);
          });
      }, error => {
        console.error('Error getting image size:', error);
        setManualEntryMode(true);
      });
    } catch (error) {
      console.error('General error in analyzeImage:', error);
      setManualEntryMode(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -250 : 0,
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
    const dataToSave = manualEntryMode ? dimensions : analysisResult;
    
    if (projectDetails && dataToSave && projectId) {
      try {
        console.log('Project ID:', projectId);
        const projectRef = doc(db, 'projects', projectId);
        const projectDoc = await getDoc(projectRef);
        if (projectDoc.exists()) {
          await updateDoc(projectRef, {
            dimensions: JSON.stringify(dataToSave)
          });
          alert('Dimensions saved successfully!');
        } else {
          console.error('No document to update:', projectId);
          alert('No document to update');
        }
      } catch (error) {
        console.error('Error saving dimensions:', error);
        alert('Error saving dimensions: ' + error.message);
      }
    } else {
      alert('No dimensions to save');
    }

    console.log("Saving dimensions to Firestore:", dataToSave);

  };

  // Handle text input changes for manual entry
  const handleDimensionChange = (section, subsection, field, value) => {
    setDimensions(prevDimensions => {
      const newDimensions = {...prevDimensions};
      
      if (subsection) {
        newDimensions[section][subsection][field] = value;
      } else {
        newDimensions[section][field] = value;
      }
      
      return newDimensions;
    });
  };

  console.log("Dimensions state before rendering:", dimensions);

  // Renders a simple key-value pair in view mode
  const renderKeyValue = (key, value) => (
    <View style={styles.tableRow} key={key}>
      <Text style={styles.tableKey}>{formatKey(key)}</Text>
      <Text style={styles.tableValue}>{typeof value === 'object' ? JSON.stringify(value) : value}</Text>
    </View>
  );

  // Renders an editable input field for manual entry mode
  const renderInputField = (section, subsection, field, value) => (
    <View style={styles.tableRow} key={`${section}-${subsection}-${field}`}>
      <Text style={styles.tableKey}>{formatKey(field)}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => handleDimensionChange(section, subsection, field, text)}
        placeholder={`Enter ${formatKey(field)}`}
      />
    </View>
  );

  // Format keys by replacing underscores with spaces and capitalizing
  const formatKey = (key) => {
    return key.replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
  };

  // Renders a section with nested data
  const renderSection = (title, section, data) => {
    if (!data) return null;

    // Create flattened data array for FlatList
    const flattenedData = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // This is a subsection
        flattenedData.push({ type: 'subsection', key, value: null });
        
        // Add each item in the subsection
        Object.entries(value).forEach(([subKey, subValue]) => {
          flattenedData.push({ 
            type: 'item', 
            key: subKey, 
            value: subValue,
            section: section,
            subsection: key
          });
        });
      } else {
        // This is a simple key-value pair
        flattenedData.push({ 
          type: 'item', 
          key, 
          value,
          section: section,
          subsection: null
        });
      }
    });

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.subSection}>{title}</Text>
        <FlatList
          data={flattenedData}
          keyExtractor={(item, index) => `${item.key}-${index}`}
          renderItem={({ item }) => {
            if (item.type === 'subsection') {
              return (
                <View style={styles.subsectionContainer}>
                  <Text style={styles.subsectionTitle}>{formatKey(item.key)}</Text>
                </View>
              );
            } else {
              return manualEntryMode 
                ? renderInputField(item.section, item.subsection, item.key, item.value)
                : renderKeyValue(item.key, item.value);
            }
          }}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const toggleEntryMode = () => {
    setManualEntryMode(!manualEntryMode);
  };

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
              
              <View style={styles.modeToggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.modeToggleButton,
                    !manualEntryMode && styles.activeMode
                  ]}
                  onPress={() => setManualEntryMode(false)}
                  disabled={!analysisResult}
                >
                  <Text style={[
                    styles.modeToggleText,
                    !manualEntryMode && styles.activeModeText
                  ]}>View Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modeToggleButton,
                    manualEntryMode && styles.activeMode
                  ]}
                  onPress={() => setManualEntryMode(true)}
                >
                  <Text style={[
                    styles.modeToggleText,
                    manualEntryMode && styles.activeModeText
                  ]}>Edit Mode</Text>
                </TouchableOpacity>
              </View>
              
              {/* Display dimensions UI */}
              <View style={styles.analysisResult}>
                <Text style={styles.subHeader}>
                  {manualEntryMode ? "Input Dimensions" : "Dimension Details"}
                </Text>
                
                {/* Project Dimensions */}
                {renderSection('Project Dimensions', 'project_dimensions', dimensions.project_dimensions)}
                
                {/* Rooms */}
                {renderSection('Room Dimensions', 'rooms', dimensions.rooms)}
                
                {/* Structural Elements */}
                {renderSection('Structural Elements', 'structural_elements', dimensions.structural_elements)}
                
                {/* Roof Details */}
                {renderSection('Roof Details', 'roof', dimensions.roof)}
                
                {/* Floor Details */}
                {renderSection('Floor Details', 'floor', dimensions.floor)}
              </View>
            </>
          ) : (
            <Text style={styles.errorText}>No project details available</Text>
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Save Dimensions" onPress={saveDimensions} color="#008080" />
        </View>
        <TouchableOpacity style={styles.estimateButton}
          onPress={handleEstimationPress}>
          <Text style={styles.buttonText}>$ Generate Estimate</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#005757',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#007575',
  },
  subSection: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    color: '#005757',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
    textAlign: 'right',
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
    marginBottom: 10,
  },
  navigationPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
  },
  footer: { 
    textAlign: "center", 
    color: "#888", 
    marginTop: 20, 
    fontSize: 12,
    marginBottom: 10,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  estimateButton: { 
    backgroundColor: "#3b28c9", 
    padding: 12, 
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold" 
  },
  analysisResult: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  subsectionContainer: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 4,
    marginVertical: 5,
  },
  subsectionTitle: {
    fontWeight: '600',
    color: '#007575',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableKey: {
    flex: 1,
    fontWeight: '500',
    color: '#333',
    alignSelf: 'center',
  },
  tableValue: {
    flex: 1,
    textAlign: 'right',
    color: '#555',
  },
  modeToggleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  modeToggleButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  modeToggleText: {
    color: '#666',
    fontWeight: '500',
  },
  activeMode: {
    backgroundColor: '#008080',
  },
  activeModeText: {
    color: '#fff',
  },
});