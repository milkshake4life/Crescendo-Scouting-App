import { Stack, Tabs } from "expo-router";

const InputLayout = () => {
    return (
        <Stack>
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