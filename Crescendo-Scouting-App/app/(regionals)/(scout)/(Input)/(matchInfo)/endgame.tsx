import { Link, router } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../../backButton";


const matchInfo = () => {
  return (
    <View>
      <BackButton buttonName="Home Page" />
      <Text>Plese Input the End Game Information!</Text>
      <Pressable
            style={styles.buttonOne}
            onPress={() => router.push(`/(matchInfo)/postgame`)}
            >
                <Text style={styles.buttonOneText}>Post Game</Text>
            </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonText:{
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'white',
    marginBottom: 30,
  },
  backButton: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 82,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonOne: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 53,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonOneText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'BPoppins',
  },
});

export default matchInfo;