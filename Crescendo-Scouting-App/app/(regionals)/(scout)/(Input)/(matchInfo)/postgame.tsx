import React, { useEffect, useState } from "react";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, } from "react-native";
import BackButton from '../../../../backButton';
import { CheckBox } from 'react-native-elements';
// import Slider from '@react-native-community/slider';
import { Slider } from 'react-native-elements';
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
      <View style={styles.sliderWrapper}>
        <Slider
          style={styles.slider}
          thumbTintColor="rgba(0, 130, 190, 255)"
          minimumTrackTintColor="rgba(0, 130, 190, 255)"
          minimumValue={minValue}
          maximumValue={maxValue}
          step={step}
          value={value}
          onValueChange={onValueChange}
          thumbStyle={styles.thumbStyle}
        />
      </View>
      <View style={styles.sliderMarkersContainer}>
        {markers.map((marker, index) => (
          <Text key={marker} style={[styles.markerText, { fontSize }]}>
            {marker}
          </Text>
        ))}
      </View>
    </View>
  );
};


// interface SliderWithNumbersProps {
//   value: number;
//   onValueChange: (value: number) => void;
//   minValue: number;
//   maxValue: number;
//   step: number;
//   sliderWidth: number;
// }

// const SliderWithNumbers: React.FC<SliderWithNumbersProps> = ({
//   value,
//   onValueChange,
//   minValue,
//   maxValue,
//   step,
//   sliderWidth,
// }) => {
//   const markers = Array.from(
//     { length: (maxValue - minValue) / step + 1 },
//     (_, index) => minValue + index * step
//   );

//   const fontSize = sliderWidth / markers.length;

//   return (
//     <View style={styles.sliderContainer}>
//       <View style={styles.border}>
//         <View style={styles.counterContainer}>
//           <Slider
//             style={styles.slider}
//             minimumValue={minValue}
//             maximumValue={maxValue}
//             step={step}
//             value={value}
//             onValueChange={onValueChange}
//           />
//           <View style={[styles.sliderMarkers, { paddingHorizontal: 0 }]}>
//             {markers.map((marker, index) => (
//               <Text key={marker} style={[styles.markerText, { fontSize }]}>
//                 {marker}
//               </Text>
//             ))}
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const DrivingRatingSlider: React.FC<{ value: number; onValueChange: (value: number) => void }> = ({ value, onValueChange }) => {
//   const markers = Array.from(
//     { length: (5 - 1) / 1 + 1 },
//     (_, index) => 1 + index * 1
//   );

//   const fontSize = 100 / markers.length;

//   return (
//     <View style={styles.sliderContainer}>
//       <View style={styles.border}>
//         <View style={styles.counterContainer}>
//           <Slider
//             style={styles.slider}
//             minimumValue={1}
//             maximumValue={5}
//             step={1}
//             value={value}
//             onValueChange={onValueChange}
//           />
//           <View style={[styles.sliderMarkers, { paddingHorizontal: 0 }]}>
//             {markers.map((marker, index) => (
//               <Text key={marker} style={[styles.markerText, { fontSize }]}>
//                 {marker}
//               </Text>
//             ))}
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };


const MatchInfo: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [selectedDriveRatingValue, setSelectedDriveRatingValue] = useState<number | 0>(0);
  const [isChecked, setIsChecked] = React.useState(false);
  const [counter, setCounter] = useState(0)
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
    
  };

  return (
    <ScrollView>
      <BackButton buttonName="Home Page" />
      <View style={styles.container}>
        <Text style={styles.title}>Post Game</Text>

        <Text style={styles.subtitle}>Driver Rating</Text>
        <View style={styles.border}>
                  <View style={styles.counterContainer}>
                    {/* <View style={styles.numberLine}>
                    </View> */}
        <SliderWithNumbers
          value={sliderValue}
          onValueChange={(value) => {
            setSelectedDriveRatingValue(value); // Set the slider value to your trap value
          }}
          minValue={1}
          maxValue={5}
          step={1}
          sliderWidth={90} // changes number size
        />
        </View>
        </View>

        {/* Driving Rating Slider
        <Text style={styles.subtitle}>Driving Rating</Text>
        <DrivingRatingSlider value={sliderValue} onValueChange={(value) => setSliderValue(value)} /> */}

        {/* Checkbox with margin */}

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
    marginTop: '5%',
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
    width: '100%',
    height: 40,
    marginBottom: 30,
  },
  sliderMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    paddingHorizontal: '2%',
    marginLeft: 35,
  },
  markerText: {
    fontSize: 12,
    color: 'rgba(127, 127, 127, 255)',
  },
  border: {
    paddingVertical: 20,
    paddingHorizontal: '2%',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxWidth: '94%',
  },
  // border: {
  //   padding: 20,
  //   borderRadius: 10,
  //   borderWidth: 3,
  //   borderColor: 'rgba(0, 130, 190, 255)',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  //   maxWidth: '95%',
  //   marginVertical: 10,
  // },
  counterContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sliderWrapper: {
    width: '80%', // Adjust as needed
    alignItems: 'center',
    marginRight: 0,
  },
  thumbStyle: {
    width: 20,
    height: 20,
  },
  sliderMarkersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '80%',
    paddingHorizontal:'3%',
    position: 'absolute',
    bottom: 0,
  },
  numberLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default MatchInfo;