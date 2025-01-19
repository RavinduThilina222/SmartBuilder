import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure react-native-vector-icons is installed

const { height } = Dimensions.get('window');

const LaborDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Image
            source={require('../../assets/images/smartbuilder_logo.png')} // Replace with your logo
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>SMARTBUILDER</Text>
        </View>
        <TouchableOpacity>
          <Icon name="account-circle" size={28} color="white" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      {/* Labor Details */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>Kamal Perera</Text>
          <Text style={styles.role}>Electrician</Text>
          <Text style={styles.rating}>⭐ 4.5 (20 reviews)</Text>
          <Text style={styles.availability}>Availability: Sep 26 onwards</Text>
          <Text style={styles.experience}>Experience: 7 years</Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <Text>Phone: +94 77 123 4567</Text>
          <Text>Email: kamal@gmail.com</Text>
          <Text>Location: Colombo, Sri Lanka</Text>
        </View>

        <View style={styles.projectsCard}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <Text>• Residential Wiring project - 1 month</Text>
          <Text>• Solar Panel Installation - 3 weeks</Text>
        </View>

        <View style={styles.skillsCard}>
          <Text style={styles.sectionTitle}>Skills & Certifications</Text>
          <Text>• Skills: Wiring Installation, Solar Panel Setup, Fault finding</Text>
          <Text>• Certifications: Certified Electrician, OSHA Safety training</Text>
        </View>

        <View style={styles.reviewsCard}>
          <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
          <Text>Pradeep S. ⭐⭐⭐⭐⭐ - "Excellent work, very professional!"</Text>
          <Text>Suresh P. ⭐⭐⭐⭐⭐ - "Excellent work. Punctual and tidy. Highly recommended"</Text>
          <Text style={styles.viewAll}>See all reviews</Text>
        </View>
      </ScrollView>
      {/* Footer */}
      <Text style={styles.footer}>Copyright ©2024 SMARTBUILDER</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#006D65',
    paddingHorizontal: 16,
    height: height * 0.1,
  },
  menuIcon: {
    padding: 4,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileIcon: {
    padding: 4,
  },
  content: {
    padding: 15,
  },
  profileCard: {
    backgroundColor: '#e6f2ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  rating: {
    fontSize: 14,
    color: '#777',
  },
  availability: {
    fontSize: 14,
    color: '#777',
  },
  experience: {
    fontSize: 14,
    color: '#777',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  projectsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  skillsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  reviewsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewAll: {
    color: '#0066cc',
    marginTop: 10,
  },
  footer: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginTop: 16,
    padding: 10,
  },
});

export default LaborDetail;
