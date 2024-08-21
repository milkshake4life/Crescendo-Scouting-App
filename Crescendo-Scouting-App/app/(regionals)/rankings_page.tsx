import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { useFonts } from 'expo-font';
import BackButton from "../Components/backButton";
import { DatabaseQuery, DataPoint, fetchQueriedTeams, searchTeams, updateTBAranking } from "./rankings";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { DropdownItem } from "./[regional]";
import TeamDisplay from "../Components/TeamDisplay";
//import { TeamContextProvider } from "../../Contexts/team-content";


const rankingsPage = () => {
  const {regional} = useGlobalSearchParams<{ regional:string } > ();
  let modifiedRegional = regional
  if (regional === 'Orange County') {
    modifiedRegional = 'Orange-County'
  }
  else if (regional === 'Port Hueneme') {
    modifiedRegional = 'Port-Hueneme'
  }

  //speaker, amp, climber, or competition
  const [selectedStat, setSelectedStat] = useState<'Speaker' | 'Amp' | 'TBA'>("TBA");
  const [isFocus, setIsFocus] = useState(false);


  //stat types are being phased out. Instead, we will now display both fraction and percentage underneath the team like a dropdown.
  // const statTypes: DropdownItem[] = [{label: 'Fraction', value: 'Fraction'}, {label: 'Percentage', value: 'Percentage'}];

  const stats: DropdownItem[] = [{label: 'Speaker', value: 'Speaker'}, {label: 'Amp', value: 'Amp'}, {label: 'Competition', value: 'TBA'}];


  //sorted shouldn't be modified
  const [sorted, setSorted] = useState<DataPoint[]>([]);

  //displayed is the modified array
  const [displayed, setDisplayed] = useState<DataPoint[]>([]);

  const [isFetched, setIsFetched] = useState<boolean>(false);

  const [textInput, setTextInput] = useState<string>("");

  
  //eventually this will be moved to a useeffect so that we always have information to display. By default we will display competition rankings (no idea how we are going to get those)
  //And then users can select what to sort by in the dropdown (competition, speaker, amp) and search for individual teams using a search bar. 
  const getRanking = async (q: DatabaseQuery) => {
    await setSorted(fetchQueriedTeams(q));
    await setDisplayed(sorted)
  }

  const searchByName = async (teamString: string) => {
    await setDisplayed(searchTeams(sorted, teamString));
  }

  // useEffect(() => {

  //   const getRanking = async (q: DatabaseQuery) => {
  //     try {
  //       setSorted(fetchQueriedTeams(q, 5));
  //     } catch (error) {
  //       console.error(error)
  //     }

  //   }
    
  // }, []);


  // const renderRankings = () => {
  //   return sorted?.map((key) => <Text>Team {key.key}: {key.stat}</Text>)
  // }
  
    return (
      
        <ScrollView /*style={styles.mainContainer}*/>
          <>
            <BackButton buttonName='Regional Page' />


            <Text style={styles.title}> Team Rankings </Text>

            {/* dropdown to set up the query (For some reason the text of the selected item does not remain in the dropdown after selection)*/}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={stats}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Sort by: ' : '...'}
              searchPlaceholder="Search..."
              value= {selectedStat}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedStat(item.value as 'Speaker' | 'Amp' | 'TBA');  // Update the state to the new value
                // setIsFocus(false);  // Assuming you want to unfocus the dropdown after selection
              }}
            />


            <Pressable
              style={styles.buttonOne}
              onPress={async () => {
                //testing DatabaseQuery interface as a parameter. Better readability than just passing everything in
                // if(!selectedStat && !selectedStatType)
                // {
                //     alert(`Please make sure you have selected a stat and a stat type.`)
                // } else {
                  //trying hardcoded
                    await getRanking({regional: modifiedRegional! /*, Fraction' | 'Percentage'*/, stat: selectedStat! /*'Speaker' | 'Amp'}*/});
                    setIsFetched(true);
                // }
              }}
            >
              <Text style={styles.buttonText}>QUERY!</Text>
            </Pressable>

            <TextInput
              onChangeText={setTextInput}
              value={textInput}
              placeholder="search team number: "
            />

            <Pressable
              style={styles.buttonOne}
              onPress={async () => {
                    //search button:

                    //if the searchbar is empty, we should return to the whole ranking.
                    if(textInput.length > 0) {
                      await searchByName(textInput);
                    }
                    else {
                      await getRanking({regional: modifiedRegional! /*, Fraction' | 'Percentage'*/, stat: selectedStat /*'Speaker' | 'Amp'}*/})
                    }

                    //ITS PROBABLY NOT A BAD IDEA TO MAKE THESE ONE BUTTON. Or, when we implement the dropdown, just make the above function activate on form field change (i.e. textinput changes or query dropdown changes)
                }}
            > 
              <Text style={styles.buttonText}>SEARCH!</Text>
            </Pressable>

            <Pressable
              style={styles.buttonOne}
              onPress={async () => {
                  await updateTBAranking(modifiedRegional);
                  console.log("done");
                }}
            > 
              <Text style={styles.buttonText}>Test API call</Text>
            </Pressable>

            {displayed.length > 0 && isFetched ? (
              displayed?.map((data) => (
                // <Text style={styles.subtitle}>
                //   {data.key}: {data.percentage}, {data.fraction}
                // </Text>
                <TeamDisplay title={data.key}>
                  <Text>Speaker Accuracy: {data.speaker}</Text>
                  <Text>Amp Accuracy: {data.amp}</Text>
                  <Text>Rank: {data.rank}</Text>
                </TeamDisplay>
                //I need to find a way to close the accordian when a new search is made. 
              ))
            ) : (
              <Text style={styles.subtitle}>No data available</Text>
            )}
        </>

        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
      width: "100%",
    },
    container: {
        flex: 1, // Makes sure the container takes up the whole screen
        justifyContent: 'flex-start', // Centers content to the top of the page
        alignItems: 'center', // Centers content horizontally in the container
        padding: 20, // Optional: Adds padding to the container
      },
      containerRedirect: {
        flex: 1, // Makes sure the container takes up the whole screen
        // justifyContent: 'flex-start', // Centers content to the top of the page
        // alignItems: 'left', // Centers content horizontally in the container
        paddingLeft: '0%', 
      },
      title: {
        fontFamily: 'BPoppins',
        fontSize: 30,
        marginBottom: 30,
        textAlign: 'center',
      },
      titleRedirect: {
        fontFamily: 'BPoppins',
        fontSize: 30,
        marginBottom: 30,
      },
      subtitle: {
        fontFamily: 'BPoppins',
        fontSize: 15,
        color: 'rgba(127, 127, 127, 255)',
        // textAlign: 'center',
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
        paddingHorizontal: '13%',
        borderRadius: 4,
        backgroundColor: 'rgba(0, 130, 190, 255)',
        borderWidth: 1,
        borderColor: 'white',
      },
      buttonTwo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: '10%',
        borderRadius: 4,
        backgroundColor: 'rgba(0, 130, 190, 255)',
        borderWidth: 1,
        borderColor: 'rgba(0, 130, 190, 255)',
        marginTop: 10, // Adds space between buttons
      },
      buttonText: {
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: 'BPoppins',
      },
      buttonTwoText: {
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'rgba(0, 130, 190, 255)',
        fontFamily: 'BPoppins',
      },
      backButtonText: {
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
        color: 'gray',
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
    
      //button styles for the custom back button
      backButton: {
        marginTop: 50,
        marginBottom: 50, //adding bottom margins to avoid changing the title style
        //alignItems: 'center',
        //justifyContent: 'center',
        //paddingVertical: 12,
        //paddingHorizontal: 82,
        paddingRight: 350,
        borderRadius: 4,
        elevation: 3,
        //backgroundColor: 'rgba(0, 130, 190, 255)', //removing background color so we can use an image. 
        //borderWidth: 1,                            //removing border for same reason as above
        borderColor: 'white',
        width: 20,
        height: 20,
      },
      backButtonIcon: {
        width: 20,
        height: 20,
      }
  });

export default rankingsPage;


/* <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={statTypes}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select stat type' : '...'}
              searchPlaceholder="Search..."
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedStatType(item.value);  // Update the state to the new value
                setIsFocus(false);  // Assuming you want to unfocus the dropdown after selection
              }}
            />

            {/*specific statistic*//*} 
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={stats}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select stat' : '...'}
              searchPlaceholder="Search..."
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedStat(item.value);  // Update the state to the new value
                setIsFocus(false);  // Assuming you want to unfocus the dropdown after selection
              }}
            /> */