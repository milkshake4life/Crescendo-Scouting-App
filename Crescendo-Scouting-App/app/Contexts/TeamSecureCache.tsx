// this file will be used to provide info regarding team and regional via a cache

// //to fix errors, npm install expo-secure-store
import * as SecureStore from 'expo-secure-store'
import * as React from 'react'

//1. store state value using setItemAsync
//2. use the stored values (key: team, regional and value: from dropdown) inside the pages
//3. upon exiting the app, delete the values and their keys to keep everything efficient. 

//SECURE STORE DOES NOT WORK WITH WEB DEBUGGING UNLESS IT IS SET UP TO DO SO
//(i did not do the setup)

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
const retrieveRegional = async (): Promise<string | null> => {
    let regional = await SecureStore.getItemAsync("regional"); //dynamic keys aren't needed because user can only view one team at one regional at once, so we never need to store more than one team and one regional

    //logs for debugging
    console.log("regional: " + regional);
   
    if (!regional)
    {
        throw new Error("no regional has been stored locally.")
    }
    return regional;
}

//retrieves the value stored under "team".
//returns a promise for a value because this runs asynchronously. This means that if you want to use this value, you have to use either .then(() => {}) with a callback function, or await in order
//to ensure the promise is fulfilled. See matchDisplay and robotDisplay for examples of how you can retrieve these values for use in a component (it involves state and useEffect)
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



//exports all of the SecureStore functions above
export {storeSecureTeam, retrieveRegional, retrieveTeam, deleteTeamKeys,}; 

//matchDisplay and robotDisplay no longer depend on route queries for information, but rather can draw it directly from the app. 
//plan is to delete team and regional information stored in the keys upon exit of a page, since users cant view more than one team at one regional at once
//this will keep everything storage efficient (hopefully)


//from regional:
//a dysfunctional back button w/ deletion, which is actually unnecessary due to reasons described in [regional].tsx
    // <Pressable 
    // style={styles.backButton}
    // onPress={async () => {

    // //async await used to ensure team keys are deleted before router.back is called. 
    // await deleteTeamKeys;
    // router.back()

    // }}>
    // <Image style = {styles.backButtonIcon} source={require('./../../assets/images/back_arrow.png')} />
    // </Pressable>