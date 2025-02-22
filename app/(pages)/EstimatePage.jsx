import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import { useRoute } from "@react-navigation/native";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

const EstimatePage = () => {
  const route = useRoute();
  const { title } = route.params || {}; // Handle case where route.params might be undefined
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [dimensionDetails, setDimensionDetails] = useState(null);
  const [materialDetails, setMaterialDetails] = useState([]);
  const [costEstimates, setCostEstimates] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectQuery = collection(db, 'projects');
        const projectSnapshot = await getDocs(projectQuery);
        const projectDoc = projectSnapshot.docs.find(doc => doc.data().title === title);
        if (projectDoc) {
          setProjectDetails(projectDoc.data());
          const dimensionDetails = projectDoc.data().dimensions;
          setDimensionDetails(dimensionDetails);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        setError("Error fetching project details");
      }
    };

    const fetchMaterialDetails = async () => {
      try {
        const materialQuery = collection(db, 'materials');
        const materialSnapshot = await getDocs(materialQuery);
        const materials = materialSnapshot.docs.map(doc => doc.data());
        setMaterialDetails(materials);
      } catch (err) {
        setError("Error fetching material details");
      }
    };

    const fetchData = async () => {
      await fetchProjectDetails();
      await fetchMaterialDetails();
      setLoading(false);
    };

    fetchData();
  }, [title]);

  useEffect(() => {
    const getCostEstimates = async () => {
      if (dimensionDetails && materialDetails.length > 0) {
        try {
          const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

          const prompt = `Estimate the cost of the project based on the following dimensions and materials:
          Dimensions: ${JSON.stringify(dimensionDetails)}
          Materials: ${JSON.stringify(materialDetails)}`;

          const result = await model.generateContent(prompt);
          setCostEstimates(result.response.text);
        } catch (err) {
          setError("Error getting cost estimates");
        }
      }
    };

    getCostEstimates();
  }, [dimensionDetails, materialDetails]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MenubarComponent />
      <ScrollView style={[styles.container, { marginTop: 60 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Report of Estimated Cost</Text>
          <Text style={styles.projectDetails}>Project name: {projectDetails.title}</Text>
          <Text style={styles.projectDetails}>Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.projectDetails}>Time: {new Date().toLocaleTimeString()}</Text>
        </View>

        {costEstimates && (
          <View style={styles.costEstimates}>
            <Text>{costEstimates}</Text>
          </View>
        )}

        <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#333", textAlign: "center" },
  projectDetails: { fontSize: 14, color: "#555", textAlign: "center" },
  costEstimates: { marginTop: 20 },
  footer: { textAlign: "center", color: "#888", marginTop: 20, fontSize: 12 },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
});

export default EstimatePage;