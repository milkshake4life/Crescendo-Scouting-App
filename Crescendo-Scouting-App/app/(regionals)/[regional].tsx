import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Text, View } from "react-native";


const RegionalPage = () => {
    const {regional}  = useLocalSearchParams<{ regional:string } > ();

    return (
        <View>
            <Text>{regional} regional!</Text>
            <Button onPress = {() => router.push("/(regionals)/(scout)/scout")} title = "Scouting" />
            <Button onPress = {() => router.push("/(regionals)/(scout)/scoutInfo")} title = "Scouting Information" />
        </View>
    );
};

export default RegionalPage;