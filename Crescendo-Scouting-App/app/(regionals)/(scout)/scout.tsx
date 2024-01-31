// import { Link, router } from "expo-router";
// import { SafeAreaView, Pressable, Button, Image, Text, View, StyleSheet, TextInput } from "react-native";
// import React from 'react';
// import { useFonts } from 'expo-font';

// const Scout = () => {
//   const [fontLoaded] = useFonts({

//     'BPoppins': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
//   });
//   if (!fontLoaded) {
//     return <View style={styles.container}><Text>Loading...</Text></View>; // Or some other loading indicator
//   }
//   // const [number, onChangeNumber] = React.useState('0');
//   // const [text, onChangeText] = React.useState('0');
  
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Hello!</Text>
//       <Text style={styles.subtitle}>Welcome to 589 Scouting App!</Text>

//     {/* <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text}
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeNumber}
//         value={number}
//         placeholder="useless placeholder"
//         keyboardType="numeric"
//       />
//     </SafeAreaView> */}

      
//       {/* <Button onPress = {() => router.push("/(Input)/robotInfo")} title = "Robot Information" />
//       <Button onPress = {() => router.push("/(Input)/matchInfo")} title = "Match Information" /> */}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Makes sure the container takes up the whole screen
//     justifyContent: 'center', // Centers content vertically in the container
//     alignItems: 'center', // Centers content horizontally in the container
//     padding: 20, // Optional: Adds padding to the container
//   },
//   title:{
//     fontFamily: 'BPoppins',
//     fontSize: 32,
//     marginBottom: 30,
//   },
//   subtitle:{
//     fontFamily: 'BPoppins',
//     fontSize: 15,
//     color: 'rgba(0, 168, 240, 255)',
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
//     paddingHorizontal: 82,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'rgba(0, 130, 190, 255)',
//     borderWidth: 1,
//     borderColor: 'white',
//   },
//   // buttonTwo: {
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   paddingVertical: 12,
//   //   paddingHorizontal: 52,
//   //   borderRadius: 4,
//   //   elevation: 3,
//   //   backgroundColor: 'white',
//   //   borderWidth: 1,
//   //   borderColor: 'rgba(0, 130, 190, 255)',
//   //   marginTop: 10, // Adds space between buttons
//   // },
//   buttonOneText: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//     fontFamily: 'BPoppins',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#777',
//     padding: 8,
//     margin: 10,
//     width: 200,
//   }
//   // buttonTwoText: {
//   //   fontSize: 16,
//   //   lineHeight: 21,
//   //   fontWeight: 'bold',
//   //   letterSpacing: 0.25,
//   //   color: 'rgba(0, 130, 190, 255)',
//   //   fontFamily: 'BPoppins',
//   // },
// });


// export default Scout;