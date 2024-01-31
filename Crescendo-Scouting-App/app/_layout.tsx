import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <Stack screenOptions = {{headerShown: false,}}>
            <Stack.Screen 
                name = "index" 
                options = {{
                    headerShown: false,
                    headerTitle: "Welcome Page"
                }}
            />
            <Stack.Screen 
                name = "(regionals)/[regional]" 
                options = {{
                    headerTitle: "Regional"
                }}
            />
        </Stack>
    );
};

export default RootLayout;