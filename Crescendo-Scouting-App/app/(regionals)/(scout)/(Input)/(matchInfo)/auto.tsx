// import { Link, router, useGlobalSearchParams, useLocalSearchParams, } from "expo-router";
// import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, } from "react-native";
// import BackButton from "../../../../backButton";
// import React, { useEffect, useMemo, useState } from "react";

// interface Note {
//   id: string;
//   color: 'orange' | 'green';
//   used: boolean;
// }

// const matchInfo: React.FC = () => {
//   const { alliance } = useGlobalSearchParams<{ alliance: string }>();
//   const { seating } = useGlobalSearchParams<{ seating: string }>();
//   const [notes, setNotes] = useState<Note[]>([
//     { id: 's1', color: 'orange', used: false },
//     { id: 's2', color: 'orange', used: false },
//     { id: 's3', color: 'orange', used: false },
//     { id: 'R', color: 'green', used: false },
//     { id: 'm1', color: 'orange', used: false },
//     { id: 'm2', color: 'orange', used: false },
//     { id: 'm3', color: 'orange', used: false },
//     { id: 'm4', color: 'orange', used: false },
//     { id: 'm5', color: 'orange', used: false },
//   ]);
//   const [buttonPresses, setButtonPresses] = useState<string[]>([]);
//   const isAnyNoteGreen = notes.some(note => note.color === 'green');
//   const [taxiPressed, setTaxiPressed] = useState<boolean>(false);
  
//   const { leftNotes, rightNotes, columnStyle } = useMemo(() => {
//     const sNotes = notes.filter(note => note.id.startsWith('s'));
//     const rNotes = notes.filter(note => note.id === 'R');
//     const mNotes = notes.filter(note => note.id.startsWith('m'));

//     // Determine the order of the notes based on the alliance
//     const leftColumnNotes = alliance === "Red" ? [...mNotes, ...rNotes] : sNotes;
//     const rightColumnNotes = alliance === "Red" ? sNotes : [...mNotes, ...rNotes];

//     // Determine the column style based on the seating
//     const columnStyle = seating === 'source' ? styles.notesColumnBottom : styles.notesColumnTop;

//     return {
//       leftNotes: leftColumnNotes,
//       rightNotes: rightColumnNotes,
//       columnStyle: columnStyle,
//     };
//   }, [notes, alliance, seating]);


//   const handlePressNote = (noteId: string): void => {
//     setNotes((currentNotes) =>
//       currentNotes.map((note) => {
//         if (note.id === noteId && !note.used) {
//           return { ...note, color: note.color === 'green' ? 'orange' : 'green' };
//         }
//         return note;
//       })
//     );
//   };

//   const handlePress = (item: string): void => {
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

//     // If there's a green note, prepare the entry for the buttonPresses and update the notes state
//     if (greenNoteIndex !== -1) {
//       const greenNote = notes[greenNoteIndex];
//       const entry = `${greenNote.id.toUpperCase()} - ${item}`;

//       // Step 2: Add the entry to buttonPresses
//       setButtonPresses(currentPresses => [...currentPresses, entry]);

//       // Step 3: Mark the note as used and reset its color
//       // Note: Since we're directly modifying the state based on the previous state,
//       // it's better to use the functional update form of the setState hook.
//       setNotes(currentNotes =>
//         currentNotes.map((note, index) =>
//           index === greenNoteIndex ? { ...note, color: 'orange', used: true } : note
//         )
//       );
//     } else {
//       // If no note is green, just add the item
//       setButtonPresses(currentPresses => [...currentPresses, item]);
//     }
//   };

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

//   return (
//     <ScrollView>
//       <View style={styles.mainContainer}>
//         <BackButton buttonName="Home Page" />
//         <Text style={styles.title}>Auto</Text>

//         <View style={styles.buttonGroup}>
//           <Pressable onPress={() => handlePress('TAXI')} style={styles.button}>
//             <Text style={styles.buttonText}>Taxi</Text>
//           </Pressable>
//           <Pressable onPress={() => handlePress('SPEAKER')} style={styles.button}>
//             <Text style={styles.buttonText}>Speaker</Text>
//           </Pressable>
//           <Pressable onPress={() => handlePress('MISSED SPEAKER')} style={styles.button}>
//             <Text style={styles.buttonText}>Missed Speaker</Text>
//           </Pressable>
//           <Pressable onPress={() => handlePress('AMP')} style={styles.button}>
//             <Text style={styles.buttonText}>Amp</Text>
//           </Pressable>
//           <Pressable onPress={() => handlePress('MISSED AMP')} style={styles.button}>
//             <Text style={styles.buttonText}>Missed Amp</Text>
//           </Pressable>
//           <Pressable onPress={() => handlePress('Intake')} style={styles.button}>
//             <Text style={styles.buttonText}>Intake</Text>
//           </Pressable>
//           <Pressable onPress={() => handlePress('MISSED Intake')} style={styles.button}>
//             <Text style={styles.buttonText}>Missed Intake</Text>
//           </Pressable>
//         </View>

