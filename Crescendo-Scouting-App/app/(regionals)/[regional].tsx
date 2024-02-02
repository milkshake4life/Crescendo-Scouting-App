import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../backButton';


//Creating a back-button component for easier implementation. 
//props list for the back button component


const RegionalPage = () => {
  const {regional} = useLocalSearchParams<{ regional:string } > ();

    return (
        <View style={styles.container}>
            {/* <Pressable 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>Home Page</Text>
              <Image style = {styles.backButtonIcon} source={require('../../assets/images/back_arrow.png')} />
            </Pressable> */}
            <BackButton buttonName='Home Page'/>
            <Text style={styles.title} >{regional} regional! </Text>
            <Pressable
            style={styles.buttonOne}
            onPress={() => router.push("/(scout)/scout")}
            >
                <Text style={styles.buttonOneText}>Scouting</Text>
            </Pressable>

            <Pressable
            style={styles.buttonTwo}
            onPress={() => router.push("/(scout)/(ScoutingDisplay)/matchDisplay")}
            >
                <Text style={styles.buttonTwoText}>Scouting Information</Text>
            </Pressable>

        </View>
    ); //swapped '(ScoutingDisplay)/robotDisplay' to '(ScoutingDsplay)/matchDisplay' to match the tabs. 
};



const styles = StyleSheet.create({
    container: {
      flex: 1, // Makes sure the container takes up the whole screen
      justifyContent: 'flex-start', // Centers content to the top of the page
      alignItems: 'center', // Centers content horizontally in the container
      padding: 20, // Optional: Adds padding to the container
    },
    title:{
      fontFamily: 'BPoppins',
      fontSize: 25,
      marginBottom: 110,
      marginTop: 30, 
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
      marginBottom: 60,
      // add other styling as needed
    },
    buttonOne: {
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 82,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'rgba(0, 130, 190, 255)',
      borderWidth: 1,
      borderColor: 'white',
    },
    buttonTwo: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'rgba(0, 130, 190, 255)',
      marginTop: 10, // Adds space between buttons
    },
    buttonOneText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      fontFamily: 'BPoppins',
    },
    buttonTwoText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'rgba(0, 130, 190, 255)',
      fontFamily: 'BPoppins',
    },
    backButtonText:{
      fontFamily: 'BPoppins',
      fontSize: 15,
      color: 'white',
      marginBottom: 30,
    },
    backButton: {
      marginTop: 0,
      marginBottom: 50, //adding bottom margins to avoid changing the title style
      //alignItems: 'center',
      //justifyContent: 'center',
      //paddingVertical: 12,
      //paddingHorizontal: 82,
      paddingRight: 350,
      borderRadius: 4,
      elevation: 3,
      //backgroundColor: 'rgba(0, 130, 190, 255)', //removing background color so we can use an image. 
      //borderWidth: 1,                            //removing border for same reason as above
      borderColor: 'white',
      width: 20,
      height: 20,
    },
    backButtonIcon: {
      width: 20,
      height: 20,

    }
  });

export default RegionalPage;