import React, { useEffect, useState } from "react";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, } from "react-native";
import BackButton from '../../../../backButton';
import { CheckBox } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import { router, useGlobalSearchParams } from 'expo-router'
import { ref, set } from "@firebase/database";
import { database } from "../../../../../firebaseConfig";



interface SliderWithNumbersProps {
  value: number;
  onValueChange: (value: number) => void;
  minValue: number;
  maxValue: number;
  step: number;
  sliderWidth: number;
}

const SliderWithNumbers: React.FC<SliderWithNumbersProps> = ({
  value,
  onValueChange,
  minValue,
  maxValue,
  step,
  sliderWidth,
}) => {
  const markers = Array.from(
    { length: (maxValue - minValue) / step + 1 },
    (_, index) => minValue + index * step
  );

  const fontSize = sliderWidth / markers.length;

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.border}>
        <View style={styles.counterContainer}>
          <Slider
            style={styles.slider}
            minimumValue={minValue}
            maximumValue={maxValue}
            step={step}
            value={value}
            onValueChange={onValueChange}
          />
          <View style={[styles.sliderMarkers, { paddingHorizontal: 0 }]}>
            {markers.map((marker, index) => (
              <Text key={marker} style={[styles.markerText, { fontSize }]}>
                {marker}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const DrivingRatingSlider: React.FC<{ value: number; onValueChange: (value: number) => void }> = ({ value, onValueChange }) => {
  const markers = Array.from(
    { length: (5 - 1) / 1 + 1 },
    (_, index) => 1 + index * 1
  );

  const fontSize = 100 / markers.length;

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.border}>
        <View style={styles.counterContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={value}
            onValueChange={onValueChange}
          />
          <View style={[styles.sliderMarkers, { paddingHorizontal: 0 }]}>
            {markers.map((marker, index) => (
              <Text key={marker} style={[styles.markerText, { fontSize }]}>
                {marker}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

//ADD: defense + disabled check box


//       <CheckBox
//         title="Defense"
//         checked={isChecked}
//         onPress={() => setIsChecked(!isChecked)}
//         containerStyle={styles.checkboxContainer}
//       />

/*

*/
const MatchInfo: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [isDefenseChecked, setIsDefenseChecked] = React.useState(false);
  const [isDisabledChecked, setIsDisabledChecked] = React.useState(false);
  const [counter, setCounter] = useState(0)
  const [comment, setComment] = useState<string>('');
  const { regional } = useGlobalSearchParams<{ regional: string }>();
  const { teamNumber } = useGlobalSearchParams<{ teamNumber: string }>();
  const { qualMatch } = useGlobalSearchParams<{ qualMatch: string }>();

  const incrementCounter = () => {
    setCounter(counter + 1)
  }

  const decrementCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  const handleSubmit = () => {
    // Add your submission logic here
    const path = `${regional}/teams/${teamNumber}/Match-Info/${qualMatch}`;
    set(ref(database, path + '/Driving Rating'), sliderValue)
    set(ref(database, path + 'Comment'), comment)

    let defenseValue = 0;
    let disabledValue = 0;

    if(isDefenseChecked)
    {
      defenseValue = 1;
    }
    if(isDisabledChecked)
    {
      disabledValue = 1;
    }
    

    //defense, disabled stuff
    set(ref(database, path + '/Defense'), defenseValue)
    set(ref(database, path + '/Disabled'), disabledValue)


  };

  return (
    <ScrollView>
      <BackButton buttonName="Home Page" />
      <View style={styles.container}>
        <Text style={styles.title}>Post Game</Text>

        {/* Driving Rating Slider */}
        <Text style={styles.subtitle}>Driving Rating</Text>
        <DrivingRatingSlider value={sliderValue} onValueChange={(value) => setSliderValue(value)} />

        {/* Checkbox with margin */}
        {/* Defense */}
          <CheckBox
            title="Defense"
            checked={isDefenseChecked}
            onPress={() => setIsDefenseChecked(!isDefenseChecked)}
            containerStyle={styles.checkboxContainer}
          />

          {/* Disabled */}
          <CheckBox
            title="Disabled"
            checked={isDisabledChecked}
            onPress={() => setIsDisabledChecked(!isDisabledChecked)}
            containerStyle={styles.checkboxContainer}
          />
          <View style={styles.textContainer}>
            <Text style={ styles.buttontitle }>Comment Box</Text>
            <TextInput
              style={styles.input}
              value={comment}
              onChangeText={setComment}
              placeholder="Comment"
          />
          </View>



        {/* <Text style={styles.subtitle}>Penalties</Text>

        <View style={styles.border}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={decrementCounter}
                style={styles.buttonTwo}
              >
                <Text style={styles.buttonTwoText}>-</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.counterText}>{counter}</Text>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={incrementCounter}
                style={styles.buttonTwo}
              >
                <Text style={styles.buttonTwoText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}

        {/* Conditional Defense Slider based on checkbox state */}

        <Pressable style={styles.submitButton}>
          <Text
            style={styles.submitButtonText}
            onPress={() => { router.push(`/(matchInfo)/thanks?regional=${regional}`); handleSubmit() }}
          >
            Submit
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: 'flex-start', // Centers content to the top of the page
    alignItems: 'center', // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
  },
  title: {
    fontFamily: 'BPoppins',
    fontSize: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'BPoppins',
    fontSize: 25,
    textAlign: 'center',
    color: 'rgba(0, 130, 190, 255)',
    marginTop: '10%',
  },
  submitButton: {
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    paddingVertical: 12,
    paddingHorizontal: 53,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(0, 130, 190, 255)',
  },
  submitButtonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'BPoppins',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  slider: {
    width: 200,
    height: 40,
    marginBottom: 5,
  },
  sliderMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '62%',
    paddingHorizontal: 25,
    marginLeft: 35,
  },
  markerText: {
    fontSize: 12,
    color: 'rgba(127, 127, 127, 255)',
  },
  border: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxWidth: '95%',
    marginVertical: 10,
  },
  counterContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginVertical: 20,
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
  buttontitle:{
    fontFamily: 'BPoppins',
    fontSize: 20,
    color: 'rgba(0, 130, 190, 255)',
   
  },
  textContainer: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: 'flex-start', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
    width: "100%",
  },

});

export default MatchInfo;