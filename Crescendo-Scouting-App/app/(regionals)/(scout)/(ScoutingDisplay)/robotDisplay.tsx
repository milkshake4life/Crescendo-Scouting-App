import { Link, router } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../backButton";


const robotDisplay = () => { 
  
  return (
    <View style={styles.container}>
      <BackButton buttonName="Home Page" />
      <Text style={styles.title}> Robot Display! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: 'flex-start', // Aligns content to the top of the page
    alignItems: 'center', // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
  },
  title:{
    fontFamily: 'BPoppins',
    fontSize: 32,  //font size differs from regional page. Regional = 25. 
    marginBottom: 110,
    marginTop: 30, //adding top margin to move down the page. 
  },
});

export default robotDisplay;