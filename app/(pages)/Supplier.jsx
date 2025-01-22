import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function SupplierPage() {
  const [openMaterial, setOpenMaterial] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materials, setMaterials] = useState([
    { label: "Cement", value: "cement" },
    { label: "Steel", value: "steel" },
    { label: "Tiles", value: "tiles" },
  ]);

  const [openBrand, setOpenBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState([
    { label: "Tokyo Super", value: "tokyo_super" },
    { label: "Lanwa", value: "lanwa" },
    { label: "Swisstek", value: "swisstek" },
  ]);

  const [openLocation, setOpenLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([
    { label: "Colombo", value: "colombo" },
    { label: "Panadura", value: "panadura" },
    { label: "Galle", value: "galle" },
  ]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/local-hardware-3.png")}
        style={styles.backgroundImage}
      >
        {/* Semi-Transparent Overlay */}
        <View style={styles.overlay} />

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

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Material Type</Text>
          <DropDownPicker
            open={openMaterial}
            value={selectedMaterial}
            items={materials}
            setOpen={setOpenMaterial}
            setValue={setSelectedMaterial}
            setItems={setMaterials}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Select Material"
          />

          <Text style={styles.label}>Brand</Text>
          <DropDownPicker
            open={openBrand}
            value={selectedBrand}
            items={brands}
            setOpen={setOpenBrand}
            setValue={setSelectedBrand}
            setItems={setBrands}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Select Brand"
          />

          <Text style={styles.label}>Location</Text>
          <DropDownPicker
            open={openLocation}
            value={selectedLocation}
            items={locations}
            setOpen={setOpenLocation}
            setValue={setSelectedLocation}
            setItems={setLocations}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Select Location"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
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
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Black with 70% opacity
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#007B6A",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: "#009688",
    borderColor: "#009688",
    borderRadius: 8,
    marginBottom: 16,
  },
  dropdownContainer: {
    backgroundColor: "#009688",
    borderColor: "#007B6A",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#009688",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
