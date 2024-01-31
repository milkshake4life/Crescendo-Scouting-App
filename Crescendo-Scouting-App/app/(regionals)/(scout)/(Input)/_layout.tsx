import { Stack, Tabs } from "expo-router";

const InputLayout = () => {
    return (
        <Stack screenOptions = {{headerShown: false,}}>
            <Stack.Screen
                name = "robotInfo"
            />
            <Stack.Screen
                name = "matchStats"
            />
        </Stack>
    );
};

export default InputLayout;