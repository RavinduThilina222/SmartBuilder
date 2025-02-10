import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import MenubarComponent from "../../components/MenubarComponentAdmin";

const screenWidth = Dimensions.get("window").width;

const data = [
  { name: "Bricks", population: 300000, color: "#FF6384", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Steel", population: 600000, color: "#36A2EB", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Tiles", population: 450000, color: "#FFCE56", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Wood", population: 100000, color: "#4BC0C0", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Concrete", population: 700000, color: "#9966FF", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Paint", population: 70000, color: "#FF9F40", legendFontColor: "#7F7F7F", legendFontSize: 12 },
];

const materialList = [
  { material: "Bricks", quantity: "10,000", cost: "300,000" },
  { material: "Steel", quantity: "2 tons", cost: "600,000" },
  { material: "Tiles", quantity: "900 sq.ft.", cost: "450,000" },
  { material: "Wood", quantity: "0.5m3", cost: "100,000" },
  { material: "Concrete", quantity: "50m3", cost: "700,000" },
  { material: "Paint", quantity: "50 liters", cost: "70,000" },
  { material: "Sand", quantity: "10 tons", cost: "50,000" },
];

const EstimatePage  = () => {
  return (
    <View style={styles.container}>
    <MenubarComponent /> {/*Added Menubar Component */}
    <ScrollView style={[styles.container, { marginTop: 60 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Report of Estimated Cost</Text>
        <Text style={styles.projectDetails}>Project name: Project_01</Text>
        <Text style={styles.projectDetails}>Date: 22/12/2024</Text>
        <Text style={styles.projectDetails}>Time: 1:54pm</Text>
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            backgroundColor: "#1E2923",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>

      <View style={styles.costContainer}>
        <Text style={styles.estimatedCost}>2,270,000 LKR</Text>
        <Text style={styles.costLabel}>Estimated Cost</Text>
      </View>

      <View style={styles.tableContainer}>
        <FlatList
          data={materialList}
          keyExtractor={(item) => item.material}
          ListHeaderComponent={() => (
            <View style={styles.tableRowHeader}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Materials</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Quantity</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Rupees</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.material}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.cost}</Text>
            </View>
          )}
        />
      </View>
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
  chartContainer: { alignItems: "center", marginVertical: 20 },
  costContainer: { alignItems: "center", marginBottom: 20 },
  estimatedCost: { fontSize: 24, fontWeight: "bold", color: "#8E44AD" },
  costLabel: { fontSize: 16, color: "#555" },
  tableContainer: { backgroundColor: "#F0F0F0", borderRadius: 10, padding: 10 },
  tableRowHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#CCC", paddingBottom: 5, marginBottom: 5 },
  tableRow: { flexDirection: "row", paddingVertical: 5 },
  tableCell: { flex: 1, textAlign: "center", color: "#333" },
  tableHeader: { fontWeight: "bold", color: "#444" },
  footer: { textAlign: "center", color: "#888", marginTop: 20, fontSize: 12 },
});

export default EstimatePage;
