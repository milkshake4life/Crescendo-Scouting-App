import { Link, router } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
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
      <Text style={styles.title}>Welcome to 589 Scouting App!</Text>

      <Pressable 
        style={styles.button}
        onPress={() => router.push("/(regionals)/Ventura")}
      >
        <Text style={styles.buttonText}>Ventura</Text>
      </Pressable>

      <Pressable 
        style={styles.button}
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
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10, // Adds space between buttons
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    fontFamily: 'BPoppins',
  },
});

export default HomePage;