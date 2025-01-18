import { View, Text , TouchableWithoutFeedback} from 'react-native';
import React , {useState} from 'react';
import { StyleSheet, Image, Animated,slideAnime } from 'react-native';
import MenubarComponent from '../../components/MenubarComponentAdmin';
import NavigationPaneAdmin from '../../components/NavigationPaneAdmin';
import { useRouter } from "expo-router";


export default function AddMaterial() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const slideAnim = useState(new Animated.Value(-250))[0]; // Initial position of the navigation pane
    const router = useRouter();
   const handlePress = (route) => {
      router.push(route);
    };
  
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      Animated.timing(slideAnim, {
        toValue: isMenuOpen ? -250 : 0, // Slide in or out
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

  return (
  <TouchableWithoutFeedback onPress={handleScreenTap}>
  <View style={styles.main}>
    <Image
      source={require('./../../assets/images/material_home.jpg')}
      style={styles.backgroundImage}
    />
    <View style={styles.container}>
    <MenubarComponent onMenuPress={toggleMenu} />
    <Animated.View style={[styles.navigationPane, { transform: [{ translateX: slideAnim }] }]}>
      <NavigationPaneAdmin />
    </Animated.View>

      {/* Title */}
      <Text style={styles.title}>Add Material</Text>


      {/* Footer */}
      <Text style={styles.footer}>©2024 SMARTBUILDER</Text>
    </View>
  </View>
  </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  navigationPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    zIndex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6, // Optional: to make the background image semi-transparent
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  
  menuIcon: {
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 24,
    paddingTop: 40,
    paddingBottom:20,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#009688",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#fff",
  },
});
