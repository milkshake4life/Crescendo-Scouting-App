import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../backButton';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { DataSnapshot, get, getDatabase, onValue, ref, query, orderByValue, orderByChild, Database } from "firebase/database";
//secureStore stuff
import { deleteTeamKeys, retrieveRegional, retrieveTeam, storeSecureTeam, } from "../Contexts/TeamSecureCache";


// const { regional } = useGlobalSearchParams<{ regional: string }>();
// let modifiedRegional = regional
// if (regional === 'Orange County') {
//   modifiedRegional = 'Orange-County'
// }
// else if (regional === 'Port Hueneme') {
//   modifiedRegional = 'Port-Hueneme'
// }

//an interface which handles query requests (in order to ensure that "leaderboard" requests are correctly formatted)
//this is great (for now). might need to be redone later for endgame/postgame stats (since those are weird). But 
//it helps a lot with readability. 
export interface DatabaseQuery {
  //assume regional is correctly formatted when passed in. Every other option forces correct formatting based on the directory in the db
  regional: string;
  statType: 'Percentage' | 'Fraction';
  //TODO: ask ethan about what each of these represent. Postgame and endgame have different stat structures, so i'll handle 
  //them later. 
  //only handling teleop for now. Will add more options later.
  gameSection: 'Teleop' | 'Auto' | 'Endgame' | 'Postgame' | 'Pregame'; 
  //only looking at these two. will accomodate more at a later stage. Odd data points (i.e. driver rating) will be 
  //more complicated to add. 
  stat: 'Amp' | 'Speaker';
}

//function will probably take regional, stat type (percent or fraction), and filter (speaker, amp, autos, etc).
export const fetchQueriedTeams = (q: DatabaseQuery) => {
  //simply create a query using orderbychild and passing in the relevant path as part of our query. 
  //see https://firebase.google.com/docs/database/web/lists-of-data#sort_data for more. 
  //Also, flooring should be easy. Just use modifiers (i.e. startAt()) to only return items whose values are > the floor.

  //To update the leaderboard, we will just have the user reload the page. Using a listener might be resource intensive. 
  
  //path variable built off of q parameter data. 
  //assumes q has the correctly formatted regional passed in.
  const pathToChild: string = `Stats/${q.statType}/${q.gameSection}/${q.stat}`;
  
  const rankingQuery = query(ref(database, `${q.regional}/teams`), orderByChild(pathToChild));
  
  //queries simply create another reference. This ref can be treated the same way as the original database reference. 
  
  const queryListener = onValue(rankingQuery, (snapshot) => {
    //this prints the teams correctly ranked from least to greatest accuracy
    //data.val doesn't return a number, probably because it points to a large amount of data (all of the data
    //under the team directory). Next step is to find out how to access the numerical value of the data.
    
    //access the value of the child via data.child(<path string>).val();
    snapshot.forEach((data) => {
      console.log('team ' + data.key + '\'s % speaker accuracy is ' + data.child(pathToChild).val());
    })

    //for future use, key and child will probably be stored as pairs in an array, and the function will return the
    //array. (most likely arr[] = [...data])
    //The returned array will probably be displayed after a spread using a foreach or something similar
    //i.e. forEach data in [...dataArray] display data

    //going to work on more customizable queries. 
    
    //fraction queries will need to display both data.child(.../made).val() and data.child(.../total).val() 

    //trying snapshot.key
    //snapshot.key just returns teams (since that's the key under which we search).


  })
  
}