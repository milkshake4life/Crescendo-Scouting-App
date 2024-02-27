import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, ScrollView  } from "react-native";
import BackButton from "../../../backButton";
import React, { useContext, useEffect, useState } from "react";
//contexts
import { TeamProvider, useTeam } from './TeamContext';
import { retrieveRegional, retrieveTeam, deleteTeamKeys, } from "../../../Contexts/TeamSecureCache";



const matchDisplay = () => {
  //defining teamNumber and regional as state variables, because this allows their values to change.
  const [teamNumber, setTeamNumber] = useState<any>();
  const [regional, setRegional] = useState<any>();

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
      <Text style={styles.heading}> Match Display! </Text>
      <Text style={styles.subtitle}>{regional} Regional!</Text>
      <Text style={styles.itemTitle}>Pregame</Text>
      <View style={styles.border}>
          <InfoItem title="Amp:" info="filler" />
          <InfoItem title="Middle: " info="filler" />
          <InfoItem title="Source: " info="filler" />
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
          <InfoItem title="Amp Accuracy:" info="filler" />
          <InfoItem title="Speaker Accuracy: " info="filler" />
      </View>

      <Text style={styles.itemTitle}>Endgame</Text>
      <View style={styles.border}>
          <InfoItem title="Climb Rate:" info="filler" />
          <InfoItem title="Harmony Rate: " info="filler" />
          <InfoItem title="Triple Climb Rate: " info="filler" />
          <InfoItem title="Park Rate: " info="filler" />
      </View>
      
      <Text style={styles.itemTitle}>Overall</Text>
      <View style={styles.border}>
          <InfoItem title="Driver Rating:" info="filler" />
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