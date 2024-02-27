import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, ScrollView  } from "react-native";
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

  const InfoItem: React.FC<ItemProps> = ({ title, info }) => (
    <View style={styles.infoItem}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.infoText}>{info}</Text>
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
    // fontFamily: 'BPoppins',
    fontSize: 20,  //font size differs from regional page. Regional = 25. 
    marginBottom: -10,
    marginTop: 5, //adding top margin to move down the page.
    color: '#737373',
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
    fontSize: 30,
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
});

export default matchDisplay;