import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../../Components/backButton";
import React, { useContext, useEffect, useState } from "react";
//contexts
import { retrieveRegional, retrieveTeam, deleteTeamKeys, } from "../../../Contexts/TeamSecureCache";
import { DataSnapshot, getDatabase, off, onValue, ref } from "@firebase/database";

//an idea could be to phase this page out and display the whole matchDisplay view as a component underneath the team dropdown on the ranking page. 

const matchDisplay = () => {
  
  // defining teamNumber and regional as state variables, because this allows their values to change.
  const [teamNumber, setTeamNumber] = useState<any>();
  const [regional, setRegional] = useState<any>();
  const [titleRegional, setTitleRegional] = useState<any>();
  const [selectedAutoType, setSelectedAutoType] = useState<string>('Amp');

  //pregame constants
  const [pregamePositionOnePercent, setPregamePositionOnePercent] = useState<string | null>(null);
  const [pregamePositionTwoPercent, setPregamePositionTwoPercent] = useState<string | null>(null);
  const [pregamePositionThreePercent, setPregamePositionThreePercent] = useState<string | null>(null);

  const [pregamePositionOneFraction, setPregamePositionOneFraction] = useState<string | null>(null);
  const [pregamePositionTwoFraction, setPregamePositionTwoFraction] = useState<string | null>(null);
  const [pregamePositionThreeFraction, setPregamePositionThreeFraction] = useState<string | null>(null);

  const [pregameTotal, setPregameTotal] = useState<string | null>(null);

  //auto constants
  const [autoTaxiPercent, setAutoTaxiPercent] = useState<string | null>(null);
  const [autoM1Percent, setAutoM1Percent] = useState<string | null>(null);
  const [autoM2Percent, setAutoM2Percent] = useState<string | null>(null);
  const [autoM3Percent, setAutoM3Percent] = useState<string | null>(null);
  const [autoM4Percent, setAutoM4Percent] = useState<string | null>(null);
  const [autoM5Percent, setAutoM5Percent] = useState<string | null>(null);
  const [autoS1Percent, setAutoS1Percent] = useState<string | null>(null);
  const [autoS2Percent, setAutoS2Percent] = useState<string | null>(null);
  const [autoS3Percent, setAutoS3Percent] = useState<string | null>(null);
  const [autoRPercent, setAutoRPercent] = useState<string | null>(null);

  const [autoTaxiFraction, setAutoTaxiFraction] = useState<string | null>(null);
  const [autoM1Fraction, setAutoM1Fraction] = useState<string | null>(null);
  const [autoM2Fraction, setAutoM2Fraction] = useState<string | null>(null);
  const [autoM3Fraction, setAutoM3Fraction] = useState<string | null>(null);
  const [autoM4Fraction, setAutoM4Fraction] = useState<string | null>(null);
  const [autoM5Fraction, setAutoM5Fraction] = useState<string | null>(null);
  const [autoS1Fraction, setAutoS1Fraction] = useState<string | null>(null);
  const [autoS2Fraction, setAutoS2Fraction] = useState<string | null>(null);
  const [autoS3Fraction, setAutoS3Fraction] = useState<string | null>(null);
  const [autoRFraction, setAutoRFraction] = useState<string | null>(null);

  const [autoTotal, setAutoTotal] = useState<string | null>(null);


  //teleop constants
  const [teleopAmpPercent, setTeleopAmpPercent] = useState<string | null>(null);
  const [teleopGroundIntakePercent, setTeleopGroundIntakePercent] = useState<string | null>(null);
  const [teleopSourceIntakePercent, setTeleopSourceIntakePercent] = useState<string | null>(null);
  const [teleopSpeakerPercent, setTeleopSpeakerPercent] = useState<string | null>(null);

  const [teleopAmpFraction, setTeleopAmpFraction] = useState<string | null>(null);
  const [teleopGroundIntakeFraction, setTeleopGroundIntakeFraction] = useState<string | null>(null);
  const [teleopSourceIntakeFraction, setTeleopSourceIntakeFraction] = useState<string | null>(null);
  const [teleopSpeakerFraction, setTeleopSpeakerFraction] = useState<string | null>(null);

  const [teleopAmpTotal, setTeleopAmpTotal] = useState<string | null>(null);
  const [teleopIntakeTotal, setTeleopIntakeTotal] = useState<string | null>(null);
  const [teleopSpeakerTotal, setTeleopSpeakerTotal] = useState<string | null>(null);

  //endgame constants
  const [endgameNothingPercent, setEndgameNothingPercent] = useState<string | null>(null);
  const [endgameParkPercent, setEndgameParkPercent] = useState<string | null>(null);
  const [endgameSingleClimbPercent, setEndgameSingleClimbPercent] = useState<string | null>(null);
  const [endgameDoubleClimbPercent, setEndgameDoubleClimbPercent] = useState<string | null>(null);
  const [endgameTripleClimbPercent, setEndgameTripleClimbPercent] = useState<string | null>(null);

  const [endgameNothingFraction, setEndgameNothingFraction] = useState<string | null>(null);
  const [endgameParkFraction, setEndgameParkFraction] = useState<string | null>(null);
  const [endgameSingleClimbFraction, setEndgameSingleClimbFraction] = useState<string | null>(null);
  const [endgameDoubleClimbFraction, setEndgameDoubleClimbFraction] = useState<string | null>(null);
  const [endgameTripleClimbFraction, setEndgameTripleClimbFraction] = useState<string | null>(null);

  const [endgameNoTrapPercent, setEndgameNoTrapPercent] = useState<string | null>(null);
  const [endgameOneTrapPercent, setEndgameOneTrapPercent] = useState<string | null>(null);
  const [endgameTwoTrapPercent, setEndgameTwoTrapPercent] = useState<string | null>(null);
  const [endgameThreeTrapPercent, setEndgameThreeTrapPercent] = useState<string | null>(null);

  const [endgameNoTrapFraction, setEndgameNoTrapFraction] = useState<string | null>(null);
  const [endgameOneTrapFraction, setEndgameOneTrapFraction] = useState<string | null>(null);
  const [endgameTwoTrapFraction, setEndgameTwoTrapFraction] = useState<string | null>(null);
  const [endgameThreeTrapFraction, setEndgameThreeTrapFraction] = useState<string | null>(null);

  const [endgameTotal, setEndgameTotal] = useState<string | null>(null);

  //postgame constants
  const [postgameAverageDriverRating, setPostgameAverageDriverRating] = useState<string | null>(null);
  const [postgameDisabledPercent, setPostgameDisabledPercent] = useState<string | null>(null);
  const [postgameDefensePercent, setPostgameDefensePercent] = useState<string | null>(null);
  const [postgameDisabledFraction, setPostgameDisabledFraction] = useState<string | null>(null);
  const [postgameDefenseFraction, setPostgameDefenseFraction] = useState<string | null>(null);
  const [postgameTotal, setPostgameTotal] = useState<string | null>(null);


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

  //accessing data
  useEffect(() => {
    const database = getDatabase();

    // reference paths for each data
    // pregame paths
    const pregamePositionOnePercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Pregame/Amp');
    const pregamePositionTwoPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Pregame/Middle');
    const pregamePositionThreePercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Pregame/Source');

    const pregamePositionOneFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Pregame/Amp');
    const pregamePositionTwoFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Pregame/Middle');
    const pregamePositionThreeFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Pregame/Source');

    const pregameTotalRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Pregame/Total');

    // auto paths
    const autoTaxiPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/Taxi')
    const autoM1PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/M1') 
    const autoM2PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/M2') 
    const autoM3PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/M3') 
    const autoM4PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/M4') 
    const autoM5PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/M5') 
    const autoS1PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/S1') 
    const autoS2PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/S2') 
    const autoS3PercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/S3') 
    const autoRPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Auto/R') 

    const autoTaxiFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/Taxi')
    const autoM1FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/M1') 
    const autoM2FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/M2') 
    const autoM3FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/M3') 
    const autoM4FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/M4') 
    const autoM5FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/M5') 
    const autoS1FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/S1') 
    const autoS2FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/S2') 
    const autoS3FractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/S3') 
    const autoRFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/R') 

    const autoTotalRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Auto/Total') 

    // teleop paths
    const teleopAmpPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Teleop/Amp')
    const teleopGroundPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Teleop/Ground Intake')
    const teleopSourcePercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Teleop/Source Intake')
    const teleopSpeakerPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Teleop/Speaker')

    const teleopAmpFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Teleop/Amp')
    const teleopGroundFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Teleop/Ground Intake')
    const teleopSourceFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Teleop/Source Intake')
    const teleopSpeakerFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Teleop/Speaker')

    const teleopAmpTotalRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Teleop/Amp Total')
    const teleopIntakeTotalRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Teleop/Intake Total')
    const teleopSpeakerTotalRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Teleop/Speaker Total')

    // endgame paths
    const endgameNothingPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Climb/Nothing')
    const endgameParkPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Climb/Park')
    const endgameSingleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Climb/Single Climb')
    const endgameDoubleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Climb/Double Climb')
    const endgameTripleClimbPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Climb/Triple Climb')

    const endgameNothingFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Climb/Nothing')
    const endgameParkFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Climb/Park')
    const endgameSingleClimbFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Climb/Single Climb')
    const endgameDoubleClimbFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Climb/Double Climb')
    const endgameTripleClimbFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Climb/Triple Climb')

    const endgameNoTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Trap/0 Trap')
    const endgameOneTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Trap/1 Trap')
    const endgameTwoTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Trap/2 Trap')
    const endgameThreeTrapPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Endgame/Trap/3 Trap')

    const endgameNoTrapFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Trap/0 Trap')
    const endgameOneTrapFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Trap/1 Trap')
    const endgameTwoTrapFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Trap/2 Trap')
    const endgameThreeTrapFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Trap/3 Trap')

    const endgameTotalRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Endgame/Total')

    //postgame paths
    const postgameAverageDriverRatingRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Postgame/Driving Rating')
    const postgameDisabledPercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Postgame/Disabled')
    const postgameDefensePercentRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Percentage/Postgame/Defense')
    const postgameDisabledFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Postgame/Disabled')
    const postgameDefenseFractionRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Postgame/Defense')
    const postgameTotalRef = ref(database, regional + '/teams/' + teamNumber + '/Stats/Fraction/Postgame/Total')



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
    const pregamePositionOnePercentListener = onValue(pregamePositionOnePercentRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionOnePercent));
    const pregamePositionTwoPercentListener = onValue(pregamePositionTwoPercentRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionTwoPercent));
    const pregamePositionThreePercentListener = onValue(pregamePositionThreePercentRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionThreePercent));

    const pregamePositionOneFractionListener = onValue(pregamePositionOneFractionRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionOneFraction));
    const pregamePositionTwoFractionListener = onValue(pregamePositionTwoFractionRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionTwoFraction));
    const pregamePositionThreeFractionListener = onValue(pregamePositionThreeFractionRef, (snapshot) => handleSnapshot(snapshot, setPregamePositionThreeFraction));

    const pregameTotalListener = onValue(pregameTotalRef, (snapshot) => handleSnapshot(snapshot, setPregameTotal));

    //auto
    const autoTaxiPercentListener = onValue(autoTaxiPercentRef, (snapshot) => handleSnapshot(snapshot, setAutoTaxiPercent));
    const autoM1PercentListener = onValue(autoM1PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoM1Percent));
    const autoM2PercentListener = onValue(autoM2PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoM2Percent));
    const autoM3PercentListener = onValue(autoM3PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoM3Percent));
    const autoM4PercentListener = onValue(autoM4PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoM4Percent));
    const autoM5PercentListener = onValue(autoM5PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoM5Percent));
    const autoS1PercentListener = onValue(autoS1PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoS1Percent));
    const autoS2PercentListener = onValue(autoS2PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoS2Percent));
    const autoS3PercentListener = onValue(autoS3PercentRef, (snapshot) => handleSnapshot(snapshot, setAutoS3Percent));
    const autoRPercentListener = onValue(autoRPercentRef, (snapshot) => handleSnapshot(snapshot, setAutoRPercent));

    const autoTaxiFractionListener = onValue(autoTaxiFractionRef, (snapshot) => handleSnapshot(snapshot, setAutoTaxiFraction));
    const autoM1FractionListener = onValue(autoM1FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoM1Fraction));
    const autoM2FractionListener = onValue(autoM2FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoM2Fraction));
    const autoM3FractionListener = onValue(autoM3FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoM3Fraction));
    const autoM4FractionListener = onValue(autoM4FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoM4Fraction));
    const autoM5FractionListener = onValue(autoM5FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoM5Fraction));
    const autoS1FractionListener = onValue(autoS1FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoS1Fraction));
    const autoS2FractionListener = onValue(autoS2FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoS2Fraction));
    const autoS3FractionListener = onValue(autoS3FractionRef, (snapshot) => handleSnapshot(snapshot, setAutoS3Fraction));
    const autoRFractionListener = onValue(autoRFractionRef, (snapshot) => handleSnapshot(snapshot, setAutoRFraction));

    const autoTotalListener = onValue(autoTotalRef, (snapshot) => handleSnapshot(snapshot, setAutoTotal));

    // teleop
    const teleopAmpPercentListener = onValue(teleopAmpPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopAmpPercent))
    const teleopGroundPercentListener = onValue(teleopGroundPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopGroundIntakePercent))
    const teleopSourcePercentListener = onValue(teleopSourcePercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopSourceIntakePercent))
    const teleopSpeakerPercentListener = onValue(teleopSpeakerPercentRef, (snapshot) => handleSnapshot(snapshot, setTeleopSpeakerPercent))

    const teleopAmpFractionListener = onValue(teleopAmpFractionRef, (snapshot) => handleSnapshot(snapshot, setTeleopAmpFraction))
    const teleopGroundFractionListener = onValue(teleopGroundFractionRef, (snapshot) => handleSnapshot(snapshot, setTeleopGroundIntakeFraction))
    const teleopSourceFractionListener = onValue(teleopSourceFractionRef, (snapshot) => handleSnapshot(snapshot, setTeleopSourceIntakeFraction))
    const teleopSpeakerFractionListener = onValue(teleopSpeakerFractionRef, (snapshot) => handleSnapshot(snapshot, setTeleopSpeakerFraction))

    const teleopAmpTotalListener = onValue(teleopAmpTotalRef, (snapshot) => handleSnapshot(snapshot, setTeleopAmpTotal))
    const teleopIntakeTotalListener = onValue(teleopIntakeTotalRef, (snapshot) => handleSnapshot(snapshot, setTeleopIntakeTotal))
    const teleopSpeakerTotalListener = onValue(teleopSpeakerTotalRef, (snapshot) => handleSnapshot(snapshot, setTeleopSpeakerTotal))

    // endgame
    const endgameNothingPercentListener = onValue(endgameNothingPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameNothingPercent))
    const endgameParkPercentListener = onValue(endgameParkPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameParkPercent))
    const endgameSingleClimbPercentListener = onValue(endgameSingleClimbPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameSingleClimbPercent))
    const endgameDoubleClimbPercentListener = onValue(endgameDoubleClimbPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameDoubleClimbPercent))
    const endgameTripleClimbPercentListener = onValue(endgameTripleClimbPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameTripleClimbPercent))

    const endgameNothingFractionListener = onValue(endgameNothingFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameNothingFraction))
    const endgameParkFractionListener = onValue(endgameParkFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameParkFraction))
    const endgameSingleClimbFractionListener = onValue(endgameSingleClimbFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameSingleClimbFraction))
    const endgameDoubleClimbFractionListener = onValue(endgameDoubleClimbFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameDoubleClimbFraction))
    const endgameTripleClimbFractionListener = onValue(endgameTripleClimbFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameTripleClimbFraction))

    const endgameNoTrapPercentListener = onValue(endgameNoTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameNoTrapPercent))
    const endgameOneTrapPercentListener = onValue(endgameOneTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameOneTrapPercent))
    const endgameTwoTrapPercentListener = onValue(endgameTwoTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameTwoTrapPercent))
    const endgameThreeTrapPercentListener = onValue(endgameThreeTrapPercentRef, (snapshot) => handleSnapshot(snapshot, setEndgameThreeTrapPercent))

    const endgameNoTrapFractionListener = onValue(endgameNoTrapFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameNoTrapFraction))
    const endgameOneTrapFractionListener = onValue(endgameOneTrapFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameOneTrapFraction))
    const endgameTwoTrapFractionListener = onValue(endgameTwoTrapFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameTwoTrapFraction))
    const endgameThreeTrapFractionListener = onValue(endgameThreeTrapFractionRef, (snapshot) => handleSnapshot(snapshot, setEndgameThreeTrapFraction))

    const endgameTotalListener = onValue(endgameTotalRef, (snapshot) => handleSnapshot(snapshot, setEndgameTotal))
    //postgame
    const postgameAverageDriverRatingListener = onValue(postgameAverageDriverRatingRef, (snapshot) => handleSnapshot(snapshot, setPostgameAverageDriverRating))
    const postgameDisabledPercentListener = onValue(postgameDisabledPercentRef, (snapshot) => handleSnapshot(snapshot, setPostgameDisabledPercent))
    const postgameDefensePercentListener = onValue(postgameDefensePercentRef, (snapshot) => handleSnapshot(snapshot, setPostgameDefensePercent))
    const postgameDisabledFractionListener = onValue(postgameDisabledFractionRef, (snapshot) => handleSnapshot(snapshot, setPostgameDisabledFraction))
    const postgameDefenseFractionListener = onValue(postgameDefenseFractionRef, (snapshot) => handleSnapshot(snapshot, setPostgameDefenseFraction))
    const postgameTotalListener = onValue(postgameTotalRef, (snapshot) => handleSnapshot(snapshot, setPostgameTotal))


    // Clean up listeners on component unmount
    return () => {
      // pregame listeners
      off(pregamePositionOnePercentRef, 'value', pregamePositionOnePercentListener);
      off(pregamePositionTwoPercentRef, 'value', pregamePositionTwoPercentListener);
      off(pregamePositionThreePercentRef, 'value', pregamePositionThreePercentListener);
      off(pregamePositionOneFractionRef, 'value', pregamePositionOneFractionListener);
      off(pregamePositionTwoFractionRef, 'value', pregamePositionTwoFractionListener);
      off(pregamePositionThreeFractionRef, 'value', pregamePositionThreeFractionListener);
      off(pregameTotalRef, 'value', pregameTotalListener);

      //auto listeners
      off(autoTaxiPercentRef, 'value', autoTaxiPercentListener);
      off(autoM1PercentRef, 'value', autoM1PercentListener);
      off(autoM2PercentRef, 'value', autoM2PercentListener);
      off(autoM3PercentRef, 'value', autoM3PercentListener);
      off(autoM4PercentRef, 'value', autoM4PercentListener);
      off(autoM5PercentRef, 'value', autoM5PercentListener);
      off(autoS1PercentRef, 'value', autoS1PercentListener);
      off(autoS2PercentRef, 'value', autoS2PercentListener);
      off(autoS3PercentRef, 'value', autoS3PercentListener);
      off(autoRPercentRef, 'value', autoRPercentListener);

      off(autoTaxiFractionRef, 'value', autoTaxiFractionListener);
      off(autoM1FractionRef, 'value', autoM1FractionListener);
      off(autoM2FractionRef, 'value', autoM2FractionListener);
      off(autoM3FractionRef, 'value', autoM3FractionListener);
      off(autoM4FractionRef, 'value', autoM4FractionListener);
      off(autoM5FractionRef, 'value', autoM5FractionListener);
      off(autoS1FractionRef, 'value', autoS1FractionListener);
      off(autoS2FractionRef, 'value', autoS2FractionListener);
      off(autoS3FractionRef, 'value', autoS3FractionListener);
      off(autoRFractionRef, 'value', autoRFractionListener);

      off(autoTotalRef, 'value', autoTotalListener);

      //teleop listeners
      off(teleopAmpPercentRef, 'value', teleopAmpPercentListener);
      off(teleopGroundPercentRef, 'value', teleopGroundPercentListener);
      off(teleopSourcePercentRef, 'value', teleopSourcePercentListener);
      off(teleopSpeakerPercentRef, 'value', teleopSpeakerPercentListener);

      off(teleopAmpFractionRef, 'value', teleopAmpFractionListener);
      off(teleopGroundFractionRef, 'value', teleopGroundFractionListener);
      off(teleopSourceFractionRef, 'value', teleopSourceFractionListener);
      off(teleopSpeakerFractionRef, 'value', teleopSpeakerFractionListener);

      off(teleopAmpTotalRef, 'value', teleopAmpTotalListener);
      off(teleopIntakeTotalRef, 'value', teleopIntakeTotalListener);
      off(teleopSpeakerTotalRef, 'value', teleopSpeakerTotalListener);

      // endgame listeners
      off(endgameNothingPercentRef, 'value', endgameNothingPercentListener);
      off(endgameParkPercentRef, 'value', endgameParkPercentListener);
      off(endgameSingleClimbPercentRef, 'value', endgameSingleClimbPercentListener);
      off(endgameDoubleClimbPercentRef, 'value', endgameDoubleClimbPercentListener);
      off(endgameTripleClimbPercentRef, 'value', endgameTripleClimbPercentListener);

      off(endgameNothingFractionRef, 'value', endgameNothingFractionListener);
      off(endgameParkFractionRef, 'value', endgameParkFractionListener);
      off(endgameSingleClimbFractionRef, 'value', endgameSingleClimbFractionListener);
      off(endgameDoubleClimbFractionRef, 'value', endgameDoubleClimbFractionListener);
      off(endgameTripleClimbFractionRef, 'value', endgameTripleClimbFractionListener);

      off(endgameNoTrapPercentRef, 'value', endgameNoTrapPercentListener);
      off(endgameOneTrapPercentRef, 'value', endgameOneTrapPercentListener);
      off(endgameTwoTrapPercentRef, 'value', endgameTwoTrapPercentListener);
      off(endgameThreeTrapPercentRef, 'value', endgameThreeTrapPercentListener);

      off(endgameNoTrapFractionRef, 'value', endgameNoTrapFractionListener);
      off(endgameOneTrapFractionRef, 'value', endgameOneTrapFractionListener);
      off(endgameTwoTrapFractionRef, 'value', endgameTwoTrapFractionListener);
      off(endgameThreeTrapFractionRef, 'value', endgameThreeTrapFractionListener);

      off(endgameTotalRef, 'value', endgameTotalListener);

      //postgame listeners
      off(postgameAverageDriverRatingRef, 'value', postgameAverageDriverRatingListener);
      off(postgameDisabledPercentRef, 'value', postgameDisabledPercentListener);
      off(postgameDefensePercentRef, 'value', postgameDefensePercentListener);
      off(postgameDisabledFractionRef, 'value', postgameDisabledFractionListener);
      off(postgameDefenseFractionRef, 'value', postgameDefenseFractionListener);
      off(postgameTotalRef, 'value', postgameTotalListener);
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
  
  const InfoPercentFractionItem: React.FC<ItemPercentFractionProps> = ({ title, percent, fraction, total }) => (
    <View style={styles.infoItem}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.infoText}>{percent !== null ? `${percent}%` : 'N/A'}</Text>
      <Text style={styles.infoText}>{percent !== null ? `${fraction} / ${total}` : ''}</Text>
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

  type ItemPercentFractionProps = {
    title: string;
    percent: string;
    fraction: string;
    total: string;
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
          <InfoPercentFractionItem title="Amp:" percent={pregamePositionOnePercent} fraction = {pregamePositionOneFraction} total = {pregameTotal}/>
          <InfoPercentFractionItem title="Middle: " percent={pregamePositionTwoPercent} fraction = {pregamePositionTwoFraction} total = {pregameTotal}/>
          <InfoPercentFractionItem title="Source: " percent={pregamePositionThreePercent} fraction = {pregamePositionThreeFraction} total = {pregameTotal}/>
        </View>

        <Text style={styles.itemTitle}>Autonomous</Text>
        <View style={styles.border}>
          <InfoPercentFractionItem title="Taxi:" percent={autoTaxiPercent} fraction = {autoTaxiFraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`M1:`} percent={autoM1Percent} fraction = {autoM1Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`M2:`} percent={autoM2Percent} fraction = {autoM2Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`M3:`} percent={autoM3Percent} fraction = {autoM3Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`M4:`} percent={autoM4Percent} fraction = {autoM4Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`M5:`} percent={autoM5Percent} fraction = {autoM5Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`S1:`} percent={autoS1Percent} fraction = {autoS1Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`S2:`} percent={autoS2Percent} fraction = {autoS2Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`S3:`} percent={autoS3Percent} fraction = {autoS3Fraction} total = {autoTotal}/>
          <InfoPercentFractionItem title={`R:`}  percent={autoRPercent} fraction = {autoRFraction} total = {autoTotal}/>
        </View>

        <Text style={styles.itemTitle}>Teleoperation</Text>
        <View style={styles.border}>
          <InfoPercentFractionItem title="Amp Accuracy:" percent = {teleopAmpPercent} fraction = {teleopAmpFraction} total = {teleopAmpTotal}/>
          <InfoPercentFractionItem title="Speaker Accuracy: " percent = {teleopSpeakerPercent} fraction = {teleopSpeakerFraction} total = {teleopSpeakerTotal}/>
          <InfoPercentFractionItem title="Source Intake: " percent = {teleopSourceIntakePercent} fraction = {teleopSourceIntakeFraction} total = {teleopIntakeTotal}/>
          <InfoPercentFractionItem title="Ground Intake: " percent = {teleopGroundIntakePercent} fraction = {teleopGroundIntakeFraction} total = {teleopIntakeTotal}/>
        </View>

        <Text style={styles.itemTitle}>Trap</Text>
        <View style={styles.border}>
          <InfoPercentFractionItem title="0 Trap:" percent = {endgameNoTrapPercent} fraction = {endgameNoTrapFraction} total = {endgameTotal}/>
          <InfoPercentFractionItem title="1 Trap:" percent = {endgameOneTrapPercent} fraction = {endgameOneTrapFraction} total = {endgameTotal}/>
          <InfoPercentFractionItem title="2 Trap:" percent = {endgameTwoTrapPercent} fraction = {endgameTwoTrapFraction} total = {endgameTotal}/>
          <InfoPercentFractionItem title="3 Trap:" percent = {endgameThreeTrapPercent} fraction = {endgameThreeTrapFraction} total = {endgameTotal}/>
        </View>

        <Text style={styles.itemTitle}>Climb</Text>
        <View style={styles.border}>
          <InfoPercentFractionItem title="Nothing:" percent = {endgameNothingPercent} fraction = {endgameNothingFraction} total = {endgameTotal}/>
          <InfoPercentFractionItem title="Park Rate: " percent={endgameParkPercent} fraction = {endgameParkFraction} total = {endgameTotal}/>
          <InfoPercentFractionItem title="Single Climb Rate: " percent={endgameSingleClimbPercent} fraction = {endgameSingleClimbFraction} total = {endgameTotal}/>
          <InfoPercentFractionItem title="Double Climb Rate: " percent={endgameDoubleClimbPercent} fraction = {endgameDoubleClimbFraction} total = {endgameTotal}/>
          <InfoPercentFractionItem title="Triple Climb Rate: " percent={endgameTripleClimbPercent} fraction = {endgameTripleClimbFraction} total = {endgameTotal}/>
        </View>

        <Text style={styles.itemTitle}>Overall</Text>
        <View style={styles.border}>
          <InfoItem title="Driver Rating:" info={postgameAverageDriverRating} />
          <InfoPercentFractionItem title="Disabled: " percent={postgameDisabledPercent} fraction = {postgameDisabledFraction} total = {postgameTotal}/>
          <InfoPercentFractionItem title="Defense: " percent={postgameDefensePercent} fraction = {postgameDefenseFraction} total = {postgameTotal}/>
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
    marginBottom: '2%',
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
    fontSize: 17,
    marginLeft: 10,
    fontFamily: 'BPoppins',
    color: '#737373',
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
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