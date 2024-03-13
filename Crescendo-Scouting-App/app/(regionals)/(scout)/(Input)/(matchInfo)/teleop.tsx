import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable} from 'react-native';
import BackButton from '../../../../backButton';
import { Dropdown } from 'react-native-element-dropdown';
import { router, useGlobalSearchParams } from 'expo-router';
import { Slider } from 'react-native-elements';
import { ref, set } from '@firebase/database';
import { database } from '../../../../../firebaseConfig';


interface DropdownItem {
  label: string;
  value: string;
}


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


const Counter = () => {

  const ClimbingData = [
    { label: 'Nothing', value: 1 },
    { label: 'Taxi', value: 2 },
    { label: 'Single Climb', value: 3 },
    { label: 'Double Climb', value: 4 },
    { label: 'Triple Climb', value: 5 },
  ];
  const [madeCountSpeaker, setMadeCountSpeaker] = useState<number>(0);
  const [missCountSpeaker, setMissCountSpeaker] = useState<number>(0);
  const [madeCountAmp, setMadeCountAmp] = useState<number>(0);
  const [missCountAmp, setMissCountAmp] = useState<number>(0);
  const [groundCount, setGroundCount] = useState<number>(0);
  const [sourceCount, setSourceCount] = useState<number>(0);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedTrapValue, setSelectedTrapValue] = useState<number | 0>(0);
  const [selectedClimbingValue, setSelectedClimbingValue] = useState<string | 1>(1);
  const { regional } = useGlobalSearchParams<{ regional: string }>();
  const { teamNumber } = useGlobalSearchParams<{ teamNumber: string }>();
  const { qualMatch } = useGlobalSearchParams<{ qualMatch: string }>();
  const [dropdownFocus, setDropdownFocus] = useState<{
    [key: string]: boolean;
  }>({});
  const handleFocus = (dropdownKey: string) => {
    setDropdownFocus((prevFocus) => ({
      ...prevFocus,
      [dropdownKey]: true,
    }));
  };
  const [sliderValue, setSliderValue] = useState<number>(0);


  const incrementSpeaker = (type: 'made' | 'miss') => {
    if (type === 'made') {
      setMadeCountSpeaker(prev => prev + 1);
    } else {
      setMissCountSpeaker(prev => prev + 1);
    }
  };

  const incrementAmp = (type: 'made' | 'miss') => {
    if (type === 'made') {
      setMadeCountAmp(prev => prev + 1);
    } else {
      setMissCountAmp(prev => prev + 1);
    }
  };

  const incrementIntake = (type: 'ground' | 'source') => {
    if (type === 'ground') {
      setGroundCount(prev => prev + 1);
    } else {
      setSourceCount(prev => prev + 1);
    }
  };

  const decrementSpeaker = (type: 'made' | 'miss') => {
    if (type === 'made' && madeCountSpeaker > 0) {
      setMadeCountSpeaker(prev => prev - 1);
    } else if (type === 'miss' && missCountSpeaker > 0) {
      setMissCountSpeaker(prev => prev - 1);
    }
  };

  const decrementAmp = (type: 'made' | 'miss') => {
    if (type === 'made' && madeCountAmp > 0) {
      setMadeCountAmp(prev => prev - 1);
    } else if (type === 'miss' && missCountAmp > 0) {
      setMissCountAmp(prev => prev - 1);
    }
  };

  const decrementIntake = (type: 'ground' | 'source') => {
    if (type === 'ground' && groundCount > 0) {
      setGroundCount(prev => prev - 1);
    } else if (type === 'source' && sourceCount > 0) {
      setSourceCount(prev => prev - 1);
    }
  };
  const handleBlur = (dropdownKey: string) => {
    setDropdownFocus((prevFocus) => ({
      ...prevFocus,
      [dropdownKey]: false,
    }));
  };

  const handleSendAllData = () => {
    const path = `${regional}/teams/${teamNumber}/Match-Info/${qualMatch}`;

    set(ref(database, path + '/Teleop/Speaker/Made'), madeCountSpeaker)
    set(ref(database, path + '/Teleop/Speaker/Miss'), missCountSpeaker)
    set(ref(database, path + '/Teleop/Amp/Made'), madeCountAmp)
    set(ref(database, path + '/Teleop/Amp/Miss'), missCountAmp)
    set(ref(database, path + '/Teleop/Intake/Ground'), groundCount)
    set(ref(database, path + '/Teleop/Intake/Source'), sourceCount)
    set(ref(database, path + '/Endgame/Trap'), selectedTrapValue)
    set(ref(database, path + '/Endgame/Climb'), selectedClimbingValue)
  }
  
  return (
    <ScrollView>
      <View>
        <BackButton buttonName="Home Page" />

        <Text style={styles.title}> Teleoperation </Text>
        <View style={styles.container}>

          <Text style={styles.subtitle}>Speaker</Text>
          <View style={styles.borderC}>
            <View style={styles.counterContainer}>
              <CounterControl label="Made" count={madeCountSpeaker} onIncrement={() => incrementSpeaker('made')} onDecrement={() => decrementSpeaker('made')} />
              <CounterControl label="Miss" count={missCountSpeaker} onIncrement={() => incrementSpeaker('miss')} onDecrement={() => decrementSpeaker('miss')} />
            </View>
          </View>

          <Text style={styles.subtitle}>Amp</Text>
          
            <View style={styles.borderC}>
              <View style={styles.counterContainer}>
                <CounterControl label="Made" count={madeCountAmp} onIncrement={() => incrementAmp('made')} onDecrement={() => decrementAmp('made')} />
                <CounterControl label="Miss" count={missCountAmp} onIncrement={() => incrementAmp('miss')} onDecrement={() => decrementAmp('miss')} />
              </View>
            </View>

            <Text style={styles.subtitle}>Intake</Text>
              <View style={styles.borderC}>
                <View style={styles.counterContainer}>
                  <CounterControl label="Ground" count={groundCount} onIncrement={() => incrementIntake('ground')} onDecrement={() => decrementIntake('ground')} />
                  <CounterControl label="Source" count={sourceCount} onIncrement={() => incrementIntake('source')} onDecrement={() => decrementIntake('source')} />
                </View>
              </View>

              <Text style={styles.subtitle}>Trap</Text>
              <View style={styles.container}>
                <View style={styles.border}>
                  <View style={styles.counterContainer}>
                    <View style={styles.numberLine}>
                    </View>
                    <SliderWithNumbers
                      value={sliderValue}
                      onValueChange={(value) => {
                        setSelectedTrapValue(value); // Set the slider value to your trap value
                      }}
                      minValue={0}
                      maxValue={3}
                      step={1}
                      sliderWidth={90} // changes number size
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.subtitle}>Climb</Text>
              <View style={styles.container}>
                <View style={styles.border}>
                  <View style={styles.counterContainer}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue', position: 'relative', bottom: 300 }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      //dont know why this below is an error
                      data={ClimbingData}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Select item' : '...'}
                      value={selectedClimbingValue || '1'}
                      onFocus={() => handleFocus('climbingData')}
                      onBlur={() => handleBlur('climbingData')}
                      onChange={(item: DropdownItem) => {
                        setSelectedClimbingValue(item.value);
                        setIsFocus(false);
                      }}
                    />

                  </View>
                </View>
                <Pressable style={styles.submitButton}>
                  <Text
                    style={styles.submitButtonText}
                    onPress={() => {
                      handleSendAllData();
                      router.push(`/(matchInfo)/postgame?regional=${regional}&teamNumber=${teamNumber}&qualMatch=${qualMatch}`)
                    }}>Post Game</Text>

                </Pressable>
              </View>
        </View>
      </View>
      {/* </View> */}
    </ScrollView>




  );
};

