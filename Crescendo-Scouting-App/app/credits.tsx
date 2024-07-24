import { Link, router } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import BackButton from './Components/backButton';
 

//Please style this page and check over your names to make sure they are correct

const CreditsPage = () => {
  const [fontLoaded] = useFonts({
    'BPoppins': require('../assets/fonts/Poppins-SemiBold.ttf'), // Update with your font details
  });

  if (!fontLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>; // Or some other loading indicator
  }

  return (
    <ScrollView>
        <View style={styles.container}>
            <BackButton buttonName='Home Page'/>
            <Text style={styles.title}>Credits:</Text>
            <Text style={styles.listTitle}>Development Team:</Text>
            
            <Text style={styles.listSubtitle}>Backend and Frontend</Text>
            <Text style={styles.listText}>Ethan Lee</Text>
            <Text style={styles.listText}>Christian Kantchev</Text>
            <Text style={styles.listText}>David Yu</Text>
            <Text style={styles.listText}>Jayson Song</Text>
            <Text style={styles.listText}>Dahae Seo</Text> 

            <View style={styles.line}></View>

            <Text style={styles.listSubtitle}>UI and Design</Text>
            <Text style={styles.listText}>Brianna Zhu</Text>
            <Text style={styles.listText}>Dahae Seo</Text>
            <Text style={styles.listText}>Tara Tokikawa</Text>
            <Text style={styles.listText}>Haabee Lee</Text>
            <Text style={styles.listText}>Erin Oh</Text>
            

        </View>
    </ScrollView>

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
    fontSize: 40,
    marginBottom: 0,
    color: 'rgba(0, 130, 190, 255)',

  },
  listTitle:{
    fontFamily: 'BPoppins',
    fontSize: 30,
    marginBottom: 10,
  },
  listSubtitle:{
    fontFamily: 'BPoppins',
    fontSize: 20,
    // color: 'rgba(127, 127, 127, 255)',
    marginBottom: 10,
    marginTop: 20, 
    textAlign:'center',
  },
  listText:{
    fontFamily: 'BPoppins',
    fontSize: 18,
    color: 'rgba(127, 127, 127, 255)',
    marginBottom: 15,
  },
  
  line: {
    borderBottomColor: '#00bcf0', // Change the color as needed
    borderBottomWidth: 4,       // Adjust the width as needed
    marginVertical: 10,         // Adjust the vertical margin as needed
    width:'90%',
    borderRadius:10,
    color:'#00bcf0',
  },
  
});

export default CreditsPage;