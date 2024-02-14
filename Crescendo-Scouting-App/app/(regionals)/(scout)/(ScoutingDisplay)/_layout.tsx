import { Stack, Tabs } from "expo-router";
//import { UseTeamContext } from "../../../Contexts/team-content";
import { useContext } from "react";
//import { RegionalContext, TeamContext } from "../../../Contexts/teamRegContext";

const OutputLayout = (regional: string, team: string | undefined) => {
    return (

            <Tabs screenOptions = {{headerShown: false,}}>
                <Tabs.Screen
                    name = "matchDisplay"
                    //changed name to match destination filename after a warning.
                />
                <Tabs.Screen
                    name = "robotDisplay"
                    //changed name to match destination filename after a warning.
                />
                
            </Tabs>

    );
};

export default OutputLayout;