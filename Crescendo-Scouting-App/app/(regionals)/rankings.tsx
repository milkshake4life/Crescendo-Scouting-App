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





//an interface which handles query requests (in order to ensure that "leaderboard" requests are correctly formatted)
//this is great (for now). might need to be redone later for endgame/postgame stats (since those are weird). But 
//it helps a lot with readability. 
export interface DatabaseQuery {
  //assume regional is correctly formatted when passed in. Every other option forces correct formatting based on the directory in the db
  regional: string;

  //Game section is irrelevant. Firebase can only query by one statistic, so we only need the main ones. Auto has
  //too many data points, so if anything we can display auto scoring patterns as heatmaps underneath the team.
  //We'll default to teleop and figure out edge cases (climb, auto) later. 


  //4 stats to sort by: competition, amp, speaker, climb 
  stat: 'Speaker' | 'Amp' | 'TBA'

  //climb will be added later. 

}

export interface DataPoint {
  //team name
  key: string;
  //statistics
  speaker?: string;
  amp?: string;
  
  //rank
  rank?: string;
}

  ///Something we will have to consider later will be precompetition when no team data exists. There will have to be an alternate view displayed or some kind of alert when
  ///trying to query an empty database. 

//Ranks teams by a desired statistic and returns an array of teams in order. (order will need to be reveresed later) 
//This will likely be called in a page that is an offshoot of the regional page, so the array of data will then be translated to UI (probably via the spread (...) operator)
//Takes a DatabaseQuery object as well as a number, which is the minimum number of attempts needed to display a team. 
export const fetchQueriedTeams = (q: DatabaseQuery, /*floor: number*/): DataPoint[] => {
  //simply create a query using orderbychild and passing in the relevant path as part of our query. 
  //see https://firebase.google.com/docs/database/web/lists-of-data#sort_data for more. 
  //Also, flooring should be easy. Just use modifiers (i.e. startAt()) to only return items whose values are > the floor.

  //To update the leaderboard, we will just have the user reload the page. Using a listener might be resource intensive. 

  //the path to get to the data in the database
  let path: string = ""
  if(q.stat != 'TBA') {
    path = `Stats/Percentage/Teleop/${q.stat}`;
  } else {
    path = `Stats/Rank`
  }

  //creates a query which orders the teams under the regional/teams directory by their percentage accuracy. 
  const rankingQuery = query(ref(database, `${q.regional}/teams`), orderByChild(path));
  
  //queries simply create another reference. This ref can be treated the same way as the original database reference. 
  

  let results: DataPoint[] = [];

  const queryListener = onValue(rankingQuery, (snapshot) => {
    
    //access the value of the child via data.child(<path string>).val();
    //only display if the value of the desired stat is > floor
    snapshot.forEach((data) => {
      //speaker
      let speaker_fraction: string = "";
      let speaker_percentage: string = "";

      //amp
      let amp_fraction: string = "";
      let amp_percentage: string = "";

      //The path to get to our percent and fraction data in the database
      const pathToPercent: string = `Stats/Percentage/Teleop`;
      const pathToFraction: string = `Stats/Fraction/Teleop`
      const pathToTBARank: string = `Stats/Rank`
      
      //the team's rank
      let teamRank = data.child(pathToTBARank).val()


      //speaker data: 
      speaker_fraction = data.child(pathToFraction + "/Speaker").val() + "/" + data.child(pathToFraction + "/Speaker" + " Total").val();
      speaker_percentage = data.child(pathToPercent + "/Speaker").val() + "%";
      console.log(`team ${data.key}'s speaker stats obtained`);
      //testing log. 
      //console.log(`team ` + data.key + `\'s ${q.stat.toLowerCase()} accuracy was ${percentage}, at ${fraction}`)

      //amp data:
      amp_fraction = data.child(pathToFraction + "/Amp").val() + "/" + data.child(pathToFraction + "/Amp" + " Total").val();
      amp_percentage = data.child(pathToPercent + "/Amp").val() + "%";
      console.log(`team ${data.key}'s amp stats obtained`);

      //TODO:
      //climb data:


      //appending the team and its data to an array which will be returned by the function

      //why don't we just return every statistic and choose what to sort by? i.e.
      //sort by speaker but return everything (like "amp: % , Fraction")
      results.push({key: data.key, speaker: `${speaker_percentage} | ${speaker_fraction}`, amp: `${amp_percentage} | ${amp_fraction}`, rank: teamRank});
    })
    
    //fraction queries will need to display both data.child(.../made).val() and data.child(.../total).val() 
    //stat "total" keys are simply the stat name + " Total"
    //Queries will look like:
    //data.child(pathToChild).val() will give the "made"
    //data.child(pathToChild + " Total").val() will give the "total"

    //snapshot.key just returns teams (since that's the key under which we search).
  })
  //because of .push, the original results array is in reverse order when sorting by percent. Reversing it here gives us the actual order.
  //If space complexity is an issue, .toReversed can be swapped for .reverse()
  if(q.stat != 'TBA' ) { return results.toReversed() };
  return results;
}

//This function will be used to allow the user to search teams. 
//The search function still needs work. Here are some issues:
/*
  consecutive searches don't search the whole list. They just search the list generated by the previous search.
  this means that you can only go back to a more general pool of results by deleting the whole search and starting over.
  I think the function is not the issue, and that the issue is moreso the way the list is displayed. The "sorted"
  array state variable in rankings_page gets continually smaller as queries become more specific. Since it has no
  way to return to a larger size, this creates the above issue with the search. Look into this later. 
*/
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




