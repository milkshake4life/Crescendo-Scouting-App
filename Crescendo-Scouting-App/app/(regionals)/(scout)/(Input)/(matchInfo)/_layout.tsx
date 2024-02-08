import { Stack, Tabs } from "expo-router";

const InputLayout = () => {
    return (
        <Stack screenOptions = {{headerShown: false,}}>
            <Stack.Screen
                name = "auto"
            />
            <Stack.Screen
                name = "teleop"
            />
            <Stack.Screen
                name = "endgame"
            />
            <Stack.Screen
                name = "postgame"
            />
            <Stack.Screen
                name = "thanks"
            />
        </Stack>
    );
};

export default InputLayout;