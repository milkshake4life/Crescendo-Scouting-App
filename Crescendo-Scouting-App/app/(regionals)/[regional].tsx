import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../backButton';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";
//secureStore stuff
import { retrieveRegional, retrieveTeam, storeSecureTeam, } from "../Contexts/useStorageState";

//importing the context providers
//trying new solution
//import { UseTeamContext, TeamContextProvider } from "../Contexts/team-content";

//new solution:
//import { TeamContext, RegionalContext } from "../Contexts/teamRegContext";


interface DropdownItem {
  label: string;
  value: string;
}

const RegionalPage = () => {
  const {regional} = useGlobalSearchParams<{ regional:string } > ();
  let modifiedRegional = regional
  if(regional === 'Orange County'){
    modifiedRegional = 'Orange-County'
  }

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownData, setDropdownData] = useState<DropdownItem[]>([]);

  const fetchTeams = () => {
    const teamsRef = ref(database, modifiedRegional + '/teams'); // Adjusted path
    onValue(teamsRef, (snapshot) => {
      const teams = snapshot.val();
      if (teams) {
        const processedData = Object.keys(teams).map((teamNumber) => {
          return {
            label: teamNumber,  // Using the team number as the label
            value: teamNumber,  // Also using the team number as the value
          };
        });
        setDropdownData(processedData);
      } else {
        setDropdownData([]);
      }
    });
  };
  
  useEffect(() => {
    fetchTeams();
  }, []);

  //adding a teamNum string so that we can store team number later. 
  let teamNum: string = "";

    return (
        <View style={styles.container}>
          <BackButton buttonName='Home Page'/>
          <Text style={styles.title} >{regional} regional! </Text>

          <Text style={styles.subtitle}>Select a Team</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropdownData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedValue(item.value);  // Update the state to the new value
              setIsFocus(false);  // Assuming you want to unfocus the dropdown after selection
            }}
          />

          <Pressable
            style={styles.buttonOne}
            onPress={() => {
              if (selectedValue) {
                router.push(`/(scout)/scout?regional=${regional}&teamNumber=${selectedValue}`);
                console.log(selectedValue)
              } else {
                // Handle case where no team is selected
                alert('Please select a team number.');
              }
            }}
          >
            <Text style={styles.buttonOneText}>Scouting</Text>
          </Pressable>
          <Pressable
            style={styles.buttonTwo}

            //figure this out later
            //matchDisplay?regional ... sets the route of the matchDisplay page. 
            //trying a fix in which router pushes intou scouting display with params for the regional and team number
            //this will hopefully allow both tabs to be part of the same route. 
            //Fix did not work. Looking into context

            //regionalcontext is never given, make sure to add its provider.


            //providing context via the pressable. Now we need to hook it onto the _layout of the tabs and pray. 
            onPress={async () => {
              //CHECK IF CONTEXT IS EVEN BEING GIVEN

              //changing up the router.push for testing
              //router.push(`/(scout)/(ScoutingDisplay)/matchDisplay?regional=${regional}&teamNumber=${selectedValue}`)
              
              //honestly issues may have to do with the routing rather than the context.
              
              //storing team and regional values in secureStore
              //non-null assertion operator (!) used because regional will never be null if the 
              //user has gotten to this page
              storeSecureTeam(selectedValue, regional!);
              let reg = await retrieveRegional();
              let teamNum = await retrieveTeam();
              console.log("regional: "+ reg + " team: " + teamNum);

              router.push(`/(scout)/(ScoutingDisplay)/matchDisplay?regional=${reg}&teamNumber=${teamNum}`)
              //since the queried information is stored locally, passing it by query is unnecessary
              //nevermind. this causes some crazy error when queries are absent. 
              //router.push(`/(scout)/(ScoutingDisplay)/matchDisplay`)

            }}
              > 
            <Text style={styles.buttonTwoText}>Scouting Information</Text>
          </Pressable>
        </View>
    ); //swapped '(ScoutingDisplay)/robotDisplay' to '(ScoutingDsplay)/matchDisplay' to match the tabs. 
};



const styles = StyleSheet.create({
    container: {
      flex: 1, // Makes sure the container takes up the whole screen
      justifyContent: 'flex-start', // Centers content to the top of the page
      alignItems: 'center', // Centers content horizontally in the container
      padding: 20, // Optional: Adds padding to the container
    },
    title:{
      fontFamily: 'BPoppins',
      fontSize: 25,
      marginBottom: 50,
      marginTop: 30, 
    },
    subtitle:{
      fontFamily: 'BPoppins',
      fontSize: 15,
      color: 'rgba(127, 127, 127, 255)',
    },
    logo: {
      width: 270,  // specify a width
      height: 270, // and a height for your image
      marginBottom: 60,
      // add other styling as needed
    },
    buttonOne: {
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 82,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'rgba(0, 130, 190, 255)',
      borderWidth: 1,
      borderColor: 'white',
    },
    buttonTwo: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'rgba(0, 130, 190, 255)',
      marginTop: 10, // Adds space between buttons
    },
    buttonOneText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      fontFamily: 'BPoppins',
    },
    buttonTwoText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'rgba(0, 130, 190, 255)',
      fontFamily: 'BPoppins',
    },
    backButtonText:{
      fontFamily: 'BPoppins',
      fontSize: 15,
      color: 'white',
      marginBottom: 30,
    },
    dropdown: {
      height: 50,
      width: '80%', // or some other appropriate width
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      // Add margin for some spacing if needed
      marginTop: 10,
      marginBottom: 40,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default RegionalPage;
