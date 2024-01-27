import { Link, router } from "expo-router";
import { Pressable, Button, Text, View } from "react-native";


const HomePage = () => {
  return (
    <View>
      <Text>Welcome to 589 Scouting App!</Text>
      <Button onPress = {() => router.push("/regionals/Ventura")} title = "Ventura" />
      <Button onPress = {() => router.push("/regionals/Orange County")} title = "Orange County" />
    </View>
  );
};

export default HomePage;