import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../backButton";
import { database } from '../../../.././firebaseConfig';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";

const robotDisplay = () => { 
  const [climbingData, setClimbingData] = useState<any>(null); // Use a more specific type instead of any if possible
  const { regional } = useLocalSearchParams<{ regional:string } > ();
  const { teamNumber } = useLocalSearchParams<{ teamNumber: string }>();
  
  useEffect(() => {
    const database = getDatabase();
    const climbingRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/climberOption');
  
    get(climbingRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setClimbingData(data); // Set the data to state
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <View style={styles.container}>
      <BackButton buttonName="Home Page" />
      <Text style={styles.title}> Robot Display! </Text>
      <Text style={styles.subtitle}> Climbing Data! </Text>
      <Text style={styles.dataText}>{JSON.stringify(climbingData)}</Text>
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
  subtitle:{
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'rgba(127, 127, 127, 255)',
    marginBottom: 30,
  },
  dataText: {
    // Your text styles
    fontSize: 16,
    color: 'black', // or any color you prefer
    // Add other styling as needed
  },
});

export default robotDisplay;