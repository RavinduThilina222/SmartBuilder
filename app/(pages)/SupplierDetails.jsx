import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SupplierPage() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/material_home.jpg")}
        style={styles.backgroundImage}
      >
        {/* Dark Overlay */}
        <View style={styles.darkOverlay} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={30} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerLogoContainer}>
            <Image
              source={require("../../assets/images/smartbuilder_logo.png")}
              style={styles.logo}
            />
            <Text style={styles.headerText}>SMARTBUILDER</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="notifications" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Supplier</Text>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Supplier Info Card */}
          <View style={styles.supplierCard}>
            <Text style={styles.supplierName}>Siripathi Hardware</Text>
            <Text style={styles.reviews}>
              ★★★★★ <Text>(20 reviews)</Text>
            </Text>
            <Text style={styles.address}>No 72/A, Horana Road, Panadura</Text>
            <Text style={styles.phone}>+94 77 123 4567</Text>
          </View>

          {/* Material Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Material</Text>
              <Text style={styles.tableHeaderText}>Unit</Text>
              <Text style={styles.tableHeaderText}>Brand</Text>
              <Text style={styles.tableHeaderText}>Price</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Cement</Text>
              <Text style={styles.tableCell}>50Kg</Text>
              <Text style={styles.tableCell}>Tokyo Super</Text>
              <Text style={styles.tableCell}>2000.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Steel QT Bars</Text>
              <Text style={styles.tableCell}>32mm</Text>
              <Text style={styles.tableCell}>Lanwa</Text>
              <Text style={styles.tableCell}>760.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>TileMortar</Text>
              <Text style={styles.tableCell}>25Kg</Text>
              <Text style={styles.tableCell}>Swisstek Ultra Grip</Text>
              <Text style={styles.tableCell}>2900.00</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Copyright ©2024 SMARTBUILDER</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay with 50% opacity
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5%",
    backgroundColor: "rgba(0, 123, 106, 0.8)",
  },
  headerLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  pageTitleContainer: {
    padding: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007B6A",
  },
  contentContainer: {
    padding: "5%",
  },
  supplierCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    padding: "5%",
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  supplierName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007B6A",
  },
  reviews: {
    fontSize: 14,
    color: "#FFD700",
    marginVertical: 4,
  },
  address: {
    fontSize: 14,
    color: "#333333",
  },
  phone: {
    fontSize: 14,
    color: "#007B6A",
    marginTop: 4,
  },
  tableContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    padding: "3%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007B6A",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  tableCell: {
    fontSize: 14,
    color: "#333333",
    flex: 1,
    textAlign: "center",
  },
  footer: {
    padding: "5%",
    alignItems: "center",
    backgroundColor: "rgba(0, 123, 106, 0.8)",
  },
  footerText: {
    fontSize: 14,
    color: "#ffffff",
  },
});
