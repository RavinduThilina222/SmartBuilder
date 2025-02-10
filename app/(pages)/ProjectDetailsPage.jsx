import React from 'react';
import { ScrollView, Text, TextInput, View, Button, StyleSheet, Picker } from 'react-native';
import MenubarComponent from "../../components/MenubarComponentAdmin";

export default function App() {
  return (
    <View style={styles.container}>
    <MenubarComponent /> {/*Added Menubar Component */}
    <ScrollView style={{ marginTop: 60 }}>
      {/* Project Name */}
      <Text style={styles.sectionHeader}>Project_05</Text>

      {/* Construction Specification */}
      <Text style={styles.subHeader}>Construction Specification</Text>
      <View style={styles.inputGroup}>
        <Text>Type of Foundation</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="Option 1" value="" />
          <Picker.Item label="Option 2" value="" />
        </Picker>
        <Text>Number of Floors</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Roofing Specification</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="Option A" value="" />
          <Picker.Item label="Option B" value="" />
        </Picker>
      </View>

      {/* Structural Components */}
      <Text style={styles.subHeader}>Structural Components</Text>
      <Text style={styles.subSection}>Foundation</Text>
      <View style={styles.inputGroup}>
        <Text>Number of Trenchers</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Number of Footings</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Text>Trencher:</Text>
        <TextInput placeholder="Width" style={styles.input} />
        <TextInput placeholder="Length" style={styles.input} />
        <TextInput placeholder="Depth" style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text>Footing:</Text>
        <TextInput placeholder="Width" style={styles.input} />
        <TextInput placeholder="Length" style={styles.input} />
        <TextInput placeholder="Depth" style={styles.input} />
      </View>

      <Text style={styles.subSection}>Structure</Text>
      <View style={styles.inputGroup}>
        <Text>Number of Beams</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Number of Columns</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Text>Beam:</Text>
        <TextInput placeholder="Width" style={styles.input} />
        <TextInput placeholder="Length" style={styles.input} />
        <TextInput placeholder="Depth" style={styles.input} />
      </View>
      <View style={styles.inputGroup}>
        <Text>Column:</Text>
        <TextInput placeholder="Width" style={styles.input} />
        <TextInput placeholder="Length" style={styles.input} />
        <TextInput placeholder="Depth" style={styles.input} />
      </View>

      <Text style={styles.subSection}>Slab</Text>
      <View style={styles.inputGroup}>
        <Text>Slab Thickness</Text>
        <TextInput style={styles.input} />
      </View>

      {/* Ground Floor Structural Components */}
      <Text style={styles.subHeader}>Ground Floor Structural Components</Text>
      <Text style={styles.subSection}>Structure</Text>
      <View style={styles.inputGroup}>
        <Text>Number of Rooms</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Number of Toilets</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Number of Kitchens</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Number of Windows</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Number of Doors</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
        <Text>Number of Staircases</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Text>Room:</Text>
        <TextInput placeholder="Width" style={styles.input} />
        <TextInput placeholder="Length" style={styles.input} />
      </View>

      {/* Roof Structural Components */}
      <Text style={styles.subHeader}>Roof Structural Components</Text>
      <View style={styles.inputGroup}>
        <Text>Roof Type</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="Flat" value="flat" />
          <Picker.Item label="Pitched" value="pitched" />
        </Picker>
        <Text>Roof Length</Text>
        <TextInput style={styles.input} />
        <Text>Roof Width</Text>
        <TextInput style={styles.input} />
        <Text>Ceiling Height</Text>
        <TextInput style={styles.input} />
      </View>
    </ScrollView>
    {/* Save Button */}
    <View style={styles.buttonContainer}>
        <Button title="Save" onPress={() => alert('Saved!')} />
    </View>
    <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
    </View>
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
  footer: { textAlign: "center", color: "#888", marginTop: 20, fontSize: 12 },
});
