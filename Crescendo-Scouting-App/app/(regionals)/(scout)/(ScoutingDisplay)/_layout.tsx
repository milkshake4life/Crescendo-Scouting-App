import { Stack, Tabs } from "expo-router";

const OutputLayout = () => {
    return (
        //tabs are a stack, so we can remove headers in the same method
        <Tabs screenOptions = {{headerShown: false,}}>
            <Tabs.Screen
                name = "matchStats"
            />
            <Tabs.Screen
                name = "robotInfo"
            />
            
        </Tabs>
    );
};

export default OutputLayout;