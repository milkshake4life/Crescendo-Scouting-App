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
        sliderWidth={100} // Adjust the slider width as needed
      />
      
    </>
  );
};
// const DefenseSlider: React.FC = () => {
//   const [sliderValue, setSliderValue] = React.useState(1);

//   return (
//     <>
//       <Text style={styles.subtitle}>Defense</Text>
//       <SliderWithNumbers
//         value={sliderValue}
//         onValueChange={(value) => setSliderValue(value)}
//         minValue={1}
//         maxValue={5}
//         step={1}
//         sliderWidth={110} 
//       />
     
//     </>
//   );
// };

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

        <Text style={styles.subtitle}>Penalties</Text>

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
        </View>

        {/* Conditional Defense Slider based on checkbox state */}

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text 
            style={styles.submitButtonText}
            onPress={() => router.push(`/(matchInfo)/thanks`)}
          >
            Review
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
    // fontFamily: 'BPoppins',
    // fontSize: 32,
    // marginBottom: 20,
    // marginTop: 70,
    fontFamily: 'BPoppins',
    fontSize: 36,
    textAlign: 'center',
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
    // fontFamily: 'BPoppins',
    // fontSize: 15,
    // color: 'rgba(127, 127, 127, 255)',
    // marginTop: 10,
    fontFamily: 'BPoppins',
    fontSize: 30,
    textAlign: 'center',
    color: 'rgba(0, 130, 190, 255)',
    marginTop: '10%',
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
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: '70%',
  // },
  buttonOneText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "BPoppins",
  },
  buttonTwo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20, // Adjust as needed
    borderRadius: 4,
    backgroundColor: 'transparent', // Set to 'transparent' or remove
  },
  buttonTwoText: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    fontFamily: 'BPoppins',
  },
  buttonWrapper: {
    backgroundColor: 'transparent', // Set to 'transparent' or remove
    overflow: 'hidden', // This line helps to hide the potential overflow
  },
  // counterText: {
  //   fontSize: 25,
  //   marginTop: 19,
  //   lineHeight: 21,
  //   fontWeight: "bold",
  //   letterSpacing: 0.25,
  //   color: "black",
  //   fontFamily: "BPoppins",
  // },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginTop: 10,
  },
  counterText: {
  fontSize: 30,
  fontWeight: 'bold',
  color: 'black',
  fontFamily: 'BPoppins',
  alignSelf: 'center',
  marginLeft: 10, // Adjust as needed
  marginRight: 10, // Adjust as needed
  marginBottom: 20, // Adjust as needed
},
  counterContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 
  
  // ... Other styles remain the same
});

export default MatchInfo;