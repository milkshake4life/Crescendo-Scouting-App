import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import BackButton from "../backButton";
import { DatabaseQuery, DataPoint, fetchQueriedTeams } from "./rankings";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { DropdownItem } from "./[regional]";
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

  const [isFocus, setIsFocus] = useState(false);
  const [selectedStatType, setSelectedStatType] = useState<string | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  
  const statTypes: DropdownItem[] = [{label: 'Fraction', value: 'Fraction'}, {label: 'Percentage', value: 'Percentage'}];
  const stats: DropdownItem[] = [{label: 'Speaker', value: 'Speaker'}, {label: 'Amp', value: 'Amp'}];

  let sorted: DataPoint[];

  const getRanking = (q: DatabaseQuery) => {
    sorted = fetchQueriedTeams(q);
  }

  const renderRankings = () => {
    return sorted.map((key) => <Text>Team {key.key}: {key.stat}</Text>)
  }
  
    return (
      
        <View style={styles.container}>
            <BackButton buttonName='Regional Page' />

            {/* dropdown to set up the query */}

            <Text style={styles.title}> Team Rankings </Text>
            <Dropdown
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

            {/*specific statistic*/}
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
            />

            <Pressable
              style={styles.buttonOne}
              onPress={() => {
                //testing DatabaseQuery interface as a parameter. Better readability than just passing everything in
                if(!selectedStat && !selectedStatType)
                {
                    alert(`Please make sure you have selected a stat and a stat type.`)
                } else {
                    getRanking({regional: modifiedRegional!, statType: selectedStatType as 'Fraction' | 'Percentage', stat: selectedStat as 'Speaker' | 'Amp'});
                    renderRankings();
                }
              }}
            >
              <Text style={styles.buttonText}>QUERY!</Text>
            </Pressable>

            

            


        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Makes sure the container takes up the whole screen
        justifyContent: 'flex-start', // Centers content to the top of the page
        alignItems: 'center', // Centers content horizontally in the container
        padding: 20, // Optional: Adds padding to the container
      },
      containerRedirect: {
        flex: 1, // Makes sure the container takes up the whole screen
        justifyContent: 'flex-start', // Centers content to the top of the page
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