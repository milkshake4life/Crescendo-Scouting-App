import { Tabs } from "expo-router";

const tabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="list" />
        </Tabs>
    );
};