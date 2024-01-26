import { Link, router } from "expo-router";
import { Pressable, Button, Text, View } from "react-native";


const HomePage = () => {
  return (
    <View>
      <Text>Welcome to 589 Scouting App!</Text>
      <Button onPress = {() => router.push("/regionals")} title = "Ventura" />
      <Button onPress = {() => router.push("/(tabs)/users/1")} title = "Orange County" />
    </View>
  );
};

export default HomePage;