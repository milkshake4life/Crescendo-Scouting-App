  import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
  import { Pressable, Button, Text, View, StyleSheet } from "react-native";
  import BackButton from "../../../backButton";
  import { database } from '../../../.././firebaseConfig';
  import React, { useEffect, useState } from 'react';
  import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
  import { TeamProvider, useTeam } from './TeamContext';
  import { retrieveRegional, retrieveTeam } from "../../../Contexts/TeamSecureCache";


  const robotDisplay = () => {
  const [climbingData, setClimbingData] = useState<any>(null); // Use a more specific type instead of any if possible


  //state variables for regional and teamNumber
  const [regional, setRegional] = useState('');
  const [teamNumber, setTeamNumber] = useState(''); 

  //state variable for climber display value
  //this results in a render error. 
  //const [climberOption, setClimberOption] = useState('')

  const [climbData, setClimbData] = useState(".");

  useEffect(() => {
    //this is copied over from matchDisplay, where it is explained in more detail.

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

    //Accessing cache ^
    //-------------------------------------------------------------------------------------------------
    //Accessing firebase:


    const database = getDatabase();
    const climbingRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/Climbing-Info');
    get(climbingRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setClimbingData(data); // Set the data to state
          setClimbData(JSON.stringify(climbingData))
          console.log("climbing data: " + climbingData + " climbing Display: " + climbData)
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
      


  }, [teamNumber, regional, climbingData]); // Empty dependency array ensures this effect runs once after the initial render
  //adding teamNumber and regional as dependencies ensures that they are retrieved before the DOM loads.  

  //display value from data value
  //using ifs to set displayed value to value associated with climbingData number (see README/Information for comprehensive list of number-value pairs)

  let climberOption = "";
  console.log("after effect climbdata: " + climbData)
  if(climbData == "5")
  {
    climberOption = "No Climb";
  }
  else if(climbData == "6")
  {
    climberOption = "Single Climb";
  }
  else if(climbData == '7')
  {
    climberOption = "Harmony Climb"
  }
  else
  {
    climberOption = "Data could not be accessed"
  }
  console.log("Display: " + climberOption)


  return (
      <View style={styles.container}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.title}> Robot Display! </Text>
        <Text style={styles.subtitle}>{teamNumber}'s Climbing Data! </Text>
        <Text style={styles.dataText}>Displayed: {climberOption}, Actual: {climbData}</Text>
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

