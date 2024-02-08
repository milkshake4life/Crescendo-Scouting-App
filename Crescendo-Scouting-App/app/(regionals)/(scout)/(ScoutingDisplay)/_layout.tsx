import { Stack, Tabs } from "expo-router";
import { UseTeamContext } from "../../../Contexts/team-content";
import { useContext } from "react";
import { RegionalContext, TeamContext } from "../../../Contexts/teamRegContext";

const OutputLayout = (regional: string, team: string | undefined) => {
    return (
        //tabs are a stack, so we can remove headers in the same method
        //maybe placing tabs in a stack will work, because the stack can use the context?
        <Stack screenOptions = {{headerShown: false,}}>
            <Tabs screenOptions = {{headerShown: false,}}>
                <Tabs.Screen
                    name = "matchStats"
                    options={{
                        href: `/matchDisplay?regional=${regional}teamNumber=${team}`
                    }}

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
                    options={{
                        href: `/robotDisplay?regional=${regional}teamNumber=${team}`
                    }}
                />
                
            </Tabs>
        </Stack>
    );
};

export default OutputLayout;