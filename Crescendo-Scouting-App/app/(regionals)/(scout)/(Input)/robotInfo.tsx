import { Platform, KeyboardAvoidingView, ScrollView, Pressable, Button, Text, View, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from 'react';
import { database } from '../../../.././firebaseConfig';
import { ref, set, push } from 'firebase/database';
import BackButton from "../../../backButton";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

const robotInfo = () => {
  const [driveTrain, setDriveTrain] = useState<string>('');
  const [vision, setVision] = useState<string>('');
  const ClimberOptions = ['No Climb', 'Single Climb', 'Harmony Climb'];
  const ScoringOptions = ['No Scoring', 'Amp Only', 'Speaker Only', 'Both'];
  const IntakeOptions = ['No Intake', 'Ground Only', 'Source Only', 'Both'];
  const DrivingOptions = ['N/A', 'Drive Over Notes', 'Drive Under Stage', 'Both'];
  const {regional} = useGlobalSearchParams<{ regional:string } > ();
  const { teamNumber } = useGlobalSearchParams<{ teamNumber: string }>();

  //selects one option
  const [selectedClimberOption, setSelectedClimberOption] = useState<string | null>(null);
  const [selectedScoringOption, setSelectedScoringOption] = useState<string | null>(null);
  const [selectedIntakeOption, setSelectedIntakeOption] = useState<string | null>(null);
  const [selectedDrivingOption, setSelectedDrivingOption] = useState<string | null>(null);

  // function that does a one choice selection
  const handleSelection = (option: string, setSelection: React.Dispatch<React.SetStateAction<string | null>>) => {
    setSelection(option);
  };

  const handleSendData = () => {
    // const sanitizedTeamNumber = String(teamNumber).trim().replace(/[.#$[\]]/g, '-');
    const teamNumberPath = regional + `/teams/` + teamNumber + `/Robot-Info/`;

    set(ref(database, teamNumberPath), {
      driveTrain: driveTrain,
      vision: vision,
      climberOption: selectedClimberOption,
      scoringOption: selectedScoringOption,
      intakeOption: selectedIntakeOption,
      drivingOption: selectedDrivingOption,
      // ... any other fields ...
    }).then(() => {
      console.log('Data saved successfully!');
      console.log(regional)
      console.log(teamNumber)
      // ... handle success ...
    }).catch((error) => {
      console.error('Failed to write data: ', error);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView>
        <View style={ styles.container }>
          <BackButton buttonName="Home Page" />
          <Text style={styles.title}> Robot Display! </Text>
          <Text style={ styles.title }>Robot Scouting!</Text>
          <Text style={ styles.subtitle }>Input team's data!</Text>

          <TextInput
            style={styles.input}
            value={driveTrain}
            onChangeText={setDriveTrain}
            placeholder="Drive Train"
          />

          <Text style={ styles.questiontitle }>Scoring data!</Text>

          <View style={styles.optionsContainer}>
            {ScoringOptions.map((option, index) => (
              <Pressable
                key={index}
                style={[styles.option, selectedScoringOption === option ? styles.optionSelected : {}]}
                onPress={() => handleSelection(option, setSelectedScoringOption)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={ styles.questiontitle }>Climbing data!</Text>

          <View style={styles.optionsContainer}>
            {ClimberOptions.map((option, index) => (
              <Pressable
                key={index}
                style={[styles.option, selectedClimberOption === option ? styles.optionSelected : {}]}
                onPress={() => handleSelection(option, setSelectedClimberOption)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={ styles.questiontitle }>Intake data!</Text>

          <View style={styles.optionsContainer}>
            {IntakeOptions.map((option, index) => (
              <Pressable
                key={index}
                style={[styles.option, selectedIntakeOption === option ? styles.optionSelected : {}]}
                onPress={() => handleSelection(option, setSelectedIntakeOption)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={ styles.questiontitle }>Driving data!</Text>

          <View style={styles.optionsContainer}>
            {DrivingOptions.map((option, index) => (
              <Pressable
                key={index}
                style={[styles.option, selectedDrivingOption === option ? styles.optionSelected : {}]}
                onPress={() => handleSelection(option, setSelectedDrivingOption)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={ styles.questiontitle }>Visionary data!</Text>
          
          <TextInput
            style={styles.input}
            value={vision}
            onChangeText={setVision}
            placeholder="Visionary System"
          />
          <Pressable
            style={styles.sendButton}
            onPress={handleSendData}
          >
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
  },
  title:{
    fontFamily: 'BPoppins',
    fontSize: 32,
  },
  subtitle:{
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'rgba(127, 127, 127, 255)',
    marginBottom: 30,
  },
  questiontitle:{
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'rgba(127, 127, 127, 255)',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Set width as needed
    borderRadius: 5, // Optional: if you want rounded corners
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  option: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20, // Makes it more "bubble"-like
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    //fontFamily: 'BPoppins', // Change this to less dense font
  },
  optionSelected: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
    color: '#fff',
  },
  sendButton: {},
  sendButtonText: {},
});

export default robotInfo;