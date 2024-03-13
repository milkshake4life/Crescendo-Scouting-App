import { Link, router } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import BackButton from "../../../backButton";


const matchInfo = () => {
  return (
    <View>
      <BackButton buttonName="Home Page" />
      <Text>Please input the match information.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default matchInfo;