 import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
 import { Pressable, Button, Text, View, StyleSheet, Image, ScrollView } from "react-native";
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

//   //Array for reading values:
//   const displayArray: string[] = [
//     //scoring
//     'No Scoring', 'Amp Only', 'Speaker Only', 'Both',
//     //climbing
//     'No Climb', 'Single Climb', 'Harmony Climb',
//     //intake
//     'No Intake', 'Ground Only', 'Source Only', 'Both',
//     //driving
//     'N/A', 'Drive Over Notes', 'Drive Under Stage', 'Both',
//   ]


//   //state variables for regional and teamNumber
//   const [regional, setRegional] = useState('');
//   const [teamNumber, setTeamNumber] = useState('');

//   //state variables for climber display value. 
//   //Find a way to make this more efficient. 
//   const [climberOption, setClimberOption] = useState('');
//   const [climbData, setClimbData] = useState(".");

//   //Accessing cache
//   useEffect(() => {
//     //this is copied over from matchDisplay, where it is explained in more detail.

//     async function getTeamInfo() {
//       retrieveRegional().then((result: string | null) => {
//         if (!result) {
//           console.log("no regional found")
//         }
//         else {
//           const reg = result;
//           setRegional(reg);
//         }
//       })

//       retrieveTeam().then((result: string | null) => {
//         if (!result) {
//           console.log("no team found")
//         }
//         else {
//           const num = result;
//           setTeamNumber(num);
//         }
//       })
//     }

//     getTeamInfo();
//     console.log("(robotDisplay): " + "team: " + teamNumber + " regional " + regional)

//   }, [teamNumber, regional]);

//   //accessing Climbing Info
//   useEffect(() => {
//     const database = getDatabase();

//     const climbingRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Climbing-Info');
//     get(climbingRef)
//       .then((snapshot: DataSnapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           setClimbingData(data); // Set the data to state
//           //bottom stuff is subject to change. 
//           setClimbData(JSON.stringify(climbingData))
//           console.log("climbing data: " + climbingData + " climbing Display: " + climbData)
//         } else {
//           console.log("No climbing data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }, [teamNumber, regional, climbingData]); // Empty dependency array ensures this effect runs once after the initial render
//   //adding teamNumber and regional as dependencies ensures that they are retrieved before the DOM loads.  

//   //accessing Driving Info
//   useEffect(() => {
//     const database = getDatabase();

//     const drivingRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Driving-Info');
//     get(drivingRef)
//       .then((snapshot: DataSnapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           setDrivingData(data); // Set the data to state
//           console.log("driving data: " + drivingData)
//         } else {
//           console.log("No driving data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }, [regional, teamNumber, drivingData]); //hopefully this doesn't result in an infinite loop. 

//   //accessing Intake Info
//   useEffect(() => {
//     const database = getDatabase();

//     const intakeRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Intake-Info');
//     get(intakeRef)
//       .then((snapshot: DataSnapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           setIntakeData(data); // Set the data to state
//           console.log("intake data: " + intakeData)
//         } else {
//           console.log("No intake data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }, [regional, teamNumber, intakeData]);

//   //accessing Scoring info
//   useEffect(() => {
//     //a small optimization could be setting this in +1 scope, so that it doesn't have to be redefined every time
//     const database = getDatabase();

//     const scoringRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Scoring-Info');
//     get(scoringRef)
//       .then((snapshot: DataSnapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           setScoringData(data); // Set the data to state
//           console.log("scoring data: " + scoringData)
//         } else {
//           console.log("No scoring data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }, [regional, teamNumber, scoringData]);

//   //accessing Vision info
//   useEffect(() => {
//     const database = getDatabase();

//     const visionRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Vision-Info');
//     get(visionRef)
//       .then((snapshot: DataSnapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           setVisionData(data); // Set the data to state
//           console.log("vision data: " + visionData)
//         } else {
//           console.log("No vision data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }, [regional, teamNumber, visionData]);

//   //accessing Drive Train info
//   useEffect(() => {
//     const database = getDatabase();

//     const dtrainRef = ref(database, regional + '/teams/' + teamNumber + '/Robot-Info/Drive-Train-Info');
//     get(dtrainRef)
//       .then((snapshot: DataSnapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           setDriveTrainData(data); // Set the data to state
//           console.log("drive train data: " + driveTrainData)
//         } else {
//           console.log("No drive train data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }, [regional, teamNumber, driveTrainData]);

//   //setting display data based on fetched data using an array. 

//   //data needs to be trimmed because data fetched from firebase is returned with quotes: "<data>"
//   //trimming data strings (so they can be used as indicies):
//   let scoreIndex: string = JSON.stringify(scoringData).substring(1, JSON.stringify(scoringData).length - 1)
//   let climbIndex: string = JSON.stringify(climbingData).substring(1, JSON.stringify(climbingData).length - 1)
//   let intakeIndex: string = JSON.stringify(intakeData).substring(1, JSON.stringify(intakeData).length - 1)
//   let drivingIndex: string = JSON.stringify(drivingData).substring(1, JSON.stringify(drivingData).length - 1)

