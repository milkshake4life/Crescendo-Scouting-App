import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../Components/backButton';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { DataSnapshot, get, getDatabase, onValue, ref, query, orderByValue, orderByChild, Database, startAt, set } from "firebase/database";
//secureStore stuff
import { deleteTeamKeys, retrieveRegional, retrieveTeam, storeSecureTeam, } from "../Contexts/TeamSecureCache";



//This file stores every function that has something to do with the team ranking page. 

//3 stats to sort by:
//competition, amp, speaker, climb
//+
//a search bar function that lets you search by team name. 



//an interface which handles query requests (in order to ensure that "leaderboard" requests are correctly formatted)
//this is great (for now). might need to be redone later for endgame/postgame stats (since those are weird). But 
//it helps a lot with readability. 
export interface DatabaseQuery {
  //assume regional is correctly formatted when passed in. Every other option forces correct formatting based on the directory in the db
  regional: string;
  //statType: 'Percentage' | 'Fraction';
  //TODO: ask ethan about what each of these represent. Postgame and endgame have different stat structures, so i'll handle 
  //them later. 
  //gameSection: 'Teleop' | 'Auto' | 'Endgame' | 'Postgame' | 'Pregame'; 

  //Game section is irrelevant. Firebase can only query by one statistic, so we only need the main ones. Auto has
  //too many data points, so if anything we can display auto scoring patterns as heatmaps underneath the team.
  //The only section we care about is Teleop. Default to that.

  //The only stats we care about. 
  stat: 'Speaker' | 'Amp'

}

export interface DataPoint {
  //team name
  key: string;
  //teleop
  fraction: string;
  percentage: string;
  


}

  ///Something we will have to consider later will be precompetition when no team data exists. There will have to be an alternate view displayed or some kind of alert when
  ///trying to query an empty database. 

