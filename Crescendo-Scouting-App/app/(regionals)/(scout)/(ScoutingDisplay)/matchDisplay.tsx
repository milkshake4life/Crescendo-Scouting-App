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
        if(!result)
        {
          console.log("no regional found")
        }
        else 
        {
          const reg = result;
          //setting the value of our state variable regional to the result of retrieveRegional
          setRegional(reg);
        }
      })
      
      //this is the same function as the above but with team instead of regional
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

    //calling the function defined above
    getTeamInfo();
    
    //logging for debugging
    console.log("(matchDisplay): " + "team: " + teamNumber + " regional " + regional)

  }, [teamNumber, regional]) 
  //I think having these as dependencies ensures that they will have a value before the rest of the code runs, but I'm not sure

  //added a line which displays stored info to ensure it is being retrieved
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