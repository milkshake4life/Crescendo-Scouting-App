import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../backButton";
import React, { useContext, useEffect, useState } from "react";
//contexts
import { TeamProvider, useTeam } from './TeamContext';
import { retrieveRegional, retrieveTeam, deleteTeamKeys, } from "../../../Contexts/TeamSecureCache";

//import { RegionalContext, TeamContext } from "../../../Contexts/teamRegContext";

//import { UseTeamContext, TeamContextProvider } from "../../../Contexts/team-content";

//trying state in useStorageState to store these two.
// let regional: string | null = '';
// let teamNumber: string | null = '';

//function for data retrieval
// const retrieveData = async () => {
//   regional = await retrieveRegional();
//   console.log("regional (matchDisplay): " + regional)
//   teamNumber = await retrieveTeam();
//   console.log("team (matchDisplay): " + teamNumber)
// }


// const asyncGetRegional = async () => {
//   const reg = await retrieveRegional();
//   setRegional(reg);
//   console.log(`asyncGet ${reg} successful`)
//   //return reg;
// }

// //async done two ways: above using await, below using .then
// const asyncGetTeam = async () => {
//   let team: string | null = "";
//   retrieveTeam().then((result: string | null) => setTeamNumber(result))
//   console.log(`asyncGet ${team} successful`)
//   //return team;
// }

const matchDisplay = () => {
  //const { regional, teamNumber } = useTeam();
  //testing if context is being given.
  // useEffect(() => {
  //   retrieveData();
    
  // })

  //team and regional are imported from storage
  // let teamNumber = team;
  // let reg = regional;
  //use state to store these guys, then set state to the retrieval (so that it can be async)
  const [teamNumber, setTeamNumber] = useState<any>();
  const [regional, setRegional] = useState<any>();

  useEffect(() => {
    console.log("useEffect called");
    // asyncGetRegional();
    // asyncGetTeam();

    //simply retrieving the data in useEffect
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
    console.log("(matchDisplay): " + "team: " + teamNumber + " regional " + regional)
  }, [teamNumber, regional])



  //the bottom regional is displayed before the actual regional data is populated. Maybe
  //adding a button for testing. 
  return (
      <View style={styles.container}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.title}> Match Display! </Text>
        <Text>team: {teamNumber} regional: {regional}</Text>
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
    fontSize: 32,  //font size differs from regional page. Regional = 25. 
    marginBottom: 110,
    marginTop: 30, //adding top margin to move down the page. 
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