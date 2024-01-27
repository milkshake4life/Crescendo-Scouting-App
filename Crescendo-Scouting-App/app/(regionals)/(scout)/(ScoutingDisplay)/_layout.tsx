import { Stack, Tabs } from "expo-router";

const InputLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name = "robotInfo"
            />
            <Tabs.Screen
                name = "matchStats"
            />
        </Tabs>
    );
};

export default InputLayout;