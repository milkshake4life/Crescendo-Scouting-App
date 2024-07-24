import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../../../Components/backButton';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from "react";
import { database } from "../../../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";

interface DropdownItem{
  label: string;
  value: string;
}

const robotInfo = () => {
  const ScoringData = [
    { label: 'No Scoring', value: '1' },
    { label: 'Amp', value: '2' },
    { label: 'Speaker', value: '3' },
    { label: 'Speaker and Amp', value: '4' },
  ];
  const ClimbingData = [
    { label: 'No Climb', value: '5' },
    { label: 'Single Climb', value: '6' },
    { label: 'Harmony Climb', value: '7' },
  ];
  const IntakeData = [
    { label: 'No Intake', value: '8' },
    { label: 'Ground', value: '9' },
    { label: 'Source', value: '10' },
    { label: 'Ground and Source', value: '11' },
  ];
  const DrivingData = [
    { label: 'Restricted', value: '12' },
    { label: 'Drive Over Notes', value: '13' },
    { label: 'Drive Under Stage', value: '14' },
    { label: 'Both', value: '15' },
  ]

  const [driveTrain, setDriveTrain] = useState<string>('');
  const [vision, setVision] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [selectedClimbingValue, setSelectedClimbingValue] = useState<string | null>(null);   
  const [selectedScoringValue, setSelectedScoringValue] = useState<string | null>(null);
  const [selectedIntakeValue, setSelectedIntakeValue] = useState<string | null>(null);
  const [selectedDrivingValue, setSelectedDrivingValue] = useState<string | null>(null);
  // const [isScoringFocus, setIsScoringFocus] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);
  const [dropdownFocus, setDropdownFocus] = useState<{
    [key: string]: boolean;
  }>({});
  const {regional} = useGlobalSearchParams<{ regional:string } > ();
  let modifiedRegional = regional
  if(regional === 'Orange County'){
    modifiedRegional = 'Orange-County'
  }
  else if (regional === 'Port Hueneme') {
    modifiedRegional = 'Port-Hueneme'
  }
  const {teamNumber} = useGlobalSearchParams<{ teamNumber:string } > ();

  const handleSendData = () => {
    const path = `${modifiedRegional}/teams/${teamNumber}/Robot-Info/`;

    set(ref(database, path + 'Drive-Train-Info'), driveTrain)
    set(ref(database, path + 'Vision-Info'), vision)
    set(ref(database, path + 'Climbing-Info'), selectedClimbingValue)
    set(ref(database, path + 'Scoring-Info'), selectedScoringValue)
    set(ref(database, path + 'Intake-Info'), selectedIntakeValue)
    set(ref(database, path + 'Driving-Info'), selectedDrivingValue)
  }

  const handleFocus = (dropdownKey: string) => {
    setDropdownFocus((prevFocus) => ({
      ...prevFocus,
      [dropdownKey]: true,
    }));
  };
  
  const handleBlur = (dropdownKey: string) => {
    setDropdownFocus((prevFocus) => ({
      ...prevFocus,
      [dropdownKey]: false,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView>
        <View style={ styles.container }>
        <BackButton buttonName='Home Page'/>
          <Text style={ styles.title }>Pit Scouting</Text>
          {/* <Text style={ styles.subtitle }>Input the team's data</Text> */}

      <View style={styles.container}>
      <Text style={ styles.buttontitle }>Visionary Data</Text>
      <TextInput
            style={styles.input}
            value={vision}
            onChangeText={setVision}
            placeholder="Input Visionary System"
          />
      <Text style={ styles.buttontitle }>Drive Train Data</Text>
      <TextInput
            style={styles.input}
            value={driveTrain}
            onChangeText={setDriveTrain}
            placeholder="Input Drive Train"
         />
        <Text style={ styles.buttontitle }>Scoring Data</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue', position: 'relative', bottom: dropdownHeight + 10, }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={ScoringData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={selectedScoringValue || '1'}
          onFocus={() => handleFocus('scoringData')}
          onBlur={() => handleBlur('scoringData')}
          onChange={(item: DropdownItem) => {
            setSelectedScoringValue(item.value);
            // handleSendScoringData();
            setIsFocus(false);
          }}
        />
        <Text style={ styles.buttontitle }>Climbing Data</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue', position: 'relative', bottom: 300 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={ClimbingData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={selectedClimbingValue || '5'}
          onFocus={() => handleFocus('climbingData')}
          onBlur={() => handleBlur('climbingData')}
          onChange={(item: DropdownItem) => {
            setSelectedClimbingValue(item.value);
            setIsFocus(false);
          }}
        />
        <Text style={ styles.buttontitle }>Intake Data</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue', position: 'relative', bottom: 300 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={IntakeData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={selectedIntakeValue || '8'}
          onFocus={() => handleFocus('intakeData')}
          onBlur={() => handleBlur('intakeData')}
          onChange={(item: DropdownItem) => {
            setSelectedIntakeValue(item.value);
            setIsFocus(false);
          }}
        />
        <Text style={ styles.buttontitle }>Driving Data</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={DrivingData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={selectedDrivingValue || '12'}
          onFocus={() => handleFocus('Data')}
          onBlur={() => handleBlur('drivingData')}
          onChange={(item: DropdownItem) => {
            setSelectedDrivingValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
          <Pressable
            style={styles.sendButton}
            onPress={() => {
              router.push(`/(matchInfo)/thanks?regional=${regional}`);
              handleSendData();
            }}>
            <Text style={styles.sendButtonText}>Send Data</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: 'flex-start', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
    width: "100%",
  },
  title:{
    fontFamily: 'BPoppins',
    fontSize: 35,
  },
  buttontitle:{
    fontFamily: 'BPoppins',
    fontSize: 20,
    color: 'rgba(0, 130, 190, 255)',
   
  },
  input: {
    height: 50,
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 8,
    borderWidth: .5,
    padding: 10,
    width: '90%', // Set width as needed
    borderRadius: 5, // Optional: if you want rounded corners
  },
  sendButton: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '15%',
    borderRadius: 4,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 1,
    borderColor: 'white',

  },
  sendButtonText: {
    color:'white',
    fontFamily: 'BPoppins',
  },
  dropdown: {
    height: 50,
    width: '90%', // or some other appropriate width
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // Add margin for some spacing if needed
    marginTop: 10,
    marginBottom: 30,
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
});

export default robotInfo;