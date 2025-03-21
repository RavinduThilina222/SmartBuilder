import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";
import { useRoute } from "@react-navigation/native";
import { db } from "../../firebase.config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { router } from "expo-router";

const EstimatePage = () => {
  const route = useRoute();
  const { title } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [dimensionDetails, setDimensionDetails] = useState(null);
  const [materialDetails, setMaterialDetails] = useState([]);
  const [costEstimates, setCostEstimates] = useState(null);
  const [assumptions, setAssumptions] = useState([]);

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
          setLoading(true);
          const genAI = new GoogleGenerativeAI("AIzaSyBxqhO8Gn5bveeXoO8IzTC6_REFldxQ1eI");
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

          const prompt = `Estimate the cost(LKR) of the project based on the following dimensions and materials:
          Dimensions: ${JSON.stringify(dimensionDetails)}
          Materials: ${JSON.stringify(materialDetails)}
          
          I want the cost estimates in JSON format with the following structure:
          {
            "cost_estimation": [
              {
                "Material": "Material Name",
                "Estimated_Quantity": "Quantity",
                "Unit_Price": "Price per unit in LKR",
                "Total_Cost": "Total cost in LKR",
                "Type": "Category of material (e.g., Bricks, Cement, Roofing)"
              }
            ],
            "assumptions": [
              "Assumption 1",
              "Assumption 2"
            ],
            "grand_total": "Total cost in LKR"
          }`;

          console.log("Sending prompt to Gemini...");
          const result = await model.generateContent(prompt);
          const responseText = result.response.text();
          console.log('Response Text:', responseText);

          // Ensure responseText is a string
          if (typeof responseText === 'string') {
            try {
              // Extract JSON from the response if it's wrapped in markdown code blocks
              const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                               responseText.match(/```\s*([\s\S]*?)\s*```/) ||
                               [null, responseText];
              
              const jsonStr = jsonMatch[1] || responseText;
              const rawData = JSON.parse(jsonStr);
              
              // Transform the data to match our expected format
              let transformedData = {
                cost_estimation: [],
                assumptions: [],
                grand_total: 0
              };
              
              // Check if we have the expected data structure or need to transform it
              if (rawData["Project Cost Estimation (LKR)"]) {
                // Transform the old format to new format
                const oldData = rawData["Project Cost Estimation (LKR)"];
                
                if (oldData.Assumptions) {
                  transformedData.assumptions = oldData.Assumptions;
                  setAssumptions(oldData.Assumptions);
                }
                
                if (oldData["Cost Breakdown"]) {
                  transformedData.cost_estimation = oldData["Cost Breakdown"].map(item => {
                    // Determine material type based on name
                    let type = "Other";
                    if (item.Material.toLowerCase().includes("brick")) type = "Bricks";
                    else if (item.Material.toLowerCase().includes("cement")) type = "Cement";
                    else if (item.Material.toLowerCase().includes("sand")) type = "Sand";
                    else if (item.Material.toLowerCase().includes("roof")) type = "Roofing";
                    else if (item.Material.toLowerCase().includes("steel") || item.Material.toLowerCase().includes("metal")) type = "Metal";
                    else if (item.Material.toLowerCase().includes("timber") || item.Material.toLowerCase().includes("wood")) type = "Timber";
                    
                    return {
                      Material: item.Material,
                      Estimated_Quantity: item["Estimated Quantity"],
                      Unit_Price: item["Unit Price"],
                      Total_Cost: item["Estimated Cost"],
                      Type: type
                    };
                  });
                }
                
                transformedData.grand_total = oldData["Total Estimated Material Cost"] || 0;
              } else {
                // Assume data is already in our expected format
                transformedData = rawData;
              }
              
              setCostEstimates(transformedData);
              if (transformedData.assumptions) {
                setAssumptions(transformedData.assumptions);
              }
              console.log("Successfully parsed estimation data");
            } catch (parseErr) {
              console.error("Error parsing JSON:", parseErr);
              setError("Error parsing cost estimates");
            }
          } else {
            console.error("Response text is not a string");
            setError("Invalid response format");
          }
        } catch (err) {
          console.error("Error getting cost estimates:", err);
          setError("Error getting cost estimates");
        } finally {
          setLoading(false);
        }
      }
    };

    getCostEstimates();
  }, [dimensionDetails, materialDetails]);

  const saveEstimation = async () => {
    if (projectDetails && costEstimates) {
      try {
        setLoading(true);
        const projectQuery = collection(db, 'projects');
        const projectSnapshot = await getDocs(projectQuery);
        const projectDoc = projectSnapshot.docs.find(doc => doc.data().title === projectDetails.title);

        if (!projectDoc) {
          throw new Error("Project not found");
        }

        const projectId = projectDoc.id;
        console.log('Project ID:', projectId);
        const projectRef = doc(db, 'projects', projectId);

        await updateDoc(projectRef, {
          estimation: costEstimates
        });

        alert('Estimation saved successfully!');
        router.navigate("ProjectListPage");
      } catch (error) {
        console.error('Error saving Estimation:', error);
        alert('Error saving Estimation');
      } finally {
        setLoading(false);
      }
    } else {
      alert('No estimation data to save');
    }
  };

  const renderCategorySection = (categoryItems, category) => {
    return (
      <View style={styles.categorySection}>
        <Text style={styles.categoryTitle}>{category}</Text>
        {categoryItems.map((item, index) => (
          <View 
            key={index}
            style={[
              styles.tableRow, 
              index % 2 === 0 ? styles.evenRow : styles.oddRow
            ]}
          >
            <View style={styles.materialNameContainer}>
              <Text style={styles.materialName}>{item.Material}</Text>
              <Text style={styles.materialQuantity}>
                Qty: {item.Estimated_Quantity || "N/A"}
              </Text>
            </View>
            <View style={styles.costContainer}>
              <Text style={styles.materialDetails}>
                {item.Unit_Price !== undefined ? 
                  `${item.Unit_Price.toLocaleString()} LKR` : "Pending"}
              </Text>
              <Text style={styles.estimatedCost}>
                {item.Total_Cost !== undefined ? 
                  `${item.Total_Cost.toLocaleString()} LKR` : "Pending"}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const groupByCategory = (items) => {
    if (!items) return {};
    
    // Group items by their Type
    const groupedItems = {};
    
    items.forEach(item => {
      const type = item.Type || "Other";
      if (!groupedItems[type]) {
        groupedItems[type] = [];
      }
      groupedItems[type].push(item);
    });
    
    return groupedItems;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008080" />
        <Text style={styles.loadingText}>Generating cost estimation...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <MenubarComponent />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Group items by category for organized display
  const groupedEstimates = costEstimates?.cost_estimation ? 
    groupByCategory(costEstimates.cost_estimation) : {};
  
  // Find the total item
  const totalAmount = costEstimates?.grand_total;

  // Get all categories
  const categories = Object.keys(groupedEstimates);

  return (
    <View style={styles.container}>
      <MenubarComponent />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Cost Estimation Report</Text>
          {projectDetails?.planURL && (
            <Image source={{ uri: projectDetails.planURL }} style={styles.projectImage} />
          )}
          <View style={styles.projectInfoContainer}>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Project:</Text>
              <Text style={styles.projectInfoValue}>{projectDetails?.title || "Unknown Project"}</Text>
            </View>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Date:</Text>
              <Text style={styles.projectInfoValue}>{new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Status:</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Estimated</Text>
              </View>
            </View>
          </View>
        </View>

        {costEstimates && costEstimates.cost_estimation ? (
          <View style={styles.estimationCard}>
            <Text style={styles.estimationTitle}>Materials & Cost Breakdown</Text>
            
            {/* Summary Card */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconContainer}>
                <Text style={styles.summaryIcon}>₨</Text>
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Total Estimated Cost</Text>
                <Text style={styles.summaryAmount}>
                  {totalAmount !== undefined ? 
                    `${totalAmount.toLocaleString()} LKR` : "Calculation Pending"}
                </Text>
              </View>
            </View>
            
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerMaterial}>Material & Quantity</Text>
              <Text style={styles.headerCosts}>Unit Price / Total Cost</Text>
            </View>
            
            {/* Render each category section */}
            {categories.map((category, index) => (
              <View key={index}>
                {renderCategorySection(groupedEstimates[category], category)}
              </View>
            ))}
            
            {/* Assumptions Section */}
            {assumptions && assumptions.length > 0 && (
              <View style={styles.assumptionsSection}>
                <Text style={styles.assumptionsTitle}>Important Notes:</Text>
                {assumptions.map((assumption, index) => (
                  <View key={index} style={styles.assumptionItem}>
                    <Text style={styles.assumptionBullet}>•</Text>
                    <Text style={styles.assumptionText}>{assumption}</Text>
                  </View>
                ))}
              </View>
            )}
            
            <TouchableOpacity style={styles.saveButton} onPress={saveEstimation}>
              <Text style={styles.saveButtonText}>Save Estimation</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No estimation data available</Text>
          </View>
        )}
        
        <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F7F8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#E6F7F8",
  },
  loadingText: {
    marginTop: 10,
    color: "#008080",
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 60,
    padding: 15,
  },
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005757",
    textAlign: "center",
    marginBottom: 15,
  },
  projectImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
  },
  projectInfoContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
  },
  projectInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  projectInfoLabel: {
    width: 80,
    fontWeight: "600",
    color: "#444",
  },
  projectInfoValue: {
    flex: 1,
    color: "#333",
  },
  statusBadge: {
    backgroundColor: "#008080",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  estimationCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  estimationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007575",
    marginBottom: 15,
  },
  summaryCard: {
    flexDirection: "row",
    backgroundColor: "#008080",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  summaryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  summaryIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0f2f1",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#cce5e5",
  },
  headerMaterial: {
    flex: 3,
    fontWeight: "bold",
    color: "#005757",
  },
  headerCosts: {
    flex: 2,
    fontWeight: "bold",
    color: "#005757",
    textAlign: "right",
  },
  categorySection: {
    marginTop: 10,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007575",
    backgroundColor: "#f0f7f7",
    padding: 8,
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  materialNameContainer: {
    flex: 3,
    justifyContent: "center",
  },
  materialName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  materialQuantity: {
    fontSize: 12,
    color: "#777",
  },
  costContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
  materialDetails: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },
  estimatedCost: {
    fontSize: 14,
    color: "#005757",
    fontWeight: "600",
  },
  assumptionsSection: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#008080",
  },
  assumptionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#005757",
    marginBottom: 8,
  },
  assumptionItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  assumptionBullet: {
    color: "#008080",
    marginRight: 8,
    fontSize: 14,
  },
  assumptionText: {
    flex: 1,
    fontSize: 12,
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#008080",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  noDataContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  noDataText: {
    color: "#666",
    fontSize: 16,
  },
  footer: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default EstimatePage;