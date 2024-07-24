import { Link, router, useGlobalSearchParams, useLocalSearchParams, } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, } from "react-native";
import BackButton from "../../../../Components/backButton";
import React, { useEffect, useMemo, useState } from "react";
import { ref, set } from "@firebase/database";
import { database } from "../../../../../firebaseConfig";


interface Note {
  id: string;
  color: 'orange' | 'green';
  used: boolean;
}

const matchInfo: React.FC = () => {
  //Backend Value Constants
  // const IntakeStatus = [
  //   { label: 'No Attempt', value: '0' },
  //   { label: 'Missed', value: '1' },
  //   { label: 'Successful', value: '2' },
  // ];

  // const ActionName = [
  //   { label: 'No Action', value: '0' },
  //   { label: 'Amp Made', value: '1' },
  //   { label: 'Amp Missed', value: '2' },
  //   { label: 'Speaker Made', value: '3' },
  //   { label: 'Speaker Missed', value: '4' },
  // ];

  //backend values
  const noteStatus = [
    { label: 'Missed', value: '0'},
    { label: 'Made', value: '1'}
  ];

  //Backend Value State vars
  // const [currentNoteName, setCurrentNoteName] = useState<number>(0);
  // Might need states for every single note to update all of them at once
  const [noteName, setNoteName] = useState<string>('');

  // const [action, setAction] = useState<string>('')

  const [intake, setIntake] = useState<number>(0);
  const [action, setAction] = useState<number>(0);
  const [taxiStatus, setTaxiStatus] = useState<number>(0);


  const { alliance } = useGlobalSearchParams<{ alliance: string }>();
  const { regional } = useGlobalSearchParams<{ regional: string }>();
  const { teamNumber } = useGlobalSearchParams<{ teamNumber: string }>();
  const { qualMatch } = useGlobalSearchParams<{ qualMatch: string }>();
  const [notes, setNotes] = useState<Note[]>([
    { id: 'S1', color: 'orange', used: false },
    { id: 'S2', color: 'orange', used: false },
    { id: 'S3', color: 'orange', used: false },
    { id: 'R', color: 'orange', used: false },
    { id: 'M1', color: 'orange', used: false },
    { id: 'M2', color: 'orange', used: false },
    { id: 'M3', color: 'orange', used: false },
    { id: 'M4', color: 'orange', used: false },
    { id: 'M5', color: 'orange', used: false },
  ]);
  const [buttonPresses, setButtonPresses] = useState<string[]>([]);
  // const isAnyNoteGreen = notes.some(note => note.color === 'green');
  const [taxiPressed, setTaxiPressed] = useState<boolean>(false);
  const { leftNotes, rightNotes } = useMemo(() => {
    const sNotes = notes.filter(note => note.id.startsWith('S') || note.id.startsWith('R'));
    const mNotes = notes.filter(note => note.id.startsWith('M')); // Include "R" in mNotes for simplicity

    return alliance === "Red" ? { leftNotes: mNotes, rightNotes: sNotes } : { leftNotes: sNotes, rightNotes: mNotes };
  }, [notes, alliance]);

  //state variable which determines whether or not the robot curently has a note (true if robot intake was successful)
  const [hasNote, setHasNote] = useState<boolean>(true);

  const handlePressNote = (noteId: string): void => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id === noteId) {
          // Toggle the color of the clicked note
          return { ...note, color: note.color === 'green' ? 'orange' : 'green' };
        } else {
          // Keep the color unchanged for other notes
          return note;
        }
      })
    );
  };
  

  const handleTaxiPress = (item: string): void => {
    if (taxiPressed) {
      setTaxiPressed(false);
      return;
    }
    setTaxiPressed(true);
    return;
  }

  const handleSendAutoData = () => {

    //each note is a "directory", and stores two sets of values
    const path = `${regional}/teams/${teamNumber}/Match-Info/${qualMatch}`;

    const allNotes: string[] = ["S1", "S2", "S3", "M1", "M2", "M3", "M4", "M5", "R"]
    //value 1: missed / made(0/1)
    //value 2: didnt taxi/taxi (0/1) | will be pushed directly to match qual directory w/o note info because it is independent of note. 
    let action = 0;
    let taxiStatus = 0;

    //sets default values
    allNotes.map((note) => {

        // set(ref(database, path + `/Auto/${note}/Intake`), intake);
        set(ref(database, path + `/Auto/${note}/Action`), action); 
        
    })

    // Handle Taxi separately
    if(taxiPressed)
    {
      taxiStatus = 1;
    }
    set(ref(database, path + `/Auto/Taxi`), taxiStatus);


    //Goes through notes array (actions list at the bottom) and assigns values based on whether or not note is green. 
    //Each note is its own directory in firebase, where attempt data is stored. 
    notes.map((currentNote) => {
      if(currentNote.color === "green")
      {
        action = 1;
        console.log(action)
        set(ref(database, path + `/Auto/${currentNote.id}/Action`), action);
      }
    })
  }

  console.log(qualMatch + " seating: " + alliance);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.title}>Autonomous</Text>


        <View style={styles.border}>
        <Pressable onPress={() =>
            // backgroundColor: 'rgba(0, 130, 190, 255)'
            handleTaxiPress('TAXI')} 
            style={
              {
                backgroundColor: !taxiPressed ? 'rgba(0, 130, 190, 255)' : 'rgba(0, 59, 73, 94)', // Button color
                paddingHorizontal: '20%',
                paddingVertical: 10,
                marginVertical: 5, // Adjust for space between buttons
                marginLeft: 5,//PLEASE CHANGE THIS 
                marginRight: 5,
                alignContent: 'center',
              }
            }>
            <Text style={styles.buttonText}>Taxi</Text>
        </Pressable>
        <View style={styles.notesContainer}>
          {/* Left Column */}
          <View style={styles.notesColumn}>
            {leftNotes.map((note) => (
              <Pressable
                key={note.id}
                onPress={() => handlePressNote(note.id)}
                disabled={note.used}
                style={[styles.noteWrapper, note.used && styles.usedNote]}
              >
                <View style={[styles.noteBase, { borderColor: note.color }]}>
                  <Text style={styles.noteText}>{note.id.toUpperCase()}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Right Column */}
          <View style={styles.notesColumn}>
            {rightNotes.map((note) => (
              <Pressable
                key={note.id}
                onPress={() => handlePressNote(note.id)}
                disabled={note.used}
                style={[styles.noteWrapper, note.used && styles.usedNote]}
              >
                <View style={[styles.noteBase, { borderColor: note.color }]}>
                  <Text style={styles.noteText}>{note.id.toUpperCase()}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        </View>

       
        <Pressable
          style={styles.buttonOne}
          onPress={() => {
            handleSendAutoData();
            router.push(`/(matchInfo)/teleop?regional=${regional}&teamNumber=${teamNumber}&qualMatch=${qualMatch}`)
          }
        }       
        >
          <Text style={styles.buttonOneText}>Teleoperation</Text>
        </Pressable>
      </View>
    </ScrollView >
  );
};

/*
 <View style={styles.border}>
          <Text style={styles.listTitle}>List</Text>
          {buttonPresses.map((press, index) => (
            <Pressable key={index}  style={styles.listItemContainer}> 
            {/* onPress={() => handleDeletePress(index)} THis goes above, check past code for reference}
            <Text style={styles.listItem}>{press}</Text>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
        ))}
      </View>

*/

const styles = StyleSheet.create({
  title: {
    fontFamily: 'BPoppins',
    fontSize: 40,
    textAlign: 'center',
    marginTop: -45,
    marginBottom: 30,
  },
  buttonOne: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 53,
    borderRadius: 4,
    backgroundColor: "rgba(0, 130, 190, 255)",
    borderWidth: 2,
    borderColor: "rgba(0, 130, 190, 255)",
  },
  buttonOneText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "BPoppins",
  },
  speakerButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)', // Button color
    paddingHorizontal: '15%',
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 5,//PLEASE CHANGE THIS 
    marginRight: 5,
    alignContent: 'center',
  },
  speakerMissButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)', // Button color
    paddingHorizontal: '7%',
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 5,//PLEASE CHANGE THIS 
    marginRight: 5,
    alignContent: 'center',
  },
  ampButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)', // Button color
    paddingHorizontal: '19%',
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 5,//PLEASE CHANGE THIS 
    marginRight: 5,
    alignContent: 'center',
  },
  ampMissButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)', // Button color
    paddingHorizontal: '11%',
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 5,//PLEASE CHANGE THIS 
    marginRight: 5,
    alignContent: 'center',
  },
  intakeButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)', // Button color
    paddingHorizontal: '17%',
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 5,//PLEASE CHANGE THIS 
    marginRight: 5,
    alignContent: 'center',
  },
  intakeMissButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)', // Button color
    paddingHorizontal: '9%',
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 5,//PLEASE CHANGE THIS 
    marginRight: 5,
    alignContent: 'center',
  },
  //moving taxibutton to change conditionally based on button press
  taxiButton: {
    backgroundColor: 'rgba(0, 130, 190, 255)', // Button color
    paddingHorizontal: '20%',
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 5,//PLEASE CHANGE THIS 
    marginRight: 5,
    alignContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    width: "100%",
  },
  listTitle: {
    fontSize: 20,
    fontFamily:'BPoppins',
    marginBottom: 10,
    textAlign: 'center',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6E5E5', // Apply background color to the entire item
    marginBottom: 5,
    padding: 10, // Add padding inside the item for spacing
    borderRadius: 5, // Optional: for rounded corners
  },
  listItem: {
    color: '#000', // Text color for the list item
    fontFamily: 'BPoppins',
    flex: 1, // Allows text to fill the row and push the "X" to the end
  },
  closeButtonText: {
    color: '#333', // Color for the "X"
    fontFamily:'BPoppins',
    marginLeft: 10, // Ensure spacing between the text and "X"
  },
  usedNote: {
    backgroundColor: '#E6E5E5', // Gray background for used notes
  },
  notesContainer: {
    flexDirection: 'row', // Align columns side by side
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
  },
  notesColumn: {
    flexDirection: 'column', // Arrange notes vertically
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noteWrapper: {
    marginVertical: 10, // Adjust spacing between notes
  },
  noteBase: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteText: {
    // Your text style here
    color: 'black', // Choose the text color that suits your design
    // Position the text in the center of the ring
    position: 'absolute',
    textAlign: 'center',
    width: '100%', // Ensure the text is centered in the ring
    lineHeight: 40, // Adjust line height to vertically center text in the ring
    fontFamily: "BPoppins",
  },
  border: {
    padding: 10,
    borderRadius: 10, //curves
    borderWidth: 3,
    borderColor: 'rgba(0, 130, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom:9,
  },
  buttonrow: {
    flexDirection: 'row',
  }
});

