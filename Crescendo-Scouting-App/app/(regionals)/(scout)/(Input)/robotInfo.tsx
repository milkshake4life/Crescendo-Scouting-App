import { Link, router } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, TextInput } from "react-native";
import React, { useState } from 'react';

const robotInfo = () => {
  const [teamNumber, setTeamNumber] = useState<string>('');

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Robot Scouting!</Text>
      <Text style={ styles.subtitle }>Input team's data!</Text>

      <TextInput
        style={styles.input}
        value={teamNumber}
        onChangeText={setTeamNumber}
        placeholder="Team Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={teamNumber}
        onChangeText={setTeamNumber}
        placeholder="Drive Train"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Set width as needed
    borderRadius: 5, // Optional: if you want rounded corners
  },
});

export default robotInfo;