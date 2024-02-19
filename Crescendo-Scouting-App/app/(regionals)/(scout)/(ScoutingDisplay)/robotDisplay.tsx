  import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
  import { Pressable, Button, Text, View, StyleSheet } from "react-native";
  import BackButton from "../../../backButton";
  import { database } from '../../../.././firebaseConfig';
  import React, { useEffect, useState } from 'react';
  import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
  import { TeamProvider, useTeam } from './TeamContext';
  import { retrieveRegional, retrieveTeam } from "../../../Contexts/TeamSecureCache";


const robotDisplay = () => {
  //backend data state variables:
  //climbing
  const [climbingData, setClimbingData] = useState<string | null>(null); 
  //driving
  const [drivingData, setDrivingData] = useState<string | null>(null); 
  //intake
  const [intakeData, setIntakeData] = useState<string | null>(null);
  //scoring
  const [scoringData, setScoringData] = useState<string | null>(null);
  //drive train
  const [driveTrainData, setDriveTrainData] = useState<string | null>(null);
  //vision
  const [visionData, setVisionData] = useState<string | null>(null);

  //Array for reading values:
  const displayArray: string[] = [
    //scoring
    'No Scoring', 'Amp Only', 'Speaker Only', 'Both',
    //climbing
    'No Climb', 'Single Climb', 'Harmony Climb',
    //intake
    'No Intake', 'Ground Only', 'Source Only', 'Both',
    //driving
    'N/A', 'Drive Over Notes', 'Drive Under Stage', 'Both',
  ]


  //state variables for regional and teamNumber
  const [regional, setRegional] = useState('');
  const [teamNumber, setTeamNumber] = useState(''); 

  //state variables for climber display value. 
  //Find a way to make this more efficient. 
  const [climberOption, setClimberOption] = useState(''); 
  const [climbData, setClimbData] = useState(".");
  
  //Accessing cache
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

  }, [teamNumber, regional]);
  
  //accessing Climbing Info
  useEffect(() => {
    const database = getDatabase();

    const climbingRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/Climbing-Info');
    get(climbingRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setClimbingData(data); // Set the data to state
          //bottom stuff is subject to change. 
          setClimbData(JSON.stringify(climbingData))
          console.log("climbing data: " + climbingData + " climbing Display: " + climbData)
        } else {
          console.log("No climbing data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [teamNumber, regional, climbingData]); // Empty dependency array ensures this effect runs once after the initial render
  //adding teamNumber and regional as dependencies ensures that they are retrieved before the DOM loads.  

  //accessing Driving Info
  useEffect(() => {
    const database = getDatabase();

    const drivingRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/Driving-Info');
    get(drivingRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDrivingData(data); // Set the data to state
          console.log("driving data: " + drivingData)
        } else {
          console.log("No driving data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [regional, teamNumber, drivingData]); //hopefully this doesn't result in an infinite loop. 

  //accessing Intake Info
  useEffect(() => {
    const database = getDatabase();

    const intakeRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/Intake-Info');
    get(intakeRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setIntakeData(data); // Set the data to state
          console.log("intake data: " + intakeData)
        } else {
          console.log("No intake data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [regional, teamNumber, intakeData]);

  //accessing Scoring info
  useEffect(() => {
    //a small optimization could be setting this in +1 scope, so that it doesn't have to be redefined every time
    const database = getDatabase();

    const scoringRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/Scoring-Info');
    get(scoringRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setScoringData(data); // Set the data to state
          console.log("scoring data: " + scoringData)
        } else {
          console.log("No scoring data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [regional, teamNumber, scoringData]);

  //accessing Vision info
  useEffect(() => {
    const database = getDatabase();

    const visionRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/Vision-Info');
    get(visionRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setVisionData(data); // Set the data to state
          console.log("vision data: " + visionData)
        } else {
          console.log("No vision data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [regional, teamNumber, visionData]);

  //accessing Drive Train info
  useEffect(() => {
    const database = getDatabase();

    const dtrainRef = ref(database, regional + '/teams/'+ teamNumber + '/Robot-Info/Drive-Train-Info');
    get(dtrainRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDriveTrainData(data); // Set the data to state
          console.log("drive train data: " + driveTrainData)
        } else {
          console.log("No drive train data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [regional, teamNumber, driveTrainData]);

  //setting display data based on fetched data using an array. 

  //data needs to be trimmed because data fetched from firebase is returned with quotes: "<data>"
  //trimming data strings (so they can be used as indicies):
  let scoreIndex: string = JSON.stringify(scoringData).substring(1, JSON.stringify(scoringData).length - 1)
  let climbIndex: string = JSON.stringify(climbingData).substring(1, JSON.stringify(climbingData).length - 1)
  let intakeIndex: string = JSON.stringify(intakeData).substring(1, JSON.stringify(intakeData).length - 1)
  let drivingIndex: string = JSON.stringify(drivingData).substring(1, JSON.stringify(drivingData).length - 1)

  //trimming vision and drive train, since these are both string values
  let visionDisplay: string = JSON.stringify(visionData).substring(1, JSON.stringify(visionData).length - 1)
  let driveTrainDisplay: string = JSON.stringify(driveTrainData).substring(1, JSON.stringify(driveTrainData).length - 1)

  //setting data-value pairs via the array
  let scoreDisplay: string = displayArray[+scoreIndex - 1];
  let climbDisplay: string = displayArray[+climbIndex - 1];
  let intakeDisplay: string = displayArray[+intakeIndex - 1];
  let drivingDisplay: string = displayArray[+drivingIndex - 1];


  return (
      <View style={styles.container}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.title}> Robot Display! </Text>
        <Text style={styles.subtitle}>{teamNumber}'s Data! </Text>
        <Text style={styles.dataText}>Scoring: {scoreDisplay}</Text>
        <Text style={styles.dataText}>Climbing: {climbDisplay}</Text>
        <Text style={styles.dataText}>Intake: {intakeDisplay}</Text>
        <Text style={styles.dataText}>Driving: {drivingDisplay}</Text>
        <Text style={styles.dataText}>Vision: {visionDisplay}</Text>
        <Text style={styles.dataText}>Drive Train: {driveTrainDisplay}</Text>
        {/* <Text style={styles.dataText}>trimmed scoring: {scoreIndex}</Text> */}
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
    textAlign: 'center',
    fontSize: 16,
    color: 'black', // or any color you prefer
    // Add other styling as needed
  },
  });


  export default robotDisplay;

