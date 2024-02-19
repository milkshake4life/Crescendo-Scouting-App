import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <Stack screenOptions = {{headerShown: false, contentStyle: {
            // flex: 1,
            // backgroundColor: 'white', // Set the background color here
          },
        }}>
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