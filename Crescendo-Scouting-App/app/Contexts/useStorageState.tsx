// //this file will be used to provide info regarding team and regional
// //to the context provider via tokens

// //to fix errors, npm install expo-secure-store
import * as SecureStore from 'expo-secure-store'
import * as React from 'react'
import { Platform } from 'react-native';
import { useState } from 'react';

//commenting out to redo the storage state stuff. 
//1. store state value using setItemAsync
//2. use the stored values (key: team, regional and value: from dropdown) as context providers?
//or use the stored values directly as keys via getItemAsync, then setting the route to the values
//using .then?
//3. upon exiting the app, delete the values and their keys to keep everything efficient. 

//SECURE STORE DOES NOT WORK WITH WEB DEBUGGING UNLESS IT IS SET UP TO DO SO

//state variables

//maybe we instead pass in the team and teamkey as params rather than as state (since they won't
//change before getting deleted)
// const [teamKey, setTeamKey] = React.useState(undefined);
// const [team, setTeam] = React.useState();
// const [regKey, setRegKey] = React.useState();
// const [regional, setRegional] = React.useState();

//state variables used to store values 
//NEED TO USE STATE IN ORDER TO GET DATA IN TERMS OF STRINGS RATHER THAN PROMISES
//see: https://www.reddit.com/r/typescript/comments/umklpc/how_do_i_convert_promisestring_object_to_string/

// const [regional, setRegional] = React.useState<string | null>(null);
// const [team, setTeam] = React.useState<string | null>(null);

//stores both team number and regional under the keys "team" and "regional" respectively
const storeSecureTeam = async (teamNum: string | null, regional: string) => {
    if(!teamNum || !regional)
    {
        throw new Error("Provided team number or regional does not exist")
    }
    else
    {
        await SecureStore.setItemAsync("team", teamNum);
        await SecureStore.setItemAsync("regional", regional);
        console.log("values stored successfully");    
    }
}




//retrieves the value stored under "regional"
const retrieveRegional = async () /* Promise<string | null> */ => {
    let regional = await SecureStore.getItemAsync("regional");
    //setRegional(result);
    //below uses .then, which is mutually exclusive with await
    // SecureStore.getItemAsync("regional").then((regional: string | null) => {
    //     return setRegional(regional);
    // })
    
    console.log("regional: " + regional)
    //setRegional(regional)
   
    if (!regional)
    {
        throw new Error("no regional has been stored locally.")
    }
    return regional;
}

//retrieves the value stored under "team"
const retrieveTeam = async (): Promise<string | null> => {
    let team = await SecureStore.getItemAsync("team")
    //setTeam(team);
    console.log("team: " + team)
    if (!team)
    {
        throw new Error("no team has been stored locally.")
    }
    return team;
}

//regional accessed before team and regional data stored?
//deletes the team and regional stored under "team" and "regional"
const deleteTeamKeys = async () => {
    await SecureStore.deleteItemAsync("team");
    await SecureStore.deleteItemAsync("regional");
    console.log("key values have been deleted")
}




export {storeSecureTeam, retrieveRegional, retrieveTeam, deleteTeamKeys,}; 

// type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

// function useAsyncState<T>(
//     initialValue: [boolean, T | null] = [true, null],
// ): UseStateHook<T> {
//     return React.useReducer(
//         (state: [boolean, T| null], action: T | null = null):  [boolean, T | null] => [false, action],
//         initialValue
//     ) as UseStateHook<T>;
// }

// export async function setStorageItemAsync(key: string, value: string | null) {
//     if(Platform.OS === 'web')
//     {
//         try {
//             if (value === null) {
//                 localStorage.removeItem(key);
//             } else {
//                 localStorage.setItem(key, value)
//             }
//         } catch (e) {
//             console.error('Local storage is unavailable:', e);
//         }
//     } else {
//         if (value == null) {
//             await SecureStore.deleteItemAsync(key);
//         } else {
//             await SecureStore.setItemAsync(key, value);
//         }
//     }
// }

// export function useStorageState(key: string): UseStateHook<string> {
//     const [state, setState] = useAsyncState<string>();

//     React.useEffect(() => {
//         if(Platform.OS === 'web') {
//             try {
//                 if (typeof localStorage !== 'undefined') {
//                     setState(localStorage.getItem(key));
//                 }
//             } catch (e) {
//                 console.error('Local storage is unavailable:', e);
//             }
//         } else {
//             SecureStore.getItemAsync(key).then(value => {
//                 setState(value);
//             });
//         }
//     }, [key]);

//     //setting values in local storage:
//     const setValue = React.useCallback(
//         (value: string | null) => {
//             setState(value);
//             setStorageItemAsync(key, value);
//         },
//         [key]
//     );

//     return [state, setValue]
// }


