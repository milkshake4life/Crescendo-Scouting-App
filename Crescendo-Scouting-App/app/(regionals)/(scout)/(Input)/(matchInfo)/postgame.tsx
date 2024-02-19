import React, { useEffect, useState } from "react";
import {Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity,} from "react-native";
import BackButton from '../../../../backButton';
import { CheckBox } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router'



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
  );
};
const DrivingRatingSlider: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(1);

  return (
    <>
      <Text style={styles.subtitle}>Driving Rating</Text>
      <SliderWithNumbers
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
        minValue={1}
        maxValue={5}
        step={1}
        sliderWidth={110} // Adjust the slider width as needed
      />
      
    </>
  );
};
const DefenseSlider: React.FC = () => {
  const [sliderValue, setSliderValue] = React.useState(1);

  return (
    <>
      <Text style={styles.subtitle}>Defense</Text>
      <SliderWithNumbers
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
        minValue={1}
        maxValue={5}
        step={1}
        sliderWidth={110} 
      />
     
    </>
  );
};

const MatchInfo: React.FC = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [counter,setCounter] =useState(0)

  const incrementCounter = () => {
    setCounter(counter+1)
  }

  const decrementCounter = () => {
    if(counter > 0) {
        setCounter(counter-1)
    }
  }

  const handleSubmit = () => {
    // Add your submission logic here
    console.log('Submitting:', { isChecked });
  };

  return (
    <ScrollView>
      <BackButton buttonName="Home Page" />
      <View style={styles.container}>
        <Text style={styles.title}>Match Info</Text>

        {/* Driving Rating Slider */}
        <DrivingRatingSlider />

        {/* Checkbox with margin */}
        <CheckBox
          title="Defense"
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          containerStyle={styles.checkboxContainer}
        />

        {isChecked && <DefenseSlider />}
        <Text style={styles.subtitle}>Penalties</Text>

        <View style={styles.buttonContainer}>
        
        <TouchableOpacity
           onPress={decrementCounter}
           style={styles.buttonTwo}
         >
           <Text style={styles.buttonTwoText}>-</Text>
         </TouchableOpacity>
      


         <Text style={styles.counterText}>{counter}</Text>


         <TouchableOpacity
           onPress={incrementCounter}
           style={styles.buttonTwo}
         >
           <Text style={styles.buttonTwoText}>+</Text>
         </TouchableOpacity>
         </View>

        

        {/* Conditional Defense Slider based on checkbox state */}
        

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text 
          style={styles.submitButtonText}
          onPress={() => router.push(`/(matchInfo)/review`)}>Review</Text>

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
    fontSize: 32,
    marginBottom: 20,
    marginTop: 70,
  },
  // checkBox: {
  //   color: 'white',
  // },
  checkboxContainer: {
    marginVertical: 20,
  },
  conditionalSlider: {
    width: 200,
    height: 40,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'rgba(127, 127, 127, 255)',
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    paddingVertical: 12,
    paddingHorizontal: 53,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'white',
  },
  submitButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'BPoppins',
  },
  checkedText: {
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'green',
    marginTop: 10,
  },
  buttonOne: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 53,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgba(0, 130, 190, 255)",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  buttonOneText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "BPoppins",
  },
  buttonTwo: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 53,
    // borderRadius: 4,
    // elevation: 3,
    // backgroundColor: "rgba(0, 130, 190, 255)",
    // borderWidth: 2,
    // borderColor: "white",
  },
  buttonTwoText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    fontFamily: "BPoppins",
  },
  counterText: {
    fontSize: 16,
    marginTop: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    fontFamily: "BPoppins",
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
    width: '50%',
    paddingHorizontal: 20,
  },
  markerText: {
    fontSize: 12,
    color: 'rgba(127, 127, 127, 255)',
  },
 
  
  // ... Other styles remain the same
});

export default MatchInfo;
