import { Link, router } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';



const HomePage = () => {
  const [fontLoaded] = useFonts({
    'BPoppins': require('../assets/fonts/Poppins-SemiBold.ttf'), // Update with your font details
  });

  if (!fontLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>; // Or some other loading indicator
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/589Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.subtitle}>Welcome to the 589 Scouting App!</Text>

      <Pressable 
        style={styles.buttonOne}
        onPress={() => router.push("/(regionals)/Port Hueneme")}
      >
        <Text style={styles.buttonText}>Port Hueneme</Text>
      </Pressable>

      <Pressable 
        style={styles.buttonTwo}
        onPress={() => router.push("/(regionals)/Ventura")}
      >
        <Text style={styles.buttonText}>Ventura</Text>
      </Pressable>

      <Pressable 
        style={styles.buttonThree}
        onPress={() => router.push("/(regionals)/Orange County")}
      >
        <Text style={styles.buttonText}>Orange County</Text>
      </Pressable>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: 'center', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
  },
  title:{
    fontFamily: 'BPoppins',
    fontSize: 32,
    marginBottom: 20,
  },
  subtitle:{
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'rgba(127, 127, 127, 255)',
    marginBottom: 30,
  },
  logo: {
    width: 270,  // specify a width
    height: 270, // and a height for your image
    marginBottom: 20,
    // add other styling as needed
  },
  buttonOne: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 56,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 1,
    borderColor: 'rgba(0, 130, 190, 255)',
  },
  buttonTwo: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 82,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 1,
    borderColor: 'rgba(0, 130, 190, 255)',
  },
  buttonThree: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 52,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 1,
    borderColor: 'rgba(0, 130, 190, 255)',
    marginTop: 10, // Adds space between buttons
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'BPoppins',
  },
  
});

export default HomePage;