import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure react-native-vector-icons is installed

const { height } = Dimensions.get('window');

const laborers = [
  { name: 'Kamal Perera', role: 'Electrician', rating: 4.5, reviews: 20, experience: 7 },
  { name: 'Mahesh Silva', role: 'Electrician', rating: 4.0, reviews: 15, experience: 6 },
  { name: 'Sandun Silva', role: 'Electrician', rating: 4.0, reviews: 15, experience: 6 },
];

const LaborList = () => {
  const renderLaborer = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.details}>
        ⭐ {item.rating} ({item.reviews} reviews) | Experience: {item.experience} years
      </Text>
    </TouchableOpacity>
  );

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
      {/* Labor List */}
      <FlatList
        data={laborers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLaborer}
        contentContainerStyle={styles.list}
      />
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
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#e6f2ff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  details: {
    fontSize: 12,
    color: '#777',
  },
  footer: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginTop: 16,
    padding: 10,
  },
});

export default LaborList;
