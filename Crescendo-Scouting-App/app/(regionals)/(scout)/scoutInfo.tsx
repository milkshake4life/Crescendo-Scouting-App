import { Link, router, Tabs } from "expo-router";
import { Pressable, Button, Text, View } from "react-native";


const ScoutingInfo = () => {
  return (
    <View>
      <Text>Scouting Info</Text>
      <Button onPress = {() => router.push("/(ScoutingDisplay)/robotDisplay")} title = "Robot Information" />
      <Button onPress = {() => router.push("/(ScoutingDisplay)/matchDisplay")} title = "Match Information" />
      {/* <Tabs>
            <Tabs.Screen
                name = "robotInfo"
            />
            <Tabs.Screen
                name = "matchStats"
            />
        </Tabs> */}
    </View>
  );
};

export default ScoutingInfo;