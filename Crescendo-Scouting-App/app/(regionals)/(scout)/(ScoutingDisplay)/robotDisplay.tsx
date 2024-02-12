import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../backButton";
import { database } from '../../../.././firebaseConfig';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
import { TeamProvider, useTeam } from './TeamContext';
import { retrieveRegional, retrieveTeam } from "../../../Contexts/TeamSecureCache";

//can this function be asynchronous?

//trying state in useStorageState instead
// let regional: string | null = "";
// let teamNumber: string | null = "";

//this retrieveData function can be copied over. 
// const retrieveData = async () => {
//     regional = await retrieveRegional();
//     console.log("regional (robotDisplay): " + regional)
//     teamNumber = await retrieveTeam();
//     console.log("team (robotDisplay): " + teamNumber)
// }


const robotDisplay = () => { 
  const [climbingData, setClimbingData] = useState<any>(null); // Use a more specific type instead of any if possible
  //const { regional, teamNumber } = useTeam();
  //trying the secureStore retrieval but it isn't working. Going to look into this later. 
  //something to do with how regional and teamNumber are promises. Figure out how to change them into regular
  //strings. Solving this will solve the matchdisplay issue as well, since the two no longer depend
  //on route queries for information, but rather draw it directly from the app. 
  //plan is to delete team and regional information stored in the keys upon exit of a page (since users
  //cant view more than one team at one regional at once)
  const [regional, setRegional] = useState('');
  const [teamNumber, setTeamNumber] = useState('');  


  useEffect(() => {
    //retrieveData()
    //async await unnecessary because of useEffect?
    async function getTeamInfo() {
      retrieveRegional().then((result: string | null) => {
        if(!result)
        {
          console.log("no regional found")
        }
        else 
        {
          const reg = result;
          setRegional(reg);
        }
      })
      
      retrieveTeam().then((result: string | null) => {
        if(!result)
        {
          console.log("no team found")
        }
        else 
        {
          const num = result;
          setTeamNumber(num);
        }
      })

      
    }

    getTeamInfo();
    console.log("(robotDisplay): " + "team: " + teamNumber + " regional " + regional)
    
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
  }, [teamNumber, regional, climbingData]); // Empty dependency array ensures this effect runs once after the initial render
  //adding teamNumber and regional as dependencies ensures that they are retrieved before the DOM loads
  //unsure about this change. 
  //also unsure if there is any climbing data. But the component has access to team number and regional info.  
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