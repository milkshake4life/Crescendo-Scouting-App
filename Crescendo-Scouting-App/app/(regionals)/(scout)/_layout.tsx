import { Stack } from "expo-router";

const ScoutLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name = "scout" 
                options = {{
                    headerShown: false,
                    headerTitle: "Scouting"
                }}
            />
            <Stack.Screen 
                name = "scoutInfo" 
                options = {{
                    headerShown: false,
                    headerTitle: "Scouting Information"
                }}
            />
        </Stack>
    );
};

export default ScoutLayout;