//   //trimming vision and drive train, since these are both string values
//   let visionDisplay: string = JSON.stringify(visionData).substring(1, JSON.stringify(visionData).length - 1)
//   let driveTrainDisplay: string = JSON.stringify(driveTrainData).substring(1, JSON.stringify(driveTrainData).length - 1)

//   //setting data-value pairs via the array
//   let scoreDisplay: string = displayArray[+scoreIndex - 1];
//   let climbDisplay: string = displayArray[+climbIndex - 1];
//   let intakeDisplay: string = displayArray[+intakeIndex - 1];
//   let drivingDisplay: string = displayArray[+drivingIndex - 1];


// //   return (

// //       <Text style={styles.team}>{teamNumber}</Text>
// //       <Text style={styles.subtitle}> Robot Information </Text>

// //       <Text>
// //         <Text style={styles.dataTitle}>Scoring: </Text>
// //         <Text style={styles.dataText}>{scoreDisplay}</Text>
// //       </Text>
// //       <Text>
// //         <View style={styles.circle}>
// //           <Image source={require('../../../../assets/images/gears.png')} style={styles.icon}/>
// //         </View>
// //         <Text style={styles.dataTitle}>Climbing: </Text>
// //         <Text style={styles.dataText}>{climbDisplay}</Text>
// //       </Text>
// //       <Text>
// //         <Text style={styles.dataTitle}>Intake: </Text>        
// //         <Text style={styles.dataText}>{intakeDisplay}</Text>

// //       </Text>
// //       <Text>
// //         <Text style={styles.dataTitle}>Driving: </Text>
// //         <Text style={styles.dataText}>{drivingDisplay}</Text>

// //       </Text>
// //       <Text>
// //         <Text style={styles.dataTitle}>Vision: </Text>
// //         <Text style={styles.dataText}>{visionDisplay}</Text>

// //       </Text>
// //       <Text>
// //         <Text style={styles.dataTitle}>Drive Train: </Text>
// //         <Text style={styles.dataText}>{driveTrainDisplay}</Text>
// //       </Text>
// //       {/* <Text style={styles.dataText}>trimmed scoring: {scoreIndex}</Text> */}

// //     </View>
// //   );
// // };
// const robotDisplay: React.FC = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.team}>1574</Text>
//       <Text style={styles.heading}>Robot Information</Text>
      
//       <InfoItem icon="target" text="Scoring: Both" />
//       <InfoItem icon="robot-industrial" text="Intake: Ground Only" />
//       <InfoItem icon="eye" text="Vision: Limelight" />
//       <InfoItem icon="cogs" text="Driving: Drive Over Notes" />
//       <InfoItem icon="rotate-3d-variant" text="Drive Train: Swerve" />
//       <InfoItem icon="stairs-up" text="Climbing: Harmony Climb" />
//     </ScrollView>
//   );
// };

const InfoItem: React.FC<InfoItemProps> = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={30} color="black" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Makes sure the container takes up the whole screen
//     justifyContent: 'flex-start', // Aligns content to the top of the page
//     alignItems: 'center', // Centers content horizontally in the container
//     padding: 20, // Optional: Adds padding to the container
//   },
//   heading: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'black',
//     marginTop: 20,
//     marginBottom: 30,
//     alignSelf: 'center',
//   },
//   dataTitle:{
//     textAlign: 'center',
//     fontSize: 16,
//     fontFamily: 'BPoppins',
//     color: 'rgba(0, 130, 190, 255)',
//   },
//   dataText: {
//     textAlign: 'center',
//     fontSize: 16,

//   },
//   team: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: 'black',
//     alignSelf: 'center',
//   },
//   icon: {
//     width: 30, 
//     height: 30, 
//   },
//   circle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25, // Half of the width and height to create a circle
//     backgroundColor: 'blue', // Change the color as needed
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   infoText: {
//     fontSize: 20,
//     marginLeft: 10,
//   },

// });


// export default robotDisplay;


// Define a type for the InfoItem props
type InfoItemProps = {
  icon: string;
  text: string;
};

// const robotDisplay: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
     <BackButton buttonName="Home Page" />
      <Text style={styles.robotNumber}>1574</Text>
      <Text style={styles.heading}>Robot Information</Text>
      
      <InfoItem icon="target" text="Scoring: Both" />
      <InfoItem icon="robot-industrial" text="Intake: Ground Only" />
      <InfoItem icon="eye" text="Vision: Limelight" />
      <InfoItem icon="cogs" text="Driving: Drive Over Notes" />
      <InfoItem icon="rotate-3d-variant" text="Drive Train: Swerve" />
      <InfoItem icon="stairs-up" text="Climbing: Harmony Climb" />
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  robotNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'rgba(0, 130, 190, 255)',
    alignSelf: 'center',
    marginTop:'0%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 7,
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
    color: "blue",
    fontFamily:'BPoppins',
  },
  icon: {
    color: "black",
    fontFamily:'BPoppins',
  }
  // Add more styling if needed
});

export default robotDisplay;