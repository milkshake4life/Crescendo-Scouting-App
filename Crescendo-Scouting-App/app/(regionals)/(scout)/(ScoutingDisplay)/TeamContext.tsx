import React, { createContext, useContext, useState, ReactNode } from 'react';

const TeamContext = createContext({
  regional: '',
  teamNumber: '',
  setTeamData: (regional: string, teamNumber: string) => {},
});

export const useTeam = () => useContext(TeamContext);

interface TeamProviderProps {
  children: ReactNode; // Correctly type 'children' as ReactNode
}

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teamData, setTeamData] = useState({ regional: '', teamNumber: '' });

  const handleSetTeamData = (newRegional: string, newTeamNumber: string) => {
    setTeamData({ regional: newRegional, teamNumber: newTeamNumber });
  };

  return (
    <TeamContext.Provider value={{ ...teamData, setTeamData: handleSetTeamData }}>
      {children}
    </TeamContext.Provider>
  );
};
