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

  //postgame constants
  const [postgameAverageDriverRating, setPostgameAverageDriverRating] = useState<string | null>(null);

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
    const endgameSingleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Single Climb')
    const endgameDoubleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Double Climb')
    const endgameTripleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Endgame/Climb/Triple Climb')

    //postgame paths
    const postgameAverageDriverRatingRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Postgame/DrivingRating')

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

    //postgame
    const postgameAverageDriverRatingListener = onValue(postgameAverageDriverRatingRef, (snapshot) => handleSnapshot(snapshot, setPostgameAverageDriverRating))

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

      //postgame listeners
      off(postgameAverageDriverRatingRef, 'value', postgameAverageDriverRatingListener);
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
  // defining teamNumber and regional as state variables, because this allows their values to change.

  useEffect(() => {
    //log for debugging
    console.log("useEffect called");

    //defining a new asynchronous function which will be used to retrieve and set both the team number and the regional. 
    async function getTeamInfo() {

      //.then is used to ensure that retrieveRegional has returned a value before attempting to set the value of regional to that value
      //Basically, retrieveRegional and retrieveTeam return Promises of type string, but not actual strings. By using .then (alternatively you can use await), we 
      //know for certain that the promise has been fulfilled, meaning we now have turned the Promise<string> into a string, so we can set our state variables to that string.
      retrieveRegional().then((result: string | null) => {
        if (!result) {
          console.log("no regional found")
        }
        else {
          const reg = result;
          //setting the value of our state variable regional to the result of retrieveRegional
          setRegional(reg);
        }
      })

      //this is the same function as the above but with team instead of regional
      retrieveTeam().then((result: string | null) => {
        if (!result) {
          console.log("no team found")
        }
        else {
          const num = result;
          setTeamNumber(num);
        }
      })


    }

    //calling the function defined above
    getTeamInfo();

    //logging for debugging
    console.log("(matchDisplay): " + "team: " + teamNumber + " regional " + regional)

  }, [teamNumber, regional])
  //I think having these as dependencies ensures that they will have a value before the rest of the code runs, but I'm not sure

  //added a line which displays stored info to ensure it is being retrieved

  const InfoItem: React.FC<ItemProps> = ({ title, info }) => (
    <View style={styles.infoItem}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.infoText}>{info !== null ? `${info}%` : 'N/A'}</Text>

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
        <Text style={styles.subtitle}>{regional} Regional!</Text>
        <Text style={styles.itemTitle}>Pregame</Text>
        <View style={styles.border}>
          <InfoItem title="Amp:" info={pregamePositionOne}/>
          <InfoItem title="Middle: " info={pregamePositionTwo} />
          <InfoItem title="Source: " info={pregamePositionThree}/>
        </View>

        <Text style={styles.itemTitle}>Autonomous</Text>
        <View style={styles.border}>
          <InfoItem title="Taxi:" info="filler" />
          <InfoItem title="Amp: " info="filler" />
          <InfoItem title="Speaker: " info="filler" />
        </View>
        <View style={styles.autoBorder}>
          <Text style={styles.infoText}>filler</Text>
        </View>

        <Text style={styles.itemTitle}>Teleoperation</Text>
        <View style={styles.border}>
          <InfoItem title="Amp Accuracy:" info={teleopAmpPercent} />
          <InfoItem title="Speaker Accuracy: " info={teleopSpeakerPercent} />
          <InfoItem title="Source Intake: " info={teleopSourceIntakePercent} />
          <InfoItem title="Ground Intake: " info={teleopGroundIntakePercent} />
        </View>

        <Text style={styles.itemTitle}>Endgame</Text>
        <View style={styles.border}>
          <InfoItem title="Nothing:" info={endgameNothingPercent} />
          <InfoItem title="Park Rate: " info={endgameParkPercent} />
          <InfoItem title="Single Climb Rate: " info={endgameSingleClimbPercent} />
          <InfoItem title="Double Climb Rate: " info={endgameDoubleClimbPercent} />
          <InfoItem title="Triple Climb Rate: " info={endgameTripleClimbPercent} />
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