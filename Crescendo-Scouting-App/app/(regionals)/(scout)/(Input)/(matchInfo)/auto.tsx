import { Link, router, useGlobalSearchParams, useLocalSearchParams, } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, } from "react-native";
import BackButton from "../../../../backButton";
import React, { useEffect, useMemo, useState } from "react";
import { ref, set } from '@firebase/database';
import { database } from '../../../../../firebaseConfig';




interface Note {
  id: string;
  color: 'orange' | 'green';
  used: boolean;
}

const matchInfo: React.FC = () => {
  //Backend Value Constants
  const IntakeStatus = [
    { label: 'No Attempt', value: '0' },
    { label: 'Missed', value: '1' },
    { label: 'Successful', value: '2' },
  ];

  const ActionName = [
    { label: 'No Action', value: '0' },
    { label: 'Amp Made', value: '1' },
    { label: 'Amp Missed', value: '2' },
    { label: 'Speaker Made', value: '3' },
    { label: 'Speaker Missed', value: '4' },
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
    { id: 's1', color: 'orange', used: false },
    { id: 's2', color: 'orange', used: false },
    { id: 's3', color: 'orange', used: false },
    { id: 'R', color: 'green', used: false },
    { id: 'm1', color: 'orange', used: false },
    { id: 'm2', color: 'orange', used: false },
    { id: 'm3', color: 'orange', used: false },
    { id: 'm4', color: 'orange', used: false },
    { id: 'm5', color: 'orange', used: false },
  ]);
  const [buttonPresses, setButtonPresses] = useState<string[]>([]);
  const isAnyNoteGreen = notes.some(note => note.color === 'green');
  const [taxiPressed, setTaxiPressed] = useState<boolean>(false);
  const { leftNotes, rightNotes } = useMemo(() => {
    const sNotes = notes.filter(note => note.id.startsWith('s') || note.id.startsWith('R'));
    const mNotes = notes.filter(note => note.id.startsWith('m')); // Include "R" in mNotes for simplicity

    return alliance === "Red" ? { leftNotes: mNotes, rightNotes: sNotes } : { leftNotes: sNotes, rightNotes: mNotes };
  }, [notes, alliance]);

  //state variable which determines whether or not the robot curently has a note (true if robot intake was successful)
  const [hasNote, setHasNote] = useState<boolean>(false);

  const handlePressNote = (noteId: string): void => {

    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id === noteId && !note.used && !hasNote) { //!hasNote disables the color swap if the robot has a note
          return { ...note, color: note.color === 'green' ? 'orange' : 'green' };
        }
        if (note.color === 'green')
        {
          console.log(hasNote);
          if(hasNote)
          {
            note.color = 'green'; //if the robot has a note, then keep the currently green note as green. 
          }
          else
          {
            note.color = 'orange'; //changes the color of the currently green note to orange. 
          }
        }
        return note;
      })
    );
  };

  const handlePress = (item: string): void => {
    //Taxi entry
    if (item === 'TAXI') {
      if (taxiPressed) {
        return;
      }
      setButtonPresses(currentPresses => [...currentPresses, item]);
      setTaxiPressed(true);
      return;
    }

    if (!isAnyNoteGreen) {
      // Optionally, provide feedback to the user that a note needs to be selected first.
      return;
    }

    // Step 1: Find the currently green note
    const greenNoteIndex = notes.findIndex(note => note.color === 'green');
    console.log(greenNoteIndex)

    // If there's a green note, prepare the entry for the buttonPresses and update the notes state
    if (greenNoteIndex !== -1) {
      const greenNote = notes[greenNoteIndex];
      const entry = `${greenNote.id.toUpperCase()} - ${item}`;

      // Step 2: Add the entry to buttonPresses
      setButtonPresses(currentPresses => [...currentPresses, entry]);

      // Step 3: Mark the note as used and reset its color
      // Note: Since we're directly modifying the state based on the previous state,
      // it's better to use the functional update form of the setState hook.

      //IF THE NOTE IS R, THIS IS ALREADY TRUE, SO IT SHOULD JUST TRIGGER THE INTAKE FUNCTION IMMEDIATELY
      

      //Since we already find the index of the selected note and we have the item its selected for, we can update 
      //action values when we set the note to used using the greenNoteIndex and item (entry has this)
      //For intake values, if item = intake -> setIntakeVar to intake successful, if item -> missedIntake -> setIntakeVar to
      //missed, default to didnt try
      //For action values, set them to their corresponding action (via item).
      //OR do this by parsing the list at the end right before submission 
      //String.split entries in ButtonPresses right before submission, determine note based on first half of split, and use
      //second half to determine action and intake status
      if(item === 'Intake')
      {
        //Conditionally resets the color based on intake status of the robot. If the robot isntakes a note,
        //selection of other notes is disabled until another button is pressed. After the second action log for the intake
        //note, the note is marked as used.  
        setNotes(currentNotes =>
          currentNotes.map((note, index) => 
              index === greenNoteIndex ? { ...note, color: 'green', used: false } : note
          )
        );
        
        //log for debugging
        console.log("note: " + greenNote + "green note entry: " + entry);
      }
      else
      {
        setNotes(currentNotes =>
          currentNotes.map((note, index) => 
              index === greenNoteIndex ? { ...note, color: 'orange', used: true } : note
          )
        );
        setHasNote(false);
      }
  }
  else {
    // If no note is green, just add the item
    setButtonPresses(currentPresses => [...currentPresses, item]);
  }
};

  const handleDeletePress = (index: number) => {
    const entry = buttonPresses[index];

    // Check if the entry directly matches special cases like "TAXI"
    if (entry === 'TAXI') {
      setTaxiPressed(false);
    } else {
      // Assuming the format is "NOTEID - ACTION" (e.g., "R - Speaker")
      const noteIdPattern = entry.split(' - ')[0].toLowerCase(); // This will extract "r" from "R - Speaker"
      const matchedNote = notes.find(note => note.id.toLowerCase() === noteIdPattern);

      if (matchedNote) {
        // If a matching note is found, update its 'used' state
        setNotes(currentNotes =>
          currentNotes.map(note =>
            note.id.toLowerCase() === noteIdPattern ? { ...note, used: false } : note
          )
        );
      }
    }

    // Remove the entry from the list regardless of the type
    setButtonPresses(currentPresses => currentPresses.filter((_, i) => i !== index));
  };

  const handleSendAutoData = () => {

    //each note is a "directory", and stores two sets of values
    //value 1: didnt use/missed intake/successful intake (0/1/2)
    //value 2: didnt use/amp made/amp missed/speaker made/speaker missed (0/1/2/3/4) 
    const path = `${regional}/teams/${teamNumber}/Match-Info/${qualMatch}`;

    const allNotes: string[] = ["S1", "S2", "S3", "M1", "M2", "M3", "M4", "M5", "R"]
    //value 1: didnt use/missed intake/successful intake (0/1/2)
    //value 2: didnt use/amp made/amp missed/speaker made/speaker missed (0/1/2/3/4) 
    //value 3: didnt taxi/taxi (0/1) | will be pushed directly to match qual directory w/o note info because it is independent of note. 
    let action = 0;
    let intake = 0;
    let taxiStatus = 0;

    //sets default values
    allNotes.map((note) => {
      if(note === "R") //R starts already in the robot, so no intake data is necessary
      {
        set(ref(database, path + `/Auto/${note}/Action`), action); 
      }
      else
      {
        set(ref(database, path + `/Auto/${note}/Intake`), intake);
        set(ref(database, path + `/Auto/${note}/Action`), action); 
      }
        
    })


    //Goes through buttonPresses array (actions list at the bottom) and assigns values based on what the user has put in the list. 
    //Each note is its own directory in firebase, where intake and action data is stored. 
    buttonPresses.map((entry) => { 
      let entryArr = entry.split(" - ");
      
      console.log(entryArr[0] + ", item: " + entryArr[1])
      if(entryArr[1] === "Intake" && entryArr[0] != "R")
      {
        console.log(entryArr[0] + ": Intake");
        intake = 2;
        console.log(intake);
        set(ref(database, path + `/Auto/${entryArr[0]}/Intake`), intake);
      }
      else if(entryArr[1] === "MISSED Intake" && entryArr[0] != "R") //since R is the note the robot starts with, it doesn't need intake stats. 
      {
        console.log(entryArr[0] + ": Missed Intake");
        intake = 1;
        console.log(intake);
        set(ref(database, path + `/Auto/${entryArr[0]}/Intake`), intake);

      }
      else if(entryArr[1] === "AMP")
      {
        console.log(entryArr[0] + ": AMP");
        action = 1;
        console.log(action);
        set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);

      }
      else if(entryArr[1] === "MISSED AMP")
      {
        action = 2;
        console.log(entryArr[0] + ": MISSED AMP");
        console.log(action);
        set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);

      }
      else if(entryArr[1] === "SPEAKER")
      {
        action = 3;
        console.log(entryArr[0] + ": SPEAKER");
        console.log(action);
        set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);

      }
      else if(entryArr[1] === "MISSED SPEAKER")
      {
        action = 4;
        console.log(entryArr[0] + ": MISSED SPEAKER");
        console.log(action);
        set(ref(database, path + `/Auto/${entryArr[0]}/Action`), action);
      }
      else if(entryArr[0] === "TAXI")
      {
        taxiStatus = 1;
        console.log(entryArr[0] + ": TAXI");
        console.log(taxiStatus);
        set(ref(database, path + `/Auto/Taxi`), taxiStatus);
      }
    })



  }

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <BackButton buttonName="Home Page" />
        <Text style={styles.title}>Auto</Text>

        <View style={styles.buttonGroup}>
          <Pressable onPress={() => handlePress('TAXI')} style={styles.button}>
            <Text style={styles.buttonText}>Taxi</Text>
          </Pressable>
          <Pressable onPress={() => handlePress('SPEAKER')} style={styles.button}>
            <Text style={styles.buttonText}>Speaker</Text>
          </Pressable>
          <Pressable onPress={() => handlePress('MISSED SPEAKER')} style={styles.button}>
            <Text style={styles.buttonText}>Missed Speaker</Text>
          </Pressable>
          <Pressable onPress={() => handlePress('AMP')} style={styles.button}>
            <Text style={styles.buttonText}>Amp</Text>
          </Pressable>
          <Pressable onPress={() => handlePress('MISSED AMP')} style={styles.button}>
            <Text style={styles.buttonText}>Missed Amp</Text>
          </Pressable>
          <Pressable onPress={() => {
            //Because of batching, setHasNote completes its setting after the handlePress function runs. This means that
            //it can't be used for comparisons in handlePress, which is why item value is used for those comparisons,
            //while hasNote is used for selection logic. 
            setHasNote(true);
            handlePress('Intake');
            }} style={styles.button}>
            <Text style={styles.buttonText}>Intake</Text>
          </Pressable>
          <Pressable onPress={() => handlePress('MISSED Intake')} style={styles.button}>
            <Text style={styles.buttonText}>Missed Intake</Text>
          </Pressable>
        </View>

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

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>List</Text>
          {buttonPresses.map((press, index) => (
            <Pressable key={index} onPress={() => handleDeletePress(index)} style={styles.listItemContainer}>
              <Text style={styles.listItem}>{press}</Text>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.buttonOne}
          onPress={() => {
            handleSendAutoData();
            router.push(`/(matchInfo)/teleop?regional=${regional}&teamNumber=${teamNumber}&qualMatch=${qualMatch}`)
          }
        }
        >
          <Text style={styles.buttonOneText}>Teleop</Text>
        </Pressable>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "BPoppins",
    fontSize: 32,
  },
  buttonOne: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 53,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgba(0, 130, 190, 255)",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonOneText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "BPoppins",
  },
  ringsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringWrapper: {
    marginVertical: 10,
  },
  ringBase: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringActive: {
    borderColor: '#00f',
  },
  ringInactive: {
    borderColor: '#f90',
  },
  greenRing: {
    borderColor: '#0f0',
  },
  redRing: {
    borderColor: '#f00',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    width: '100%',
  },
  buttonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  button: {
    backgroundColor: '#00f', // Button color
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5, // Adjust for space between buttons
    marginLeft: 10,//PLEASE CHANGE THIS 
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
  ringsOuterContainer: {
    flexDirection: 'column', // Stack the two rows vertically
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ringsRow: {
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  ringText: {
    color: 'black', // Choose the text color that suits your design
    fontWeight: 'bold', // If you want the text to be bold
    // Position the text in the center of the ring
    position: 'absolute',
    textAlign: 'center',
    width: '100%', // Ensure the text is centered in the ring
    lineHeight: 40, // Adjust line height to vertically center text in the ring
  },
  listContainer: {
    borderColor: '#000',
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgray', // Apply background color to the entire item
    marginBottom: 5,
    padding: 10, // Add padding inside the item for spacing
    borderRadius: 5, // Optional: for rounded corners
  },
  listItem: {
    color: '#000', // Text color for the list item
    fontWeight: 'normal',
    flex: 1, // Allows text to fill the row and push the "X" to the end
  },
  closeButtonText: {
    color: '#333', // Color for the "X"
    fontWeight: 'bold',
    marginLeft: 10, // Ensure spacing between the text and "X"
  },
  usedNote: {
    backgroundColor: '#ccc', // Gray background for used notes
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
    fontWeight: 'bold', // If you want the text to be bold
    // Position the text in the center of the ring
    position: 'absolute',
    textAlign: 'center',
    width: '100%', // Ensure the text is centered in the ring
    lineHeight: 40, // Adjust line height to vertically center text in the ring
    fontFamily: "BPoppins",
  },
});

export default matchInfo;
