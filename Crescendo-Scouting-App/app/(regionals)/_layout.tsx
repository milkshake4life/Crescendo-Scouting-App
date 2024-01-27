import { Stack } from "expo-router";

const RegionalLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name = "(regionals)" 
                options = {{
                    headerShown: true,
                    headerTitle: "Regional"
                }}
            />
            <Stack.Screen 
                name = "(scout)" 
                options = {{
                    headerShown: false,
                    headerTitle: "Regional"
                }}
            />
        </Stack>
    );
};

export default RegionalLayout;