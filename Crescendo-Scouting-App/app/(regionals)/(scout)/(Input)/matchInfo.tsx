import { Link, router } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";


const matchInfo = () => {
  return (
    <View>
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Home Page</Text>
      </Pressable>
      <Text>Plese Input the Match Information!</Text>
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
});

export default matchInfo;