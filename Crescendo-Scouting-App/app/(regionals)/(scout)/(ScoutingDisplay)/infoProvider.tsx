// // TeamContext.tsx
// import React, { createContext, useState, FC, ReactNode, useContext } from 'react';

// // Define the shape of your context data
// interface TeamContextType {
//   regional: string;
//   teamNumber: string;
//   children: ReactNode;
//   setTeamData: (regional: string, teamNumber: string) => void;
// }

// // Create the context
// export const TeamContext = createContext<TeamContextType>({
//     regional: '',
//     teamNumber: '',
//     setTeamData: () => { },
//     children: undefined
// });

// // Create the provider component
// export const TeamProvider = () => {  const [regional, setRegional] = useState<string>('');
//   const [teamNumber, setTeamNumber] = useState<string>('');
//   const setTeamData = (newRegional: string, newTeamNumber: string) => {
//     setRegional(newRegional);
//     setTeamNumber(newTeamNumber);
//   };

//   return (
//     <TeamContext.Provider value={{ regional, teamNumber, setTeamData }}>
//       {children}
//     </TeamContext.Provider>
//   );
// };
