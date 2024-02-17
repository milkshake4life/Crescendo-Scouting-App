import { Stack } from "expo-router";

const RegionalLayout = () => {
    return (
        <Stack screenOptions = {{headerShown: false, contentStyle: {
            // flex: 1,
            // backgroundColor: 'white', // Set the background color here
          },
        }}>
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