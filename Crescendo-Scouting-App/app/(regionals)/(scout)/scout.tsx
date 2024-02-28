import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import BackButton from "../../backButton";
//import { TeamContextProvider } from "../../Contexts/team-content";


const Scout = () => {
  const {regional} = useGlobalSearchParams<{ regional:string } > ();
  const {teamNumber} = useGlobalSearchParams<{ teamNumber:string } > ();
  
    return (
      
        <View style={styles.container}>
            <BackButton buttonName='Regional Page' />
            <Text style={styles.title}> Team Scouting </Text>
            <Pressable
            style={styles.buttonOne}
            onPress={() => router.push(`/(Input)/pitScouting?regional=${regional}&teamNumber=${teamNumber}`)}
            >
                <Text style={styles.buttonText}>Pit Scouting</Text>
            </Pressable>

            <Pressable
            style={styles.buttonTwo}
            onPress={() => router.push(`/(Input)/(matchInfo)/pregame?regional=${regional}&teamNumber=${teamNumber}`)}
            >
                <Text style={styles.buttonText}>Match Scouting</Text>
            </Pressable>

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
      marginBottom: '16%',
      marginTop: '30%', //adding top margin to move down the page. 
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
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: '20.5%',
      borderRadius: 4,
      backgroundColor: 'rgba(0, 130, 190, 255)',
      borderWidth: 1,
      borderColor: 'rgba(0, 130, 190, 255)',
    },
    buttonTwo: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: '15.8%',
      borderRadius: 4,
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
    backButtonText:{
      fontFamily: 'BPoppins',
      fontSize: 15,
      color: 'white',
      marginBottom: 30,
    },
    // backButton: {
    //   marginTop: 0,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingVertical: 12,
    //   paddingHorizontal: 82,
    //   borderRadius: 4,
    //   elevation: 3,
    //   backgroundColor: 'rgba(0, 130, 190, 255)',
    //   borderWidth: 1,
    //   borderColor: 'white',
    // },
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
    }
  });

export default Scout;