//         <View style={styles.notesContainer}>
//           {/* Left Column */}
//           <View style={columnStyle}>
//             {leftNotes.map(note => (
//               <Pressable
//                 key={note.id}
//                 onPress={() => console.log('Note pressed:', note.id)}
//                 style={styles.noteWrapper}
//               >
//                 <View style={[styles.noteBase, { borderColor: note.color }]}>
//                   <Text style={styles.noteText}>{note.id.toUpperCase()}</Text>
//                 </View>
//               </Pressable>
//             ))}
//           </View>

//           {/* Right Column */}
//           <View style={columnStyle}>
//             {rightNotes.map(note => (
//               <Pressable
//                 key={note.id}
//                 onPress={() => console.log('Note pressed:', note.id)}
//                 style={styles.noteWrapper}
//               >
//                 <View style={[styles.noteBase, { borderColor: note.color }]}>
//                   <Text style={styles.noteText}>{note.id.toUpperCase()}</Text>
//                 </View>
//               </Pressable>
//             ))}
//           </View>
//         </View>

//         <View style={styles.listContainer}>
//           <Text style={styles.listTitle}>List</Text>
//           {buttonPresses.map((press, index) => (
//             <Pressable key={index} onPress={() => handleDeletePress(index)} style={styles.listItemContainer}>
//               <Text style={styles.listItem}>{press}</Text>
//               <Text style={styles.closeButtonText}>X</Text>
//             </Pressable>
//           ))}
//         </View>

