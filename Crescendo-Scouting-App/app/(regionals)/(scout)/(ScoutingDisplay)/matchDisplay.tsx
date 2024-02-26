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
  const [preGamePositionOne, setPreGamePositionOne] = useState<string | null>(null);
  const [preGamePositionTwo, setPreGamePositionTwo] = useState<string | null>(null);
  const [preGamePositionThree, setPreGamePositionThree] = useState<string | null>(null);
  const [teleopAmpPercent, setTeleopAmpPercent] = useState<string | null>(null);
  const [teleopGroundIntakePercent, setGroundIntakePercent] = useState<string | null>(null);
  const [teleopSourceIntakePercent, setSourceIntakePercent] = useState<string | null>(null);
  const [teleopSpeakerPercent, setTeleopSpeakerPercent] = useState<string | null>(null);

  //accessing Pregame data
  useEffect(() => {
    const database = getDatabase();

    // Reference paths for each pregame position
    const positionOneRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Amp');
    const positionTwoRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Middle');
    const positionThreeRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Pregame/Source');
    const ampPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Amp')
    const groundPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Source Intake')
    const sourcePercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Ground Intake')
    const speakerPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Teleop/Speaker')

    // Callback function to handle snapshot changes
    const handleSnapshot = (snapshot: DataSnapshot, setPosition: React.Dispatch<React.SetStateAction<string | null>>) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPosition(data); // Set the data to state
      } else {
        console.log("No data available");
      }
    };

    // Set up listeners for each pregame position
    const positionOneListener = onValue(positionOneRef, (snapshot) => handleSnapshot(snapshot, setPreGamePositionOne));
    const positionTwoListener = onValue(positionTwoRef, (snapshot) => handleSnapshot(snapshot, setPreGamePositionTwo));
    const positionThreeListener = onValue(positionThreeRef, (snapshot) => handleSnapshot(snapshot, setPreGamePositionThree));
    const ampPercentListener = onValue(ampPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopAmpPercent))
    const groundPercentListener = onValue(groundPercentRef, (snapshot) => handleSnapshot(snapshot, setGroundIntakePercent))
    const sourcePercentListener = onValue(sourcePercentRef, (snapshot) => handleSnapshot(snapshot, setSourceIntakePercent))
    const speakerPercentListener = onValue(speakerPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopSpeakerPercent))

    // Clean up listeners on component unmount
    return () => {
      off(positionOneRef, 'value', positionOneListener);
      off(positionTwoRef, 'value', positionTwoListener);
      off(positionThreeRef, 'value', positionThreeListener);
      off(ampPercentRef, 'value', ampPercentListener);
      off(groundPercentRef, 'value', groundPercentListener);
      off(sourcePercentRef, 'value', sourcePercentListener);
      off(speakerPercentRef, 'value', speakerPercentListener);
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
            <Text>Amp: {preGamePositionOne}%</Text>
            <Text>Middle: {preGamePositionTwo}%</Text>
            <Text>Source: {preGamePositionThree}%</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Auto</Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <Text>Amp: {preGamePositionOne}%</Text>
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