import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // For menu and profile icons

const suppliers = [
  "Siripathi Hardware",
  "Nipuna Hardware",
  "A&D Hardware",
  "Saman Hardware",
  "Yalana Hardware",
  "NewSri Hardware",
  "Fanzi Hardware",
  "Badra Hardware",
];

const { width, height } = Dimensions.get("window");

const SupplierList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/material_home.jpg')} // Local background image
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            {/* Menu Icon */}
            <TouchableOpacity>
              <Icon name="menu" size={28} color="white" style={styles.menuIcon} />
            </TouchableOpacity>
            {/* Logo and Title */}
            <View style={styles.headerTitleContainer}>
              <Image
                source={require('../../assets/images/smartbuilder_logo.png')} // Replace with the actual logo file
                style={styles.logo}
              />
              <Text style={styles.headerTitle}>SMARTBUILDER</Text>
            </View>
            {/* Profile Icon */}
            <TouchableOpacity>
              <Icon name="account-circle" size={28} color="white" style={styles.profileIcon} />
            </TouchableOpacity>
          </View>

          {/* Page Content */}
          <Text style={styles.pageTitle}>Supplier</Text>
          <FlatList
            data={suppliers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.supplierName}>{item}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%", // Full width of the screen
    height: "100%", // Full height of the screen
  },
  backgroundImage: {
    resizeMode: "cover", // Ensures the image covers the screen proportionally
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent overlay
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#006D65",
    paddingHorizontal: 16,
    height: height * 0.1, // Dynamically adjust height for Galaxy S8+
  },
  menuIcon: {
    padding: 4,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 28, // Adjust logo size for high DPI
    height: 28,
    marginRight: 8, // Space between logo and title
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileIcon: {
    padding: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "left",
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#006D65",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  supplierName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsText: {
    color: "#006D65",
    fontWeight: "bold",
  },
  footer: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 16,
  },
});

export default SupplierList;
