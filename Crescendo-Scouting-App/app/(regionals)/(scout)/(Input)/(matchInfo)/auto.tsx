import {
  Link,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import {
  Pressable,
  Button,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../../../backButton";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import { database } from "../../../../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import Slider from "@react-native-community/slider";

interface DropdownItem {
  label: string;
  value: string;
}

const matchInfo: React.FC = () => {
  const ScoringData = [
    { label: "Amp Side", value: "1" },
    { label: "Speaker Side(middle)", value: "2" },
    { label: "Source Side", value: "3" },
  ];
  const [sliderValue, setSliderValue] = React.useState(1);
  const [driveTrain, setDriveTrain] = useState<string>("");
  const [vision, setVision] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);
  const { regional } = useGlobalSearchParams<{ regional: string }>();

  let modifiedRegional = regional;
  if (regional === "Orange County") {
    modifiedRegional = "Orange-County";
  }
  const { teamNumber } = useGlobalSearchParams<{ teamNumber: string }>();

  const handleSendData = () => {
    // Assuming you have a teamNumber variable to uniquely identify teams

    // Path to the Firebase location where you want to store the selected value
    const path =
      { modifiedRegional } + `/teams/${teamNumber}/Robot-Info/scoringOption`;

    // Push the selected value to Firebase
    set(ref(database, path), selectedValue)
      .then(() => {
        console.log("Data saved successfully!");
        // ... handle success ...
      })
      .catch((error) => {
        console.error("Failed to write data: ", error);
      });
  };

  const [counter,setCounter] =useState(0)

  const incrementCounter = () => {
    setCounter(counter+1)
  }

  const decrementCounter = () => {
    if(counter > 0) {
        setCounter(counter-1)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView>
        <View style={styles.container}>
          <BackButton buttonName="Home Page" />
          {/* <Text style={styles.title}>Robot Scouting!</Text>
          <Text style={styles.subtitle}>Input team's data!</Text>

          <View style={styles.container}>
            <Text style={styles.buttontitle}>Visionary data!</Text>
            <TextInput
              style={styles.input}
              value={vision}
              onChangeText={setVision}
              placeholder="Visionary System"
            />
            <Text style={styles.buttontitle}>Drive Train Data!</Text>
            <TextInput
              style={styles.input}
              value={driveTrain}
              onChangeText={setDriveTrain}
              placeholder="Drive Train"
            />
          </View> */}
          <Text style={styles.buttontitle}>Starting Position</Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {
                borderColor: "blue",
                position: "relative",
                bottom: dropdownHeight + 10,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={ScoringData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            value={selectedValue || "1"}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: DropdownItem) => {
              setSelectedValue(item.value);
              setIsFocus(false);
              handleSendData(); // Call the function to push the selected value when it changes
            }}
          />
          <Text style={styles.counterText} >{counter}</Text>
          <TouchableOpacity
            onPress={incrementCounter}
            style={styles.buttonOne}
          >
            <Text style={styles.buttonOneText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={decrementCounter}
            style={styles.buttonOne}
          >
            <Text style={styles.buttonOneText}>-</Text>
          </TouchableOpacity>

          <Pressable
            style={styles.buttonOne}
            onPress={() => router.push(`/(matchInfo)/auto`)}
          >
            <Text style={styles.buttonOneText}>Speaker</Text>
          </Pressable>
          <Pressable
            style={styles.buttonOne}
            onPress={() => router.push(`/(matchInfo)/auto`)}
          >
            <Text style={styles.buttonOneText}>Amp</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1, // Makes sure the container takes up the whole screen
    justifyContent: "flex-start", // Centers content vertically in the container
    alignItems: "center", // Centers content horizontally in the container
    padding: 20, // Optional: Adds padding to the container
    width: "100%",
  },
  title: {
    fontFamily: "BPoppins",
    fontSize: 32,
  },
  subtitle: {
    fontFamily: "BPoppins",
    fontSize: 15,
    color: "rgba(127, 127, 127, 255)",
    marginBottom: 30,
  },
  buttontitle: {
    fontFamily: "BPoppins",
    fontSize: 12,
  },
  questiontitle: {
    fontFamily: "BPoppins",
    fontSize: 15,
    color: "rgba(127, 127, 127, 255)",
  },
  input: {
    height: 50,
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    padding: 10,
    width: "90%", // Set width as needed
    borderRadius: 5, // Optional: if you want rounded corners
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  option: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20, // Makes it more "bubble"-like
    backgroundColor: "#fff",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    //fontFamily: 'BPoppins', // Change this to less dense font
  },
  optionSelected: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
    color: "#fff",
  },
  sendButton: {},
  sendButtonText: {},
  dropdown: {
    height: 50,
    width: "90%", // or some other appropriate width
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // Add margin for some spacing if needed
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  counterText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    fontFamily: "BPoppins",
  }
});

export default matchInfo;