export default matchInfo;



//   const handlePress = (item: string): void => {
//     //Taxi entry
//     if (item === 'TAXI') {
//       if (taxiPressed) {
//         return;
//       }
//       setButtonPresses(currentPresses => [...currentPresses, item]);
//       setTaxiPressed(true);
//       return;
//     }

//     if (!isAnyNoteGreen) {
//       // Optionally, provide feedback to the user that a note needs to be selected first.
//       return;
//     }

//     // Step 1: Find the currently green note
//     const greenNoteIndex = notes.findIndex(note => note.color === 'green');
//     console.log(greenNoteIndex)

//     // If there's a green note, prepare the entry for the buttonPresses and update the notes state
//     if (greenNoteIndex !== -1) {
//       const greenNote = notes[greenNoteIndex];
//       const entry = `${greenNote.id.toUpperCase()} - ${item}`;

//       // Step 2: Add the entry to buttonPresses
//       setButtonPresses(currentPresses => [...currentPresses, entry]);
//       //maybe swap this guy?

//       // Step 3: Mark the note as used and reset its color
//       // Note: Since we're directly modifying the state based on the previous state,
//       // it's better to use the functional update form of the setState hook.

//       //IF THE NOTE IS R, THIS IS ALREADY TRUE, SO IT SHOULD JUST TRIGGER THE INTAKE FUNCTION IMMEDIATELY
//       if(item === 'Intake')
//       {
//         //Conditionally resets the color based on intake status of the robot. If the robot intakes a note,
//         //selection of other notes is disabled until another button is pressed. After the second action log for the intake
//         //note, the note is marked as used.  
//         setNotes(currentNotes =>
//           currentNotes.map((note, index) => 
//               index === greenNoteIndex ? { ...note, color: 'green', used: false } : note
//           )
//         );
        
