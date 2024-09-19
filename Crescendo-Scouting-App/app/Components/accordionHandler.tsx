import React, { useState, useEffect } from "react";
import { View, Text, Button, LayoutAnimation } from "react-native";
import TeamDisplay from "./TeamDisplay";
import { DataPoint } from "../(regionals)/rankings";

// interface accordionProps {
//     teams: DataPoint[]
// }


const AccordionHandler = (/*teams: DataPoint[]*/ { teams }) => {
    const [openStates, setOpenStates] = useState(teams.map(() => false));

    useEffect(() => {
        // Reset the open states when teams data changes
        setOpenStates(teams.map(() => false));
    }, [teams]);

    const toggleAccordion = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenStates(prevStates =>
            prevStates.map((state, i) => (i === index ? !state : state))
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {teams.map((team, index) => (
            <TeamDisplay
                key={team.key}
                title={team.key}
                isOpen={openStates[index]}
                toggleOpen={() => toggleAccordion(index)}
            >
                <View>
                    <Text>Speaker Accuracy: {team.speaker}</Text>
                    <Text>Amp Accuracy: {team.amp}</Text>
                    <Text>Rank: {team.rank}</Text>
                  </View>
            </TeamDisplay>
            ))}
        </View>
    );
};
 export default AccordionHandler;