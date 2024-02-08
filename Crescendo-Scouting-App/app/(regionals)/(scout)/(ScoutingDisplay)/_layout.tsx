import { Stack, Tabs } from "expo-router";

const OutputLayout = () => {
    return (
        //tabs are a stack, so we can remove headers in the same method
        <Tabs screenOptions = {{headerShown: false,}}>
            <Tabs.Screen
                name = "matchStats"


                //Could useContext on regional + team number to pass into hrefs. 
            //     options={{
            //         // Ensure the tab always links to the same href.
            //         href: '/evanbacon',
            //         // OR you can use the Href object:
            //         href: {
            //           pathname: '/[user]',
            //           params: {
            //             user: 'evanbacon',
            //           },
            //         }
            //     }
            // }
            />
            <Tabs.Screen
                name = "robotInfo"
            />
            
        </Tabs>
    );
};

export default OutputLayout;