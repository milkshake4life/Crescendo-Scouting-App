import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../Components/backButton';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { DataSnapshot, get, getDatabase, onValue, ref, query, orderByValue, orderByChild, Database, startAt } from "firebase/database";
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

//update database with team information (to be called async upon form completion, since a form is submitted when a match is finished)
//takes in an event key, which is necessary for using the TBA api and can be hardcoded as part of entering a regional's page
//event key format:
//<year><state abbreviation><first letter of city name><second first letter of city name>
//i.e.: 2024caoc for orange county
export const updateTBAranking = async (eventKey: string): Promise<void> => {
  const [data, setData] = useState(null)


  //fetches the rankings.
  //Need to include TBAkey under this header: X-TBA-Auth-Key for request to work. Will do that tomorrow. 
  fetch(`https://www.thebluealliance.com/apidocs/v3/event/${eventKey}/rankings`)
    //maps the response to json. 
    .then(response => response.json())
    //maps the json into keys
    .then(json => {
      // for(let i = 0; i < json.length; i++) {
      //   json[i]
      // } 
      try{
        console.log(json);
      }
      catch (err) {
        console.error(err)
      }
    })
    //error handling
    .catch(error => console.error(error));
  
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
