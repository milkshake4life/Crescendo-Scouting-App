import { ReactElement, createContext, useContext } from "react";

const RegionalContext = createContext<string>("");

const TeamContext = createContext<string | undefined>("");

export { RegionalContext, TeamContext }