//         <Pressable
//           style={styles.buttonOne}
//           onPress={() => router.push(`/(matchInfo)/teleop`)}
//         >
//           <Text style={styles.buttonOneText}>Teleop</Text>
//         </Pressable>
//       </View>
//     </ScrollView >
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     fontFamily: "BPoppins",
//     fontSize: 32,
//   },
//   buttonOne: {
//     marginTop: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 53,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: "rgba(0, 130, 190, 255)",
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   buttonOneText: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "white",
//     fontFamily: "BPoppins",
//   },
//   ringsContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ringWrapper: {
//     marginVertical: 10,
//   },
//   ringBase: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ringActive: {
//     borderColor: '#00f',
//   },
//   ringInactive: {
//     borderColor: '#f90',
//   },
//   greenRing: {
//     borderColor: '#0f0',
//   },
//   redRing: {
//     borderColor: '#f00',
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     flex: 1,
//     width: '100%',
//   },
//   buttonGroup: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     // flexDirection: 'row',
//   },
//   button: {
//     backgroundColor: '#00f', // Button color
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginVertical: 5, // Adjust for space between buttons
//     marginLeft: 10,//PLEASE CHANGE THIS 
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     padding: 20,
//     width: "100%",
//   },
//   ringsOuterContainer: {
//     flexDirection: 'column', // Stack the two rows vertically
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   ringsRow: {
//     flexDirection: 'row', // Arrange items in a row
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '100%',
//   },
//   ringText: {
//     color: 'black', // Choose the text color that suits your design
//     fontWeight: 'bold', // If you want the text to be bold
//     // Position the text in the center of the ring
//     position: 'absolute',
//     textAlign: 'center',
//     width: '100%', // Ensure the text is centered in the ring
//     lineHeight: 40, // Adjust line height to vertically center text in the ring
//   },
//   listContainer: {
//     borderColor: '#000',
//     borderWidth: 2,
//     marginTop: 20,
//     padding: 10,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   listTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   listItemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'lightgray', // Apply background color to the entire item
//     marginBottom: 5,
//     padding: 10, // Add padding inside the item for spacing
//     borderRadius: 5, // Optional: for rounded corners
//   },
//   listItem: {
//     color: '#000', // Text color for the list item
//     fontWeight: 'normal',
//     flex: 1, // Allows text to fill the row and push the "X" to the end
//   },
//   closeButtonText: {
//     color: '#333', // Color for the "X"
//     fontWeight: 'bold',
//     marginLeft: 10, // Ensure spacing between the text and "X"
//   },
//   usedNote: {
//     backgroundColor: '#ccc', // Gray background for used notes
//   },
//   notesContainer: {
//     flexDirection: 'row', // Align columns side by side
//     justifyContent: 'space-around',
//     alignItems: 'flex-start',
//     width: '100%',
//   },
//   notesColumn: {
//     flexDirection: 'column', // Arrange notes vertically
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   noteWrapper: {
//     marginVertical: 10, // Adjust spacing between notes
//   },
//   noteBase: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noteText: {
//     // Your text style here
//     color: 'black', // Choose the text color that suits your design
//     fontWeight: 'bold', // If you want the text to be bold
//     // Position the text in the center of the ring
//     position: 'absolute',
//     textAlign: 'center',
//     width: '100%', // Ensure the text is centered in the ring
//     lineHeight: 40, // Adjust line height to vertically center text in the ring
//     fontFamily: "BPoppins",
//   },
//   flippedNote: {
//     transform: [{ rotate: '180deg' }], // Rotate the note by 180 degrees
//   },
//   notesColumnTop: {
//     flexDirection: 'column',
//     justifyContent: 'flex-start', // Stack from the top
//     alignItems: 'center',
//   },
//   notesColumnBottom: {
//     flexDirection: 'column',
//     justifyContent: 'flex-end', // Stack from the bottom
//     alignItems: 'center',
//   },
// });

// export default matchInfo;

//If a selected note was missed, disable clicking that note (used is true)
//if a selected note was intaken correctly, disable selection of all other notes until 
//user selects where that note was scored. 
//after second selection, disable the note again and mark it as used. 


import { Link, router, useGlobalSearchParams, useLocalSearchParams, } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, } from "react-native";
import BackButton from "../../../../backButton";
import React, { useEffect, useMemo, useState } from "react";


interface Note {
  id: string;
  color: 'orange' | 'green';
  used: boolean;
}

const matchInfo: React.FC = () => {
  const { alliance } = useGlobalSearchParams<{ alliance: string }>();
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
  // const [hasNote, setHasNote] = useStateCallback<b

  //3rd option: use a separate function which contains everything involving hasNote


  //a new function using setState which will hopefully help in the button press stuff
  // const intakeHandlerFunc = (status: boolean) => {
  //   console.log("intake handler function called");
  //   useEffect(()=> {
  //       setHasNote(status);
  //       console.log("item = intake, intake status: " + hasNote);
  //   }, [hasNote])
  // }
  //IDEA: set the value of a boolean equal to the value of hasNote after setHasNote is called, and then use that bool


  useEffect(() => {
    console.log(hasNote); //this should hopefully ensure that the hasNote changes
    //hasNote updates after the function call. How can we make this update beforehand?
  }, [hasNote])

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
            note.color = 'green';
          }
          else
          {
            note.color = 'orange'; //changes the color of the currently green note to orange. 
            // note.color = 'green'; //testing
          }
        }
        return note;
      })
    );
  };

  const handlePress = (item: string): void => {
    // let intaken: boolean = false;
    if (item === 'TAXI') {
      if (taxiPressed) {
        return;
      }
      setButtonPresses(currentPresses => [...currentPresses, item]);
      setTaxiPressed(true);
      return;
    }
    // if(item === 'Intake') {
    //   // intakeHandlerFunc(true);
      
    //   intaken = hasNote;
    // }

    

    //I think this if can be moved inside useEffect | it cant
    //but it still might not be necessary if we just update the value of hasNote in intake using setState and a callback
    // if(item === 'Intake')
    // {
    //   //setHasNote(true);
    //   setHasNote(true);
    //   console.log("item = intake, intake status: " + hasNote);
    // }
    // else
    // {
    //   //setHasNote to false when any other item is selected
    // }
    //hasNote -> true, so handlePressNote is disabled until another button is pressed, turning hasNote -> false

    if (!isAnyNoteGreen) {
      // Optionally, provide feedback to the user that a note needs to be selected first.
      return;
    }

    // Step 1: Find the currently green note
    const greenNoteIndex = notes.findIndex(note => note.color === 'green');
    console.log(greenNoteIndex)

    console.log(hasNote)
    // If there's a green note, prepare the entry for the buttonPresses and update the notes state
    if (greenNoteIndex !== -1) {
      const greenNote = notes[greenNoteIndex];
      const entry = `${greenNote.id.toUpperCase()} - ${item}`;

      // Step 2: Add the entry to buttonPresses
      setButtonPresses(currentPresses => [...currentPresses, entry]);

      // Step 3: Mark the note as used and reset its color
      // Note: Since we're directly modifying the state based on the previous state,
      // it's better to use the functional update form of the setState hook.

      //if hasNote is true, don't reset the color. Also, don't set note to used when hasNote is true. 
      //just await another button press and on other button press set hasNote to false, which should run the below.
      //why doesnt the above comparison happen just if intake is pressed? hasNote can be used for the rest of the DOM updates because
      //its value changes after this function runs
      console.log(hasNote);
      //IT WORKS GOD BLESS 
      //now just reset hasNote at the end of this function maybe?
      if(/* !hasNote */item === 'Intake')
      {
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
//trying to use useEffect in handlePress to handle updates. 

            // this.setState({
              // hasNote: true
            // }, () => {console.log(this.state.hasNote)}); //setting the intake status to true on button press instead of inside the function call
            //for some reason the value of setHasNote never changes
            //the issue comes from react's batching process, which pushes state updates until the end of an event handler. Maybe
            //a fix could be using a second event handler before handlePress which updates the value of the state var?
            //handleIntake(true); Pray that useEffect might work in another one

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
          onPress={() => router.push(`/(matchInfo)/teleop`)}
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
