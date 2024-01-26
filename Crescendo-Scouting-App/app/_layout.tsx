import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name = "index" 
                options = {{
                    headerShown: true,
                    headerTitle: "Welcome Page"
                }}
            />
            <Stack.Screen 
                name = "regionals" 
                options = {{
                    headerShown: true,
                }}
            />
        </Stack>
    );
};

export default RootLayout;