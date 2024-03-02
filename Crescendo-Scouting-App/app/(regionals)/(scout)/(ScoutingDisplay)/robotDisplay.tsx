import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../backButton";
import { database } from '../../../.././firebaseConfig';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
import { TeamProvider, useTeam } from './TeamContext';
import { retrieveRegional, retrieveTeam } from "../../../Contexts/TeamSecureCache";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const robotDisplay = () => {
 //backend data state variables:
 //climbing
 const [climbingData, setClimbingData] = useState<string>("No Information");
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
   'No Scoring', 'Amp', 'Speaker', 'Amp and Speaker',
   //climbing
   'No Climb', 'Single Climb', 'Harmony Climb',
   //intake
   'No Intake', 'Ground', 'Source', 'Ground and Source',
   //driving
   'Restricted', 'Drive Over Notes', 'Drive Under Stage', 'Both',
   //No Information
   'No Information',
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
    //log for debugging
    // console.log("useEffect called");

    //defining a new asynchronous function which will be used to retrieve and set both the team number and the regional. 
    async function getTeamInfo() {
      const result = await retrieveRegional();
      if (!result) {
        // console.log("no regional found");
      } else {
        let modifiedRegional = result
        if (result === 'Orange County') {
          modifiedRegional = 'Orange-County'
        }
        else if (result === 'Port Hueneme') {
          modifiedRegional = 'Port-Hueneme'
        }
        setRegional(modifiedRegional);
      }

      const num = await retrieveTeam();
      if (!num) {
        // console.log("no team found");
      } else {
        setTeamNumber(num);
      }
    }
    //calling the function defined above
    getTeamInfo();

    //logging for debugging
    // console.log("(matchDisplay): " + "team: " + teamNumber + " regional " + regional)

  }, [teamNumber, regional])

 //accessing Climbing Info
 useEffect(() => {
   const database = getDatabase();

   const climbingRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Climbing-Info');
   get(climbingRef)
     .then((snapshot: DataSnapshot) => {
       if (snapshot.exists()) {
         const data = snapshot.val();
         setClimbingData(data); // Set the data to state
         //bottom stuff is subject to change. 
         setClimbData(JSON.stringify(climbingData))
         console.log("climbing data: " + climbingData + " climbing Display: " + climbData)
       } else {
         setClimbingData("16")
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

   const drivingRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Driving-Info');
   get(drivingRef)
     .then((snapshot: DataSnapshot) => {
       if (snapshot.exists()) {
         const data = snapshot.val();
         setDrivingData(data); // Set the data to state
         console.log("driving data: " + drivingData)
       } else {
        setDrivingData("16")
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

   const intakeRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Intake-Info');
   get(intakeRef)
     .then((snapshot: DataSnapshot) => {
       if (snapshot.exists()) {
         const data = snapshot.val();
         setIntakeData(data); // Set the data to state
         console.log("intake data: " + intakeData)
       } else {
        setIntakeData("16")
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

   const scoringRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Scoring-Info');
   get(scoringRef)
     .then((snapshot: DataSnapshot) => {
       if (snapshot.exists()) {
         const data = snapshot.val();
         setScoringData(data); // Set the data to state
         console.log("scoring data: " + scoringData)
       } else {
        setScoringData("16")
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

   const visionRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Vision-Info');
   get(visionRef)
     .then((snapshot: DataSnapshot) => {
       if (snapshot.exists()) {
         const data = snapshot.val();
         setVisionData(data); // Set the data to state
         console.log("vision data: " + visionData)
       } else {
        setVisionData("No Information")
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

   const dtrainRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Drive-Train-Info');
   get(dtrainRef)
     .then((snapshot: DataSnapshot) => {
       if (snapshot.exists()) {
         const data = snapshot.val();
         setDriveTrainData(data); // Set the data to state
         console.log("drive train data: " + driveTrainData)
       } else {
        setDriveTrainData("No Information")
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

const InfoItem: React.FC<ItemProps> = ({ icon, text, info }) => (
 <View style={styles.infoItem}>
   <View style={styles.circle}>
   <Icon name={icon} size={30} color="black" />
   </View>
   <Text style={styles.titleText}>{text}</Text>
   <Text style={styles.infoText}>{info}</Text>
 </View>
);

type ItemProps = {
 icon: string;
 text: string;
 info: string;
};

// const robotDisplay: React.FC = () => {
 return (
   <View style={styles.container}>
    <BackButton buttonName="Home Page" />
     <Text style={styles.teamNumber}>{teamNumber}</Text>
     <Text style={styles.heading}>Robot Information</Text>
       <View style={styles.infoBox}>
     <InfoItem icon="circle-outline" text="Scoring:" info={scoreDisplay} />
     <InfoItem icon="hand-extended-outline" text="Intake: " info={intakeDisplay} />
     <InfoItem icon="eye-outline" text="Vision: " info={visionDisplay} />
     <InfoItem icon="cogs" text="Driving: " info={drivingDisplay} />
     <InfoItem icon="tire" text="Drive Train: " info={driveTrainDisplay}/>
     <InfoItem icon="ladder" text="Climbing: " info={climbDisplay}/>
     </View>
   </View>
 );
};



const styles = StyleSheet.create({
 container: {
   flex:1,
   backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
 },
 
 infoBox: {
   backgroundColor: 'white',
   paddingHorizontal: 15,
 },
 teamNumber: {
   fontSize: 48,
   color: 'rgba(0, 130, 190, 255)',
   alignSelf: 'center',
   marginTop: -40,
   fontFamily: 'BPoppins',
 },
 heading: {
   fontSize: 30,
   fontWeight: 'bold',
   color: 'black',
   marginTop: -10,
   marginBottom: 30,
   alignSelf: 'center',
 },
 infoItem: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 15,
 },
 infoText: {
   fontSize: 20,
   marginLeft: 10,
   fontFamily:'BPoppins',
 },
 icon: {
   color: "black",
   fontFamily:'BPoppins',
 },
 titleText: {
   color: 'rgba(0, 130, 190, 255)',
   fontSize: 20,
   marginLeft: 10,
   fontFamily:'BPoppins',
 },
 circle: {
   width: 50,
   height: 50,
   borderRadius: 25, // Half of the width and height to create a circle
   backgroundColor: '#D9D9D9', // Change the color as needed
   justifyContent: 'center',
   alignItems: 'center',
 },
 
 // Add more styling if needed
});

export default robotDisplay;