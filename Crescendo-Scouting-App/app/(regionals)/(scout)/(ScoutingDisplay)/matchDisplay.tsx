import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../../backButton";
import React, { useContext, useEffect, useState } from "react";
//contexts
import { TeamProvider, useTeam } from './TeamContext';
import { retrieveRegional, retrieveTeam, deleteTeamKeys, } from "../../../Contexts/TeamSecureCache";
import { onValue, off, ref, DataSnapshot, DatabaseReference, getDatabase } from '@firebase/database';

const matchDisplay = () => {
  //defining teamNumber and regional as state variables, because this allows their values to change.
  const [teamNumber, setTeamNumber] = useState<any>();
  const [regional, setRegional] = useState<any>();

  //pregame constants
  const [pregamePositionOne, setPregamePositionOne] = useState<string | null>(null);
  const [pregamePositionTwo, setPregamePositionTwo] = useState<string | null>(null);
  const [pregamePositionThree, setPregamePositionThree] = useState<string | null>(null);

  //auto constants
  // const [autoSpeakerPercent, setTeleopSpeakerPercent] = useState<string | null>(null);
  // const [autoSpeakerPercent, setTeleopSpeakerPercent] = useState<string | null>(null);

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

  //accessing data
  useEffect(() => {
    const database = getDatabase();

    // reference paths for each data
    // pregame paths
    const pregamePositionOneRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Amp');
    const pregamePositionTwoRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Middle');
    const pregamePositionThreeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Source');

    // auto paths

    // teleop paths
    const teleopAmpPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Amp')
    const teleopGroundPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Source Intake')
    const teleopSourcePercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Ground Intake')
    const teleopSpeakerPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Speaker')

    // endgame paths
    const endgameNothingPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Nothing')
    const endgameParkPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Park')
    const endgameSingleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Dingle')
    const endgameDoubleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Double')
    const endgameTripleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Triple')

    // Callback function to handle snapshot changes
    const handleSnapshot = (snapshot: DataSnapshot, setPosition: React.Dispatch<React.SetStateAction<string | null>>) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPosition(data); // Set the data to state
      } else {
        console.log("No data available");
      }
    };

    // Set up listeners for each data
    // pregame
    const pregamePositionOneListener = onValue(pregamePositionOneRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionOne));
    const pregamePositionTwoListener = onValue(pregamePositionTwoRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionTwo));
    const pregamePositionThreeListener = onValue(pregamePositionThreeRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionThree));

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


    // Clean up listeners on component unmount
    return () => {
      // pregame listeners
      off(pregamePositionOneRef, 'value', pregamePositionOneListener);
      off(pregamePositionTwoRef, 'value', pregamePositionTwoListener);
      off(pregamePositionThreeRef, 'value', pregamePositionThreeListener);

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
    };

  }, [teamNumber, regional]);


  useEffect(() => {
    //log for debugging
    console.log("useEffect called");

    //defining a new asynchronous function which will be used to retrieve and set both the team number and the regional. 
    async function getTeamInfo() {
      const result = await retrieveRegional();
      if (!result) {
        console.log("no regional found");
      } else {
        setRegional(result);
      }

      const num = await retrieveTeam();
      if (!num) {
        console.log("no team found");
      } else {
        setTeamNumber(num);
      }
    }
    //calling the function defined above
    getTeamInfo();

    //logging for debugging
    // console.log("(matchDisplay): " + "team: " + teamNumber + " regional " + regional)

  }, [teamNumber, regional])
  //I think having these as dependencies ensures that they will have a value before the rest of the code runs, but I'm not sure
  //added a line which displays stored info to ensure it is being retrieved

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.teamNumber}> {teamNumber} </Text>
        <Text style={styles.title}> Match Display! </Text>
        <Text>{regional} Regional!</Text>

        <Text style={styles.subtitle}>Pregame</Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <Text>Amp: {pregamePositionOne}%</Text>
            <Text>Middle: {pregamePositionTwo}%</Text>
            <Text>Source: {pregamePositionThree}%</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Auto</Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <Text>Amp: {pregamePositionOne}%</Text>

          </View>
        </View>

        <Text style={styles.subtitle}>Teleop</Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <Text>Amp: {teleopAmpPercent}%</Text>
            <Text>Speaker: {teleopSpeakerPercent}%</Text>
            <Text>Ground Intake: {teleopGroundIntakePercent}%</Text>
            <Text>Source Intake: {teleopSourceIntakePercent}%</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Endgame</Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <Text>Nothing: {endgameNothingPercent}%</Text>
            <Text>Park: {endgameParkPercent}%</Text>
            <Text>Single Climb: {endgameSingleClimbPercent}%</Text>
            <Text>Double Climb: {endgameDoubleClimbPercent}%</Text>
            <Text>Triple Climb: {endgameTripleClimbPercent}%</Text>
          </View>
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
    fontFamily: 'BPoppins',
    fontSize: 32,  //font size differs from regional page. Regional = 25. 
    // marginBottom: 110,
    // marginTop: 30, //adding top margin to move down the page. 
  },
  title: {
    fontFamily: 'BPoppins',
    fontSize: 32,  //font size differs from regional page. Regional = 25. 
    // marginBottom: 110,
    // marginTop: 30, //adding top margin to move down the page. 
  },
  border: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxWidth: '95%',
  },
  subtitle: {
    fontFamily: 'BPoppins',
    fontSize: 30,
    textAlign: 'center',
    color: 'rgba(0, 130, 190, 255)',
    marginTop: '10%',
  },
});

export default matchDisplay;

//storage:
/*
from retReg:    
  let result = await SecureStore.getItemAsync("regional");
  setRegional(result);
from retTea:
    let team = await SecureStore.getItemAsync("team")
    setTeam(team);
from uSS:
const [regional, setRegional] = React.useState<string | null>(null);
const [team, setTeam] = React.useState<string | null>(null);    
export regional, team

from MD:
  let teamNumber = team;
  let reg = regional;

          <Text>team: {teamNumber} regional: {reg}</Text>
        <Pressable onPress={deleteTeamKeys}>
          <Text>Delete stuff</Text>
        </Pressable>
  */