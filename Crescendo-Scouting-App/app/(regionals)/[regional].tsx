import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';


const RegionalPage = () => {
  const {regional} = useLocalSearchParams<{ regional:string } > ();
    // const [fontLoaded] = useFonts({
    //     'BPoppins': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    // });
    // if (!fontLoaded) {
    //     return <View style={styles.container}><Text>Loading...</Text></View>; // Or some other loading indicator
    // }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{regional} regional! </Text>
            <Pressable
            style={styles.buttonOne}
            onPress={() => router.push("/(scout)/scout")}
            >
                <Text style={styles.buttonOneText}>Scouting</Text>
            </Pressable>

            <Pressable
            style={styles.buttonTwo}
            onPress={() => router.push("/(scout)/(ScoutingDisplay)/robotDisplay")}
            >
                <Text style={styles.buttonTwoText}>Scouting Information</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, // Makes sure the container takes up the whole screen
      justifyContent: 'flex-start', // Centers content vertically in the container
      alignItems: 'center', // Centers content horizontally in the container
      padding: 20, // Optional: Adds padding to the container
    },
    title:{
      fontFamily: 'BPoppins',
      fontSize: 32,
      marginBottom: 110,
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
  });

export default RegionalPage;