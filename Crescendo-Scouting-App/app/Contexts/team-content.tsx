import React from "react";
import { Dispatch, ReactElement, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
//this did not work, switching directions. 

//commenting out to test something

//this file will contain functions which can provide context for other components. 

/*
type contextWrapperType = {
    team?: string;
    //setTeam: Dispatch<SetStateAction<string>>
    regional?: string;
    //setRegional: Dispatch<SetStateAction<string>>
    //children: ReactNode;
}

const teamContext = createContext<contextWrapperType | undefined>(undefined);

//changing up return type to better reflect the information we need. 
function UseTeamContext(): contextWrapperType {
    const context = useContext(teamContext);
    if(!context) {
        throw new Error("useTeamContext must be used with a contextProvider");
    }
    return context;
}

const TeamContextProvider = (props: {children}): ReactElement => {
    //provides a context for the team number and regional. 
    // const [regional, setRegional] = useState("no regional")
    // const [team, setTeam] = useState("no team")

    return <teamContext.Provider /*{...props} value={{regional: props.regional, team: props.team }}/>
};

export {UseTeamContext, TeamContextProvider}
*/
//REDO:
/*
const TeamContext = React.createContext<{
    team?: string | null,
    regional?: string | null, 
}>({
    team: null,
    regional: null,
})

//custom hook
export function useTeamContext() { 
    const value = React.useContext(TeamContext);
    if(!value)
    {
        throw new Error("teamContext must be provided");
    }

    return value;
}

export function TeamContextProvider(props: React.PropsWithChildren)
{
    const [[regional, team], setTeamReg] = useStorageState('temp');

    return (
        <TeamContext.Provider
            value = {{
                regional,
                team,
        }}>
            {props.children}
        </TeamContext.Provider>
    )
}*/

// type contextWrapperType = {
//     team?: string;
//     regional?: string;
// }

// const teamContext = createContext<contextWrapperType | undefined>(undefined);

// export function useTeamContext(): contextWrapperType {
//     const content = useContext(teamContext)
//     if(!content)
//     {
//         throw new Error("teamContext must be provided")
//     }
//     return content;

// }

// export const TeamContextProvider = (props: React.PropsWithChildren) => {
//     const [[team, regional], setTeamReg] = useStorageState('team');

//     return (
//         <teamContext.Provider
//           value={{
//             regional,
//             team,
//           }}>
//           {props.children}
//         </teamContext.Provider>
//       );
//     }


