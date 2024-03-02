import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../../backButton";
import React, { useContext, useEffect, useState } from "react";
//contexts
import { TeamProvider, useTeam } from './TeamContext';
import { retrieveRegional, retrieveTeam, deleteTeamKeys, } from "../../../Contexts/TeamSecureCache";
import { DataSnapshot, getDatabase, off, onValue, ref } from "@firebase/database";



const matchDisplay = () => {
  
  // defining teamNumber and regional as state variables, because this allows their values to change.
  const [teamNumber, setTeamNumber] = useState<any>();
  const [regional, setRegional] = useState<any>();
  const [titleRegional, setTitleRegional] = useState<any>();
  const [selectedAutoType, setSelectedAutoType] = useState<string>('Amp');

  //pregame constants
  const [pregamePositionOne, setPregamePositionOne] = useState<string | null>(null);
  const [pregamePositionTwo, setPregamePositionTwo] = useState<string | null>(null);
  const [pregamePositionThree, setPregamePositionThree] = useState<string | null>(null);

  //auto constants
  const [autoTaxiPercent, setTaxiPercent] = useState<string | null>(null);
  const [autoM1AmpPercent, setM1AutoPercent] = useState<string | null>(null);
  const [autoM2AmpPercent, setM2AutoPercent] = useState<string | null>(null);
  const [autoM3AmpPercent, setM3AutoPercent] = useState<string | null>(null);
  const [autoM4AmpPercent, setM4AutoPercent] = useState<string | null>(null);
  const [autoM5AmpPercent, setM5AutoPercent] = useState<string | null>(null);
  const [autoS1AmpPercent, setS1AutoPercent] = useState<string | null>(null);
  const [autoS2AmpPercent, setS2AutoPercent] = useState<string | null>(null);
  const [autoS3AmpPercent, setS3AutoPercent] = useState<string | null>(null);
  const [autoRAmpPercent, setRAutoPercent] = useState<string | null>(null);

  const [autoM1SpeakerPercent, setM1SpeakerPercent] = useState<string | null>(null);
  const [autoM2SpeakerPercent, setM2SpeakerPercent] = useState<string | null>(null);
  const [autoM3SpeakerPercent, setM3SpeakerPercent] = useState<string | null>(null);
  const [autoM4SpeakerPercent, setM4SpeakerPercent] = useState<string | null>(null);
  const [autoM5SpeakerPercent, setM5SpeakerPercent] = useState<string | null>(null);
  const [autoS1SpeakerPercent, setS1SpeakerPercent] = useState<string | null>(null);
  const [autoS2SpeakerPercent, setS2SpeakerPercent] = useState<string | null>(null);
  const [autoS3SpeakerPercent, setS3SpeakerPercent] = useState<string | null>(null);
  const [autoRSpeakerPercent, setRSpeakerPercent] = useState<string | null>(null);

  const [autoM1IntakePercent, setM1IntakePercent] = useState<string | null>(null);
  const [autoM2IntakePercent, setM2IntakePercent] = useState<string | null>(null);
  const [autoM3IntakePercent, setM3IntakePercent] = useState<string | null>(null);
  const [autoM4IntakePercent, setM4IntakePercent] = useState<string | null>(null);
  const [autoM5IntakePercent, setM5IntakePercent] = useState<string | null>(null);
  const [autoS1IntakePercent, setS1IntakePercent] = useState<string | null>(null);
  const [autoS2IntakePercent, setS2IntakePercent] = useState<string | null>(null);
  const [autoS3IntakePercent, setS3IntakePercent] = useState<string | null>(null);
  const [autoRIntakePercent, setRIntakePercent] = useState<string | null>(null);


  //teleop constants
  const [teleopAmpPercent, setTeleopAmpPercent] = useState<string | null>(null);
  const [teleopGroundIntakePercent, setTeleopGroundIntakePercent] = useState<string | null>(null);
  const [teleopSourceIntakePercent, setTeleopSourceIntakePercent] = useState<string | null>(null);
  const [teleopSpeakerPercent, setTeleopSpeakerPercent] = useState<string | null>(null);

  //endgame constants
  const [endgameNothingPercent, setEndgameNothingPercent] = useState<string | null>(null);
  const [endgameParkPercent, setEndgameParkPercent] = useState<string | null>(null);
  const [endgameSingleClimbPercent, setEndgameSingleClimbPercent] = useState<string | null>(null);
  const [endgameDoubleClimbPercent, setEndgameDoubleClimbPercent] = useState<string | null>(null);
  const [endgameTripleClimbPercent, setEndgameTripleClimbPercent] = useState<string | null>(null);

  const [endgameNoTrapPercent, setEndgameNoTrapPercent] = useState<string | null>(null);
  const [endgameOneTrapPercent, setEndgameOneTrapPercent] = useState<string | null>(null);
  const [endgameTwoTrapPercent, setEndgameTwoTrapPercent] = useState<string | null>(null);
  const [endgameThreeTrapPercent, setEndgameThreeTrapPercent] = useState<string | null>(null);

  //postgame constants
  const [postgameAverageDriverRating, setPostgameAverageDriverRating] = useState<string | null>(null);

  useEffect(() => {
    //log for debugging
    // console.log("useEffect called");

    //defining a new asynchronous function which will be used to retrieve and set both the team number and the regional. 
    async function getTeamInfo() {
      const result = await retrieveRegional();
      if (!result) {
        // console.log("no regional found");
      } else {
        setTitleRegional(result)
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
  // defining teamNumber and regional as state variables, because this allows their values to change.

  const getM1AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoM1AmpPercent;
      case 'Speaker':
        return autoM1SpeakerPercent;
      case 'Intake':
        return autoM1IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getM2AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoM2AmpPercent;
      case 'Speaker':
        return autoM2SpeakerPercent;
      case 'Intake':
        return autoM2IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getM3AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoM3AmpPercent;
      case 'Speaker':
        return autoM3SpeakerPercent;
      case 'Intake':
        return autoM3IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getM4AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoM4AmpPercent;
      case 'Speaker':
        return autoM4SpeakerPercent;
      case 'Intake':
        return autoM4IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getM5AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoM5AmpPercent;
      case 'Speaker':
        return autoM5SpeakerPercent;
      case 'Intake':
        return autoM5IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getS1AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoS1AmpPercent;
      case 'Speaker':
        return autoS1SpeakerPercent;
      case 'Intake':
        return autoS1IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getS2AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoS2AmpPercent;
      case 'Speaker':
        return autoS2SpeakerPercent;
      case 'Intake':
        return autoS2IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getS3AutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoS3AmpPercent;
      case 'Speaker':
        return autoS3SpeakerPercent;
      case 'Intake':
        return autoS3IntakePercent; // Replace with the actual state variable for Intake
      default:
        return 'N/A';
    }
  };

  const getRAutoPercentage = (autoType: string) => {
    switch (autoType) {
      case 'Amp':
        return autoRAmpPercent;
      case 'Speaker':
        return autoRSpeakerPercent;
      case 'Intake':
        return autoRIntakePercent;
      default:
        return 'N/A';
    }
  };

  //accessing data
  useEffect(() => {
    const database = getDatabase();

    // reference paths for each data
    // pregame paths
    const pregamePositionOneRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Amp');
    const pregamePositionTwoRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Middle');
    const pregamePositionThreeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Source');

    // auto paths
    const autoTaxiRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Taxi')

    const autoM1AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/M1') 
    const autoM2AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/M2') 
    const autoM3AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/M3') 
    const autoM4AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/M4') 
    const autoM5AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/M5') 
    const autoS1AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/S1') 
    const autoS2AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/S2') 
    const autoS3AmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/S3') 
    const autoRAmpRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Amp/R') 

    const autoM1SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/M1') 
    const autoM2SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/M2') 
    const autoM3SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/M3') 
    const autoM4SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/M4') 
    const autoM5SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/M5') 
    const autoS1SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/S1') 
    const autoS2SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/S2') 
    const autoS3SpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/S3') 
    const autoRSpeakerRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Speaker/R') 

    const autoM1IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/M1') 
    const autoM2IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/M2') 
    const autoM3IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/M3') 
    const autoM4IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/M4') 
    const autoM5IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/M5') 
    const autoS1IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/S1') 
    const autoS2IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/S2') 
    const autoS3IntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/S3') 
    const autoRIntakeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Auto/Intake/R') 

    // teleop paths
    const teleopAmpPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Amp')
    const teleopGroundPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Ground Intake')
    const teleopSourcePercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Source Intake')
    const teleopSpeakerPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Speaker')

    // endgame paths
    const endgameNothingPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Nothing')
    const endgameParkPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Park')
    const endgameSingleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Single Climb')
    const endgameDoubleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Double Climb')
    const endgameTripleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Triple Climb')

    const endgameNoTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Trap/0 Trap')
    const endgameOneTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Trap/1 Trap')
    const endgameTwoTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Trap/2 Trap')
    const endgameThreeTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Trap/3 Trap')

    //postgame paths
    const postgameAverageDriverRatingRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Postgame/Driving Rating')

    // Callback function to handle snapshot changes
    const handleSnapshot = (snapshot: DataSnapshot, setPosition: React.Dispatch<React.SetStateAction<string | null>>) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPosition(data); // Set the data to state
      } else {
        // console.log("No data available");
      }
    };

    // Set up listeners for each data
    // pregame
    const pregamePositionOneListener = onValue(pregamePositionOneRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionOne));
    const pregamePositionTwoListener = onValue(pregamePositionTwoRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionTwo));
    const pregamePositionThreeListener = onValue(pregamePositionThreeRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionThree));

    //auto
    const autoTaxiListener = onValue(autoTaxiRef, (snapshot) => handleSnapshot(snapshot, setTaxiPercent));

    const autoM1AmpListener = onValue(autoM1AmpRef, (snapshot) => handleSnapshot(snapshot, setM1AutoPercent));
    const autoM2AmpListener = onValue(autoM2AmpRef, (snapshot) => handleSnapshot(snapshot, setM2AutoPercent));
    const autoM3AmpListener = onValue(autoM3AmpRef, (snapshot) => handleSnapshot(snapshot, setM3AutoPercent));
    const autoM4AmpListener = onValue(autoM4AmpRef, (snapshot) => handleSnapshot(snapshot, setM4AutoPercent));
    const autoM5AmpListener = onValue(autoM5AmpRef, (snapshot) => handleSnapshot(snapshot, setM5AutoPercent));
    const autoS1AmpListener = onValue(autoS1AmpRef, (snapshot) => handleSnapshot(snapshot, setS1AutoPercent));
    const autoS2AmpListener = onValue(autoS2AmpRef, (snapshot) => handleSnapshot(snapshot, setS2AutoPercent));
    const autoS3AmpListener = onValue(autoS3AmpRef, (snapshot) => handleSnapshot(snapshot, setS3AutoPercent));
    const autoRAmpListener = onValue(autoRAmpRef, (snapshot) => handleSnapshot(snapshot, setRAutoPercent));

    const autoM1SpeakerListener = onValue(autoM1SpeakerRef, (snapshot) => handleSnapshot(snapshot, setM1SpeakerPercent));
    const autoM2SpeakerListener = onValue(autoM2SpeakerRef, (snapshot) => handleSnapshot(snapshot, setM2SpeakerPercent));
    const autoM3SpeakerListener = onValue(autoM3SpeakerRef, (snapshot) => handleSnapshot(snapshot, setM3SpeakerPercent));
    const autoM4SpeakerListener = onValue(autoM4SpeakerRef, (snapshot) => handleSnapshot(snapshot, setM4SpeakerPercent));
    const autoM5SpeakerListener = onValue(autoM5SpeakerRef, (snapshot) => handleSnapshot(snapshot, setM5SpeakerPercent));
    const autoS1SpeakerListener = onValue(autoS1SpeakerRef, (snapshot) => handleSnapshot(snapshot, setS1SpeakerPercent));
    const autoS2SpeakerListener = onValue(autoS2SpeakerRef, (snapshot) => handleSnapshot(snapshot, setS2SpeakerPercent));
    const autoS3SpeakerListener = onValue(autoS3SpeakerRef, (snapshot) => handleSnapshot(snapshot, setS3SpeakerPercent));
    const autoRSpeakerListener = onValue(autoRSpeakerRef, (snapshot) => handleSnapshot(snapshot, setRSpeakerPercent));

    const autoM1IntakeListener = onValue(autoM1IntakeRef, (snapshot) => handleSnapshot(snapshot, setM1IntakePercent));
    const autoM2IntakeListener = onValue(autoM2IntakeRef, (snapshot) => handleSnapshot(snapshot, setM2IntakePercent));
    const autoM3IntakeListener = onValue(autoM3IntakeRef, (snapshot) => handleSnapshot(snapshot, setM3IntakePercent));
    const autoM4IntakeListener = onValue(autoM4IntakeRef, (snapshot) => handleSnapshot(snapshot, setM4IntakePercent));
    const autoM5IntakeListener = onValue(autoM5IntakeRef, (snapshot) => handleSnapshot(snapshot, setM5IntakePercent));
    const autoS1IntakeListener = onValue(autoS1IntakeRef, (snapshot) => handleSnapshot(snapshot, setS1IntakePercent));
    const autoS2IntakeListener = onValue(autoS2IntakeRef, (snapshot) => handleSnapshot(snapshot, setS2IntakePercent));
    const autoS3IntakeListener = onValue(autoS3IntakeRef, (snapshot) => handleSnapshot(snapshot, setS3IntakePercent));
    const autoRIntakeListener = onValue(autoRIntakeRef, (snapshot) => handleSnapshot(snapshot, setRIntakePercent));

    // teleop
    const teleopAmpPercentListener = onValue(teleopAmpPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopAmpPercent))
    const teleopGroundPercentListener = onValue(teleopGroundPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopGroundIntakePercent))
    const teleopSourcePercentListener = onValue(teleopSourcePercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopSourceIntakePercent))
    const teleopSpeakerPercentListener = onValue(teleopSpeakerPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopSpeakerPercent))

    // endgame
    const endgameNothingPercentListener = onValue(endgameNothingPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameNothingPercent))
    const endgameParkPercentListener = onValue(endgameParkPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameParkPercent))
    const endgameSingleClimbPercentListener = onValue(endgameSingleClimbPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameSingleClimbPercent))
    const endgameDoubleClimbPercentListener = onValue(endgameDoubleClimbPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameDoubleClimbPercent))
    const endgameTripleClimbPercentListener = onValue(endgameTripleClimbPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameTripleClimbPercent))

    const endgameNoTrapPercentListener = onValue(endgameNoTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameNoTrapPercent))
    const endgameOneTrapPercentListener = onValue(endgameOneTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameOneTrapPercent))
    const endgameTwoTrapPercentListener = onValue(endgameTwoTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameTwoTrapPercent))
    const endgameThreeTrapPercentListener = onValue(endgameThreeTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameThreeTrapPercent))
    //postgame
    const postgameAverageDriverRatingListener = onValue(postgameAverageDriverRatingRef, (snapshot) => handleSnapshot(snapshot, setPostgameAverageDriverRating))

    // Clean up listeners on component unmount
    return () => {
      // pregame listeners
      off(pregamePositionOneRef, 'value', pregamePositionOneListener);
      off(pregamePositionTwoRef, 'value', pregamePositionTwoListener);
      off(pregamePositionThreeRef, 'value', pregamePositionThreeListener);

      //auto listeners
      off(autoTaxiRef, 'value', autoTaxiListener);

      off(autoM1AmpRef, 'value', autoM1AmpListener);
      off(autoM2AmpRef, 'value', autoM2AmpListener);
      off(autoM3AmpRef, 'value', autoM3AmpListener);
      off(autoM4AmpRef, 'value', autoM4AmpListener);
      off(autoM5AmpRef, 'value', autoM5AmpListener);
      off(autoS1AmpRef, 'value', autoS1AmpListener);
      off(autoS2AmpRef, 'value', autoS2AmpListener);
      off(autoS3AmpRef, 'value', autoS3AmpListener);
      off(autoRAmpRef, 'value', autoRAmpListener);

      off(autoM1SpeakerRef, 'value', autoM1SpeakerListener);
      off(autoM2SpeakerRef, 'value', autoM2SpeakerListener);
      off(autoM3SpeakerRef, 'value', autoM3SpeakerListener);
      off(autoM4SpeakerRef, 'value', autoM4SpeakerListener);
      off(autoM5SpeakerRef, 'value', autoM5SpeakerListener);
      off(autoS1SpeakerRef, 'value', autoS1SpeakerListener);
      off(autoS2SpeakerRef, 'value', autoS2SpeakerListener);
      off(autoS3SpeakerRef, 'value', autoS3SpeakerListener);
      off(autoRSpeakerRef, 'value', autoRSpeakerListener);

      off(autoM1IntakeRef, 'value', autoM1IntakeListener);
      off(autoM2IntakeRef, 'value', autoM2IntakeListener);
      off(autoM3IntakeRef, 'value', autoM3IntakeListener);
      off(autoM4IntakeRef, 'value', autoM4IntakeListener);
      off(autoM5IntakeRef, 'value', autoM5IntakeListener);
      off(autoS1IntakeRef, 'value', autoS1IntakeListener);
      off(autoS2IntakeRef, 'value', autoS2IntakeListener);
      off(autoS3IntakeRef, 'value', autoS3IntakeListener);
      off(autoRIntakeRef, 'value', autoRIntakeListener);

      //teleop listeners
      off(teleopAmpPercentRef, 'value', teleopAmpPercentListener);
      off(teleopGroundPercentRef, 'value', teleopGroundPercentListener);
      off(teleopSourcePercentRef, 'value', teleopSourcePercentListener);
      off(teleopSpeakerPercentRef, 'value', teleopSpeakerPercentListener);

      // endgame listeners
      off(endgameNothingPercentRef, 'value', endgameNothingPercentListener);
      off(endgameParkPercentRef, 'value', endgameParkPercentListener);
      off(endgameSingleClimbPercentRef, 'value', endgameSingleClimbPercentListener);
      off(endgameDoubleClimbPercentRef, 'value', endgameDoubleClimbPercentListener);
      off(endgameTripleClimbPercentRef, 'value', endgameTripleClimbPercentListener);

      off(endgameNoTrapPercentRef, 'value', endgameNoTrapPercentListener);
      off(endgameOneTrapPercentRef, 'value', endgameOneTrapPercentListener);
      off(endgameTwoTrapPercentRef, 'value', endgameTwoTrapPercentListener);
      off(endgameThreeTrapPercentRef, 'value', endgameThreeTrapPercentListener);

      //postgame listeners
      off(postgameAverageDriverRatingRef, 'value', postgameAverageDriverRatingListener);
    };

  }, [teamNumber, regional]);
  //I think having these as dependencies ensures that they will have a value before the rest of the code runs, but I'm not sure

  //added a line which displays stored info to ensure it is being retrieved

  const InfoPercentItem: React.FC<ItemProps> = ({ title, info }) => (
    <View style={styles.infoItem}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.infoText}>{info !== null ? `${info}%` : 'N/A'}</Text>
    </View>
  );

  const InfoItem: React.FC<ItemProps> = ({ title, info }) => (
    <View style={styles.infoItem}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.infoText}>{info !== null ? `${info}` : 'N/A'}</Text>
    </View>
  );
  

  type ItemProps = {
    title: string;
    info: string;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.teamNumber}> {teamNumber} </Text>
        <Text style={styles.heading}> Match Display! </Text>
        <Text style={styles.subtitle}>{titleRegional} Regional!</Text>
        <Text style={styles.itemTitle}>Pregame</Text>
        <View style={styles.border}>
          <InfoPercentItem title="Amp:" info={pregamePositionOne}/>
          <InfoPercentItem title="Middle: " info={pregamePositionTwo} />
          <InfoPercentItem title="Source: " info={pregamePositionThree}/>
        </View>

        <Text style={styles.itemTitle}>Autonomous</Text>
        <View style={styles.border}>
          <InfoPercentItem title="Taxi:" info={autoTaxiPercent} />
          <InfoPercentItem title={`${selectedAutoType} M1:`} info={getM1AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} M2:`} info={getM2AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} M3:`} info={getM3AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} M4:`} info={getM4AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} M5:`} info={getM5AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} S1:`} info={getS1AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} S2:`} info={getS2AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} S3:`} info={getS3AutoPercentage(selectedAutoType)} />
          <InfoPercentItem title={`${selectedAutoType} R:`} info={getRAutoPercentage(selectedAutoType)} />
        </View>
        <View style={styles.autoBorder}>
          <View style={styles.autoButtons}>
            <Pressable style = {styles.optionButton} >
              <Text style={styles.optionText} onPress={() => setSelectedAutoType('Amp')}>Amp</Text>
            </Pressable>
            <Pressable style = {styles.optionButton} >
              <Text style={styles.optionText} onPress={() => setSelectedAutoType('Speaker')}>Speaker</Text>
            </Pressable>
            <Pressable style = {styles.optionButton} >
              <Text style={styles.optionText} onPress={() => setSelectedAutoType('Intake')}>Intake</Text>
            </Pressable>
          </View>
          <Text style={styles.infoText}>{selectedAutoType !== 'filler' ? `Showing ${selectedAutoType} percentages` : ''}</Text>
        </View>

        <Text style={styles.itemTitle}>Teleoperation</Text>
        <View style={styles.border}>
          <InfoPercentItem title="Amp Accuracy:" info={teleopAmpPercent} />
          <InfoPercentItem title="Speaker Accuracy: " info={teleopSpeakerPercent} />
          <InfoPercentItem title="Source Intake: " info={teleopSourceIntakePercent} />
          <InfoPercentItem title="Ground Intake: " info={teleopGroundIntakePercent} />
        </View>

        <Text style={styles.itemTitle}>Endgame</Text>
        <View style={styles.border}>
          <InfoPercentItem title="Nothing:" info={endgameNothingPercent} />
          <InfoPercentItem title="Park Rate: " info={endgameParkPercent} />
          <InfoPercentItem title="Single Climb Rate: " info={endgameSingleClimbPercent} />
          <InfoPercentItem title="Double Climb Rate: " info={endgameDoubleClimbPercent} />
          <InfoPercentItem title="Triple Climb Rate: " info={endgameTripleClimbPercent} />
          <InfoPercentItem title="0 Trap:" info={endgameNoTrapPercent} />
          <InfoPercentItem title="1 Trap: " info={endgameOneTrapPercent} />
          <InfoPercentItem title="2 Trap: " info={endgameTwoTrapPercent} />
          <InfoPercentItem title="3 Trap: " info={endgameThreeTrapPercent} />
        </View>

        <Text style={styles.itemTitle}>Overall</Text>
        <View style={styles.border}>
          <InfoItem title="Driver Rating:" info={postgameAverageDriverRating} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: 'flex-start', // Aligns content to the top of the page
    alignItems: 'center', // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
  },
  teamNumber: {
    fontSize: 50,
    color: 'rgba(0, 130, 190, 255)',
    alignSelf: 'center',
    fontFamily: 'BPoppins',
    marginTop: -40,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -20,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 20,  //font size differs from regional page. Regional = 25. 
    marginBottom: -10,
    marginTop: 5, //adding top margin to move down the page.
    color: '#737373',
    fontFamily:'BPoppins',
  },
  border: {
    padding: 10,
    borderRadius: 10, //curves
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  autoBorder: {
    padding: 10,
    borderRadius: 10, //curves
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 10,
  },
  itemTitle: {
    fontSize: 25,
    fontFamily: 'BPoppins',
    color: 'rgba(0, 130, 190, 255)',
    marginTop: 30,
  },
  titleText: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'BPoppins',
  },
  infoText: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'BPoppins',
    color: '#737373',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  infoBox: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  autoButtons: {
    flexDirection: 'row',
  },
  optionButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)',
    paddingHorizontal: '5%',
    marginHorizontal:'1%',
    paddingVertical:'3%',
    borderRadius:5,
    marginBottom:'3%',
  },
  optionText:{
    fontFamily:'BPoppins',
    color:'white',
    fontSize: 15,
  }
});

export default matchDisplay;