//         //log for debugging
//         console.log("note: " + greenNote + "green note entry: " + entry);
//       }
//       else
//       {
//         setNotes(currentNotes =>
//           currentNotes.map((note, index) => 
//               index === greenNoteIndex ? { ...note, color: 'orange', used: true } : note
//           )
//         );
//         setHasNote(false);
//       }
//       //maybe disable intake push if setHasNote is true?
//   }
//   else {
//     // If no note is green, just add the item
//     setButtonPresses(currentPresses => [...currentPresses, item]);
//   }
// };

//   const handleDeletePress = (index: number) => {
//     const entry = buttonPresses[index];

//     // Check if the entry directly matches special cases like "TAXI"
//     if (entry === 'TAXI') {
//       setTaxiPressed(false);
//     } else {
//       // Assuming the format is "NOTEID - ACTION" (e.g., "R - Speaker")
//       const noteIdPattern = entry.split(' - ')[0].toLowerCase(); // This will extract "r" from "R - Speaker"
//       const matchedNote = notes.find(note => note.id.toLowerCase() === noteIdPattern);

//       if (matchedNote) {
//         // If a matching note is found, update its 'used' state
//         setNotes(currentNotes =>
//           currentNotes.map(note =>
//             note.id.toLowerCase() === noteIdPattern ? { ...note, used: false } : note
//           )
//         );
//       }
//     }

