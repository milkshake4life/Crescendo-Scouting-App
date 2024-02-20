import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import BackButton from '../../../../backButton';
import { Dropdown } from 'react-native-element-dropdown';
import { router } from 'expo-router';
import { Slider } from 'react-native-elements';


interface DropdownItem {
  label: string;
  value: string;
}


const Counter = () => {
  const ClimbingData = [
    { label: 'No Climb', value: '1' },
    { label: 'Single Climb', value: '2' },
    { label: 'Double Climb', value: '3' },
    { label: 'Triple Climb', value: '4' },
  ];
  const [madeCount, setMadeCount] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedClimbingValue, setSelectedClimbingValue] = useState<string | null>(null);
  const [dropdownFocus, setDropdownFocus] = useState<{
    [key: string]: boolean;
  }>({});
  const handleFocus = (dropdownKey: string) => {
    setDropdownFocus((prevFocus) => ({
      ...prevFocus,
      [dropdownKey]: true,
    }));
  };
  const[sliderValue,setSliderValue]=useState<number>(0);

  const increment = (type: 'made' | 'miss') => {
    if (type === 'made') {
      setMadeCount(prev => prev + 1);
    } else {
      setMissCount(prev => prev + 1);
    }
  };

  const decrement = (type: 'made' | 'miss') => {
    if (type === 'made' && madeCount > 0) {
      setMadeCount(prev => prev - 1);
    } else if (type === 'miss' && missCount > 0) {
      setMissCount(prev => prev - 1);
    }
  };
  const handleBlur = (dropdownKey: string) => {
    setDropdownFocus((prevFocus) => ({
      ...prevFocus,
      [dropdownKey]: false,
    }));
  };
  // const fontSize = sliderWidth / markers.length;


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
  return (
    <ScrollView>
      <View>
        <BackButton buttonName="Home Page" />

        <Text style={styles.title}> Teleoperation </Text>

        <Text style={styles.subtitle}>Speaker</Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <View style={styles.counterContainer}>
              <CounterControl label="Made" count={madeCount} onIncrement={() => increment('made')} onDecrement={() => decrement('made')} />
              <CounterControl label="Miss" count={missCount} onIncrement={() => increment('miss')} onDecrement={() => decrement('miss')} />
            </View>
          </View>

          <Text style={styles.subtitle}>Amp</Text>
          <View style={styles.container}>
            <View style={styles.border}>
              <View style={styles.counterContainer}>
                <CounterControl label="Made" count={madeCount} onIncrement={() => increment('made')} onDecrement={() => decrement('made')} />
                <CounterControl label="Miss" count={missCount} onIncrement={() => increment('miss')} onDecrement={() => decrement('miss')} />
              </View>
            </View>

            <Text style={styles.subtitle}>Intake</Text>
            <View style={styles.container}>
              <View style={styles.border}>
                <View style={styles.counterContainer}>
                  <CounterControl label="Made" count={madeCount} onIncrement={() => increment('made')} onDecrement={() => decrement('made')} />
                  <CounterControl label="Miss" count={missCount} onIncrement={() => increment('miss')} onDecrement={() => decrement('miss')} />
                </View>
              </View>

              <Text style={styles.subtitle}>Trap</Text>
              <View style={styles.container}>
                <View style={styles.border}>
                  <View style={styles.counterContainer}>
                    <View style={styles.numberLine}>
                      <Text style={styles.number}>0</Text>
                      {/* <Text style={styles.subtitle}>Defense</Text>
                      <View style={styles.sliderContainer}>
      { <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={3}
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
      </View>} */}
    </View>
                      <View style={styles.space} />
                      <Text style={styles.number}>1</Text>

                      <View style={styles.space} />
                      <Text style={styles.number}>2</Text>

                      <View style={styles.space} />
                      <Text style={styles.number}>3</Text>
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
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={ClimbingData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        value={selectedClimbingValue || '5'}
                        searchPlaceholder="Search..."
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
          onPress={() => router.push(`/(matchInfo)/postgame`)}>Post Game</Text>

        </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      {/* </View> */}
    </ScrollView>




  );
};

const CounterControl = ({ label, count, onIncrement, onDecrement }: { label: string; count: number; onIncrement: () => void; onDecrement: () => void; }) => (
  <View style={styles.counterControl}>
    <TouchableOpacity onPress={onDecrement} style={styles.button}>
      <Text style={styles.buttonText}>-</Text>
    </TouchableOpacity>
    <View style={styles.countContainer}>
      <Text style={styles.countText}>{label}</Text>
      <Text style={styles.countNumber}>{count}</Text>
    </View>
    <TouchableOpacity onPress={onIncrement} style={styles.button}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
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
    maxWidth: '95%',
  },
  title: {
    fontFamily: 'BPoppins',
    fontSize: 36,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'BPoppins',
    fontSize: 30,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#blue',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'rgba(0, 130, 190, 255)',
    fontFamily: 'BPoppins',
  },
  countContainer: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 18,
    fontFamily: 'BPoppins',
  },
  countNumber: {
    fontSize: 18,
    fontFamily: 'BPoppins',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'black', // You can change the color as needed
    marginVertical: 10, // Adjust the margin as needed
  },
  numberLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  space: {
    height: 2,
    width: '28%',

  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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


});

export default Counter;
