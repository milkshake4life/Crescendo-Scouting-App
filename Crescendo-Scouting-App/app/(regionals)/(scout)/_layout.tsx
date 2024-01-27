import { Stack } from "expo-router";

const ScoutLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name = "(scout)" 
                options = {{
                    headerShown: true,
                    headerTitle: "Scouting"
                }}
            />
            <Stack.Screen 
                name = "(Input)" 
                options = {{
                    headerShown: false,
                    headerTitle: "Input"
                }}
            />
            <Stack.Screen 
                name = "(ScoutingDisplay)" 
                options = {{
                    headerShown: false,
                    headerTitle: "Input"
                }}
            />
        </Stack>
    );
};

export default ScoutLayout;