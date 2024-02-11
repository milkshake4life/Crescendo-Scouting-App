import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../backButton";
import React, { useContext, useState } from "react";
//contexts
import { TeamProvider, useTeam } from './TeamContext';
import { retrieveTeam } from "../../../Contexts/useStorageState";

//import { RegionalContext, TeamContext } from "../../../Contexts/teamRegContext";

//import { UseTeamContext, TeamContextProvider } from "../../../Contexts/team-content";


const matchDisplay = () => {
  //const { regional, teamNumber } = useTeam();
  //testing if context is being given.
  
  return (
      <View style={styles.container}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.title}> Match Display! </Text>
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