import { Link, router } from "expo-router";
import { Pressable, Button, Text, View } from "react-native";


const Scout = () => {
  return (
    <View>
      <Text>Scout!</Text>
      <Button onPress = {() => router.push("/(Input)/robotInfo")} title = "Robot Information" />
      <Button onPress = {() => router.push("/(Input)/matchInfo")} title = "Match Information" />
    </View>
  );
};

export default Scout;