//     // Remove the entry from the list regardless of the type
//     setButtonPresses(currentPresses => currentPresses.filter((_, i) => i !== index));
//   };

//   const handleSendAutoData = () => {

//     //each note is a "directory", and stores two sets of values
//     const path = `${regional}/teams/${teamNumber}/Match-Info/${qualMatch}`;

//     const allNotes: string[] = ["S1", "S2", "S3", "M1", "M2", "M3", "M4", "M5", "R"]
//     //value 1: didnt use/missed intake/successful intake (0/1/2)
//     //value 2: didnt use/amp made/amp missed/speaker made/speaker missed (0/1/2/3/4) 
//     //value 3: didnt taxi/taxi (0/1) | will be pushed directly to match qual directory w/o note info because it is independent of note. 
//     let action = 0;
//     let intake = 0;
//     let taxiStatus = 0;

//     //sets default values
//     allNotes.map((note) => {

//       if(note === "R") //R starts already in the robot, so no intake data is necessary
//       {
//         set(ref(database, path + `/Auto/${note}/Action`), action); 
//       }
//       else
//       {
//         set(ref(database, path + `/Auto/${note}/Intake`), intake);
//         set(ref(database, path + `/Auto/${note}/Action`), action); 
//       }
        
//     })

//     // Handle Taxi separately
//     set(ref(database, path + `/Auto/Taxi`), taxiStatus);


//     //Goes through buttonPresses array (actions list at the bottom) and assigns values based on what the user has put in the list. 
//     //Each note is its own directory in firebase, where intake and action data is stored. 
//     buttonPresses.map((entry) => { 
//       let entryArr = entry.split(" - ");
      
