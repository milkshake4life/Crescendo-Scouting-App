import { ReactElement, createContext, useContext } from "react";


//this file will contain functions which can provide context for other components. 

type contextWrapperType = {
    team?: string;
    regional?: string;
}

const teamContext = createContext<contextWrapperType | undefined>(undefined);

function useTeamContext(): contextWrapperType {
    const context = useContext(teamContext);
    if(!context) {
        throw new Error("useTeamContext must be used with a contextProvider");
    }
    return context;
}

const TeamContextProvider = (props: contextWrapperType): ReactElement => {
    //provides a context for the team number and regional. 
    return <teamContext.Provider value={{regional: props.regional, team: props.team}}/>
};

export {useTeamContext, TeamContextProvider}