const CounterControl = ({ label, count, onIncrement, onDecrement }: { label: string; count: number; onIncrement: () => void; onDecrement: () => void; }) => (
  <View style={styles.counterControl}>
    
    <Text style={styles.countText}>{label}</Text>
    <View style={styles.line}></View>
    <View style={styles.row}>
    <TouchableOpacity onPress={onDecrement} style={styles.button}>
      <Text style={styles.buttonText}>-</Text>
    </TouchableOpacity>
    <View style={styles.countContainer}>
      <Text style={styles.countNumber}>{count}</Text>
    </View>
    <TouchableOpacity onPress={onIncrement} style={styles.button}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
    </View>
  </View>


);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxWidth: '94%',
  },
  borderC: {
    paddingTop: 20,
    paddingBottom: 8,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxWidth: '100%',
    width: '93%',
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
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterControl: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#blue',
    marginHorizontal: '4%',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25,
    color: 'rgba(0, 130, 190, 255)',
    fontFamily: 'BPoppins',
    marginTop: -12,
  },
  countContainer: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 18,
    fontFamily: 'BPoppins',
  },
  countNumber: {
    fontSize: 30,
    fontFamily: 'BPoppins',
    marginTop: -5,
  },
  line: {
      borderBottomWidth: 2,       // Adjust the width as needed
      marginVertical: -2,         // Adjust the vertical margin as needed
      marginBottom: '6%',
      width:100,
      borderRadius:10,
      color:'#00bcf0',
    
  },
  numberLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dropdown: {
    height: 50,
    width: '99%', // or some other appropriate width
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // Add margin for some spacing if needed
    marginTop: 10,
    marginBottom: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 40,
    marginBottom:40,
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
  sliderWrapper: {
    width: '80%', // Adjust as needed
    alignItems: 'center',
    marginRight: 40,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 30,
  },
  sliderMarkersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '95%',
    paddingLeft: '0%',
    paddingRight: '15%',
    position: 'absolute',
    bottom: 0,
  },
  markerText: {
    fontSize: 12,
    color: 'rgba(127, 127, 127, 255)',
  },
  row: {
    flexDirection: 'row',
  },
  thumbStyle: {
    width:20,
    height: 20,
  }
});

export default Counter;
