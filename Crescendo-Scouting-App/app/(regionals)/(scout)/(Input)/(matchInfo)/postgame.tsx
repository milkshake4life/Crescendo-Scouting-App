import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native';
import BackButton from '../../../../backButton';
import { CheckBox } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';

const DrivingRatingSlider: React.FC = () => {
  
  const [sliderValue, setSliderValue] = React.useState(1);

  return (
    <>
      <Text style={styles.subtitle}>Driving Rating</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
      />
      <Text style={styles.subtitle}>Selected Value: {sliderValue}</Text>
    </>
  );
};

const DefenseSlider: React.FC = () => {
  const [sliderValue, setSliderValue] = React.useState(1);

  return (
    <>
      <Text style={styles.subtitle}>Defense</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
      />
      <Text style={styles.subtitle}>Selected Value: {sliderValue}</Text>
    </>
  );
};

const MatchInfo: React.FC = () => {
  const [isChecked, setIsChecked] = React.useState(false);

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

        {/* Conditional Defense Slider based on checkbox state */}
        {isChecked && <DefenseSlider />}

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text 
          style={styles.submitButtonText}
          onPress={() => router.push(`/(matchInfo)/review`)}>Submit</Text>
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
  slider: {
    width: 200, 
    height: 40,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'BPoppins',
    fontSize: 32,
    marginBottom: 20,
    marginTop: 70,
  },
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
  
  // ... Other styles remain the same
});

export default MatchInfo;
