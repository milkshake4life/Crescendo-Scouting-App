import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../backButton';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { DataSnapshot, get, getDatabase, onValue, ref, orderByValue, orderByChild } from "firebase/database";
//secureStore stuff
import { deleteTeamKeys, retrieveRegional, retrieveTeam, storeSecureTeam, } from "../Contexts/TeamSecureCache";


const { regional } = useGlobalSearchParams<{ regional: string }>();
let modifiedRegional = regional
if (regional === 'Orange County') {
  modifiedRegional = 'Orange-County'
}
else if (regional === 'Port Hueneme') {
  modifiedRegional = 'Port-Hueneme'
}

const fetchQueriedTeams = (query: string) => {
    const scoresRef = ref(database, modifiedRegional + '/teams'); // Adjusted path

    scoresRef.orderByChild('Stats/Percentage/' + query).on('child_added', (snapshot) => {
        console.log(snapshot.key + ' scored ' + snapshot.val()./*query*/ + ' from the ' + query);
    })
    



    
}