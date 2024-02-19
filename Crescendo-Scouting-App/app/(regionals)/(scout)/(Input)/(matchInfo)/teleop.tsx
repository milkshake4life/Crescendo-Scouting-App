// import { Link, router } from "expo-router";
// import { Pressable, Button, Text, View, StyleSheet } from "react-native";
// import BackButton from "../../../../backButton";


// const matchInfo = () => {
//   return (
//     <View>
//       <BackButton buttonName="Home Page" />
//       <Text style={styles.title}> Teleoperation </Text>
//       <Pressable
//             style={styles.buttonOne}
//             onPress={() => router.push(`/(matchInfo)/postgame`)}
//             >
//                 <Text style={styles.buttonOneText}>Post Game</Text>
//             </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Makes sure the container takes up the whole screen
//     justifyContent: 'flex-start', // Aligns content to the top of the page
//     alignItems: 'center', // Centers content horizontally in the container
//     padding: 20, // Optional: Adds padding to the container
//   },
//   title:{
//     fontFamily: 'BPoppins',
//     fontSize: 32,  //font size differs from regional page. Regional = 25. 
//     marginBottom: 110,
//     marginTop: 30, //adding top margin to move down the page. 
//   },
//   subtitle:{
//     fontFamily: 'BPoppins',
//     fontSize: 15,
//     color: 'rgba(127, 127, 127, 255)',
//     marginBottom: 30,
//   },
//   logo: {
//     width: 270,  // specify a width
//     height: 270, // and a height for your image
//     marginBottom: 60,
//     // add other styling as needed
//   },
//   buttonOne: {
//     marginTop: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 53,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'rgba(0, 130, 190, 255)',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   buttonTwo: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: 'rgba(0, 130, 190, 255)',
//     marginTop: 10, // Adds space between buttons
//   },
//   buttonOneText: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//     fontFamily: 'BPoppins',
//   },
//   buttonTwoText: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'rgba(0, 130, 190, 255)',
//     fontFamily: 'BPoppins',
//   },
//   backButtonText:{
//     fontFamily: 'BPoppins',
//     fontSize: 15,
//     color: 'white',
//     marginBottom: 30,
//   },
//   // backButton: {
//   //   marginTop: 0,
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   paddingVertical: 12,
//   //   paddingHorizontal: 82,
//   //   borderRadius: 4,
//   //   elevation: 3,
//   //   backgroundColor: 'rgba(0, 130, 190, 255)',
//   //   borderWidth: 1,
//   //   borderColor: 'white',
//   // },
//   backButton: {
//     marginTop: 0,
//     marginBottom: 50, //adding bottom margins to avoid changing the title style
//     //alignItems: 'center',
//     //justifyContent: 'center',
//     //paddingVertical: 12,
//     //paddingHorizontal: 82,
//     paddingRight: 350,
//     borderRadius: 4,
//     elevation: 3,
//     //backgroundColor: 'rgba(0, 130, 190, 255)', //removing background color so we can use an image. 
//     //borderWidth: 1,                            //removing border for same reason as above
//     borderColor: 'white',
//     width: 20,
//     height: 20,
//   }
// });

// export default matchInfo;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../../../../backButton';

const Counter = () => {
  const [madeCount, setMadeCount] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);

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

  return (
    <View>
      <BackButton buttonName="Home Page" />
      <Text style={styles.title}> Teleoperation </Text>
      <View style={styles.container}>
        <Text style={styles.title}>Speaker</Text>
        <View style={styles.counterContainer}>
          <CounterControl label="Made" count={madeCount} onIncrement={() => increment('made')} onDecrement={() => decrement('made')} />
          <CounterControl label="Miss" count={missCount} onIncrement={() => increment('miss')} onDecrement={() => decrement('miss')} />
        </View>
      </View>
    </View>

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
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    color: '#fff',
    fontWeight: 'bold',
  },
  countContainer: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countNumber: {
    fontSize: 18,
  },
});

export default Counter;