//Ranks teams by a desired statistic from the teleop section and returns an array of teams in order. 
//This will likely be called in a page that is an offshoot of the regional page, so the array of data will then be translated to UI (probably via the spread (...) operator)
//Takes a databasequery object as well as a number, which is the minimum number of attempts needed to display a team. 
export const fetchQueriedTeams = (q: DatabaseQuery, /*floor: number*/): DataPoint[] => {
  //simply create a query using orderbychild and passing in the relevant path as part of our query. 
  //see https://firebase.google.com/docs/database/web/lists-of-data#sort_data for more. 
  //Also, flooring should be easy. Just use modifiers (i.e. startAt()) to only return items whose values are > the floor.

  //To update the leaderboard, we will just have the user reload the page. Using a listener might be resource intensive. 
  
  //path variable built off of q parameter data. 
  //assumes q has the correctly formatted regional passed in.

  //we actually want to sort by percentage made, but display the total makeup of that percentage. 
  //const pathToChild: string = `Stats/${q.statType}/Teleop/${q.stat}`;
  //the path to get to the percentage data in the database
  const pathToPercent: string = `Stats/Percentage/Teleop/${q.stat}`;
  
  const rankingQuery = query(ref(database, `${q.regional}/teams`), orderByChild(pathToPercent));
  
  //queries simply create another reference. This ref can be treated the same way as the original database reference. 
  
  let results: DataPoint[] = [];

  const queryListener = onValue(rankingQuery, (snapshot) => {
    
    //access the value of the child via data.child(<path string>).val();
    //only display if the value of the desired stat is > floor
    snapshot.forEach((data) => {
      let fraction: string = "";
      let percentage: string = "";
      //The path to get to our fraction data in the database
      const pathToFraction: string = `Stats/Fraction/Teleop/${q.stat}`

      //might need to change this to sort by percentage and return both percent and fraction rather than having
      //two different queries
      
      //abandoning floor idea. 
      // if(data.child(pathToFraction + " Total").val() > floor) {
        fraction = data.child(pathToFraction).val() + "/" + data.child(pathToFraction + " Total").val() 
        percentage = data.child(pathToPercent).val() + "%"
        console.log(`team ` + data.key + `\'s ${q.stat.toLowerCase()} accuracy was ${percentage}, at ${fraction}`)
        //   //stat "total" keys are simply the stat name + " Total"
        // if(q.statType == 'Fraction')
        // {

        //   //Queries will look like:
        //   //data.child(pathToChild).val() will give the "made"
        //   //data.child(pathToChild + " Total").val() will give the "total"
        //   fraction = data.child(modifiedPathToChild).val() + "/" + data.child(modifiedPathToChild + " Total").val();

        //   console.log(`team ` + data.key + `\'s ${q.stat.toLowerCase()} accuracy as a fraction is ` + fraction)
        // }
        // else//stats = percentage
        // {
        //   fraction = data.child(pathToChild).val();
        //   console.log(`team ` + data.key + `\'s % ${q.stat.toLowerCase()} accuracy is ` + percentage + '%');
        // }
        
      // }
      //appending the team and its data to an array which will be returned by the function
      results.push({key: data.key, fraction: fraction, percentage: percentage});
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
  return results;
}


//This function will be used to allow the user to search teams. 
export const searchTeams = (teamList: DataPoint[], teamString: string): DataPoint[] => {
  let results: DataPoint[] = []

  for(let i = 0; i < teamList.length; i++) {
    if(teamList[i].key.includes(teamString)) {
      results.push(teamList[i])
    }
  }

  return results;

}

//used for processing get request response data. 
interface teamTable {
  teamkey: string, 
  rank: number,
}

//This function will be called upon form submission. 
//update database with team information (to be called async upon form completion, since a form is submitted when a match is finished)
//takes in the regional, which is needed to format the event key, and also for use in the firebase path.  
export const updateTBAranking = async (regional: string): Promise<void> => {
  //function to format event key
  //event key format:
  //<year><state abbreviation><first letter of city name><second first letter of city name> or <first letter><second letter> for one word names
  //i.e.: 2024caoc for orange county

  function getEventKey(regional: string): string {
    let eventKey: string = "";
    let splitRegional: string[] = []

    eventKey += "2024" //since this was the 2024 season
    eventKey += "ca" //since we are in california

    //checks if regional name is two words.
    if(regional.includes('-')) {
      //splits the modified regional string parameter we format in the [regional] page into its parts
      splitRegional = regional.split('-');
      eventKey += splitRegional[0].charAt(0).toLowerCase(); //first word first letter
      eventKey += splitRegional[1].charAt(0).toLowerCase(); //second word first letter  
    }
    else {
      eventKey += regional.substring(0,2).toLowerCase();
    }

    return eventKey;
  }
  
  let eventKey = getEventKey(regional);

  var options = {
    method: 'GET',
    headers: {
      //this key is one I registered. It can be exchanged for another read key later down the line. 
      'X-TBA-Auth-Key': 'BAotEAOcEB2jKMLW30PaVeZwwDyFKoJplSMwI3gK9QeRBjJjnMfNF9K8ICWkwtKT'
    }
  }

  //fetches the rankings.
  //Need to include TBAkey under this header: X-TBA-Auth-Key for request to work. Will do that tomorrow. 
  console.log(`https://www.thebluealliance.com/api/v3/event/${eventKey}/rankings`);

  try {
    const response = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/rankings`, options);
    console.log('Response status: ', response.status);

    if(!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error: status: ${response.status}`, errorText);
      return;
    }

    const json = await response.json();

    json.rankings.forEach((ranking: any) => {
      //We can get the teamkey to match the db directory by taking the substring after index 3, which removes "frc" from the string.
      let teamvar: teamTable = {teamkey: ranking.team_key.substring(3), rank: ranking.rank};
      console.log(`team_key: ${teamvar.teamkey}, rank: ${teamvar.rank}`);
       
      let path: string = `${regional}/teams/${teamvar.teamkey}/Stats/Rank`;

      //creates/updates the team's rank in the db. 
      set(ref(database, path), teamvar.rank);
      //teamlist.push(teamvar);
    })

  } catch (error) {
    console.error('Fetch error: ' + error);
  }
  //the json returned by the request is already sorted by rank. Maybe storing ranks will be unnecessary?
  //I still think it will be better to put the ranks under the team directory in firebase.
  //That way we don't need to make an api request every time we want to access the rankings. 
}


//To add an authorization header:
/*
fetch('API_ENDPOINT', options)  
      .then(function(res) {
        return res.json();
       })
      .then(function(resJson) {
        return resJson;
       })
*/
//Where options is an object formatted like so:
/*
 var options = {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'api.producthunt.com'
      },
      body: JSON.stringify({
        'client_id': '(API KEY)',
        'client_secret': '(API SECRET)',
        'grant_type': 'client_credentials'
      })
    }
*/
//except since we are making a get request, the method will be GET, we won't have a body, and we'll have different headers. Namely  X-TBA-Auth-Key






//testing function (from: https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs):
//nvm i'll just print it. 
