import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, Image } from "react-native";
import BackButton from "../../../../backButton";


const matchInfo = () => {
  const { regional } = useGlobalSearchParams<{ regional: string }>();

  return (
    <View style={styles.container}>
      <Image source={require('../../../../../assets/images/589Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Thank you!</Text>
      <Pressable
            style={styles.buttonOne}
            onPress={() => router.push(``)}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: 'center', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
  },
  title:{
    fontFamily: 'BPoppins',
    fontSize: 32,
    marginBottom: 20,
  },
  logo: {
    width: 270,  // specify a width
    height: 270, // and a height for your image
    marginBottom: 20,
    // add other styling as needed
  },
  buttonOne: {
    marginTop: "20%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 82,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 1,
    borderColor: 'rgba(0, 130, 190, 255)',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'BPoppins',
  },
});

export default matchInfo;