//       console.log(entryArr[0] + ", item: " + entryArr[1])
//       if(entryArr[1] === "Intake" && entryArr[0] != "R")
//       {
//         console.log(entryArr[0] + ": Intake");
//         intake = 2;
//         console.log(intake);
//         set(ref(database, path + `/Auto/${entryArr[0]}/Intake`), intake);
//       }
//       else if(entryArr[1] === "MISSED Intake" && entryArr[0] != "R") //since R is the note the robot starts with, it doesn't need intake stats. 
//       {
//         console.log(entryArr[0] + ": Missed Intake");
//         intake = 1;
//         console.log(intake);
//         set(ref(database, path + `/Auto/${entryArr[0]}/Intake`), intake);

//       }
//       else if(entryArr[1] === "AMP")
//       {
//         console.log(entryArr[0] + ": AMP");
//         action = 1;
//         console.log(action);
//         set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);

//       }
//       else if(entryArr[1] === "MISSED AMP")
//       {
//         action = 2;
//         console.log(entryArr[0] + ": MISSED AMP");
//         console.log(action);
//         set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);

//       }
//       else if(entryArr[1] === "SPEAKER")
//       {
//         action = 3;
//         console.log(entryArr[0] + ": SPEAKER");
//         console.log(action);
//         set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);

//       }
//       else if(entryArr[1] === "MISSED SPEAKER")
//       {
//         action = 4;
//         console.log(entryArr[0] + ": MISSED SPEAKER");
//         console.log(action);
//         set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);
//       }
//       else if(entryArr[0] === "TAXI")
//       {
//         taxiStatus = 1;
//         console.log(entryArr[0] + ": TAXI");
//         console.log(taxiStatus);
//         set(ref(database, path + `/Auto/Taxi`), taxiStatus);
//       }
      
//     })
//   }



        {/* <View style={styles.border}> */}
        {/* <View style={styles.buttonrow}>
          <Pressable onPress={() => {
            if(hasNote)
            {
              handlePress('SPEAKER')
            }
           }} style={styles.speakerButton}>
            <Text style={styles.buttonText}>Speaker</Text>
          </Pressable>
          <Pressable onPress={() => {
            if(hasNote)
            {
              handlePress('MISSED SPEAKER')
            }
           }} style={styles.speakerMissButton}>
            <Text style={styles.buttonText}>Missed Speaker</Text>
          </Pressable>
          </View> */}

          
        {/* <View style={styles.buttonrow}>
          <Pressable onPress={() => {
            if(hasNote)
            {
              handlePress('AMP')
            }
           }} style={styles.ampButton}>
            <Text style={styles.buttonText}>Amp</Text>
          </Pressable>
          <Pressable onPress={() => {
            if(hasNote)
            {
              handlePress('MISSED AMP')
            }
           }} style={styles.ampMissButton}>
            <Text style={styles.buttonText}>Missed Amp</Text>
          </Pressable> */}
          {/* </View> */}

          
        {/* <View style={styles.buttonrow}>
          <Pressable onPress={() => {
            //Because of batching, setHasNote completes its setting after the handlePress function runs. This means that
            //it can't be used for comparisons in handlePress, which is why item value is used for those comparisons,
            //while hasNote is used for selection logic. 
            
            // setHasNote(true);
            if(!hasNote)
            {
              setHasNote(true);
              handlePress('Intake');
            }
            }} style={styles.intakeButton}>
            <Text style={styles.buttonText}>Intake</Text>
          </Pressable>
          <Pressable onPress={() => {

            if(!hasNote)
            {    
              handlePress('MISSED Intake')
            }
          }
        } style={styles.intakeMissButton}>
            <Text style={styles.buttonText}>Missed Intake</Text>
          </Pressable>
          </View> */}
          
          
        {/* </View> */}
        