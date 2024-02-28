import { Link, router, useGlobalSearchParams } from "expo-router";
import {
  Pressable,
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import BackButton from "../../../../backButton";
import { onValue, ref, set } from "@firebase/database";
import { database } from "../../../../../firebaseConfig";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { CheckBox } from "react-native-elements";
import React from "react";

const matchInfo = () => {
  const { regional } = useGlobalSearchParams<{ regional: string }>();
  const { teamNumber } = useGlobalSearchParams<{ teamNumber: string }>();
  let modifiedRegional = regional;
  if (regional === "Orange County") {
    modifiedRegional = "Orange-County";
  }

  interface DropdownItem {
    label: string;
    value: string;
  }

  const startingPosition = [
    { label: "Amp", value: "1" },
    { label: "Middle", value: "2" },
    { label: "Source", value: "3" },
  ];

  const [qualMatch, setQualMatch] = useState<DropdownItem[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedQualMatch, setSelectedQualMatch] = useState<string | null>(
    null
  );
  const [selectedAlliance, setSelectedAlliance] = useState<
    "Red" | "Blue" | null
  >(null);
  const [selectedSeating, setSelectedSeating] = useState<
    "Amp" | "Source" | null
  >(null);
  const [selectedStartingPosition, setSelectedStartingPosition] = useState<
    1 | 2 | 3 | null
  >(null);

  const fetchTeams = () => {
    const qualMatchRef = ref(
      database,
      modifiedRegional + "/teams/" + teamNumber + "/Match-Info"
    ); // Adjusted path
    onValue(qualMatchRef, (snapshot) => {
      const qualMatch = snapshot.val();
      if (qualMatch) {
        const processedData = Object.keys(qualMatch).map((qualMatch) => {
          return {
            label: qualMatch, // Using the team number as the label
            value: qualMatch, // Also using the team number as the value
          };
        });
        setQualMatch(processedData);
      } else {
        setQualMatch([]);
      }
    });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSetStartingPositionData = () => {
    const path = `${modifiedRegional}/teams/${teamNumber}/Match-Info/${selectedQualMatch}/Starting-Position`;

    set(ref(database, path), selectedStartingPosition);
  };

  const [isOn, setIson] = React.useState(false);
  const onColor = "rgba(0, 130, 190, 255)";
  const offColor = "red";
  const [seating, setSeating] = React.useState(false);

  return (
    <ScrollView>
      <View>
        <BackButton buttonName="Home Page" />

        <Text style={styles.title}> Pre-Game </Text>
        <Text style={styles.subtitle}>Qualification Match</Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={qualMatch}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select match" : "..."}
                searchPlaceholder="Search..."
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSelectedQualMatch(item.value); // Update the state to the new value
                  setIsFocus(false); // Assuming you want to unfocus the dropdown after selection
                }}
              />
            </View>
          </View>
        </View>
        <Text style={styles.subtitle}> Alliance </Text>
        <View style={styles.container}>
          <View style={styles.borderTwo}>
            <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 150,
                  borderRadius: 5,
                  borderWidth: 2,
                  overflow: "hidden",
                  borderColor: isOn ? onColor : offColor,
                }}
                onPress={() => {
                  LayoutAnimation.easeInEaseOut();
                  setIson(!isOn);
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "50%",
                    backgroundColor: isOn ? onColor : offColor,
                    alignSelf: isOn ? "flex-end" : "flex-start",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "500" }}
                  >
                    {isOn ? "Blue" : "Red"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}> Seating </Text>
        <View style={styles.container}>
          <View style={styles.borderTwo}>
            <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 150,
                  borderRadius: 5,
                  borderWidth: 2,
                  overflow: "hidden",
                  borderColor: onColor,
                }}
                onPress={() => {
                  LayoutAnimation.easeInEaseOut();
                  setSeating(!seating);
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "50%",
                    backgroundColor: onColor,
                    alignSelf: seating ? "flex-end" : "flex-start",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "500" }}
                  >
                    {seating ? "Amp" : "Source"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}> Starting Position </Text>
        <View style={styles.container}>
          <View style={styles.border}>
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={startingPosition}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Starting Position" : "..."}
                searchPlaceholder="Search..."
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSelectedQualMatch(item.value); // Update the state to the new value
                  setIsFocus(false); // Assuming you want to unfocus the dropdown after selection
                }}
              />
            </View>
          </View>
        </View>

        <Pressable
          style={styles.buttonOne}
          onPress={() => {
            if (
              selectedAlliance &&
              selectedSeating &&
              selectedStartingPosition &&
              selectedQualMatch
            ) {
              handleSetStartingPositionData();
              router.push(
                `/(matchInfo)/auto?regional=${modifiedRegional}&teamNumber=${teamNumber}&qualMatch=${selectedQualMatch}&alliance=${selectedAlliance}&seating=${selectedSeating}`
              );
            } else {
              alert("Please fill out all the fields before continuing.");
            }
          }}
        >
          <Text style={styles.buttonOneText}>Auto</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButtonText: {
    fontFamily: "BPoppins",
    fontSize: 15,
    color: "white",
    marginBottom: 30,
  },
  backButton: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 82,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgba(0, 130, 190, 255)",
    borderWidth: 1,
    borderColor: "white",
  },
  // buttonOne: {
  //   marginTop: 50,
  //   marginBottom: 100,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   elevation: 3,
  //   backgroundColor: "rgba(0, 130, 190, 255)",
  // },
  // buttonOneText: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   fontWeight: "bold",
  //   letterSpacing: 0.25,
  //   color: "white",
  //   fontFamily: "BPoppins",
  // },
  buttonOne: {
    marginTop: 50,
    marginBottom: 100,
    marginLeft: 95,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 3,
    backgroundColor: "rgba(0, 130, 190, 255)",
    width: 200, // Adjust the width as per your preference
  },
  buttonOneText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "BPoppins",
  },
  
  dropdown: {
    height: 50,
    width: "80%", // or some other appropriate width
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // Add margin for some spacing if needed
    marginTop: 10,
    marginBottom: 40,
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
  checkboxContainer: {
    marginVertical: 20,
  },
  border: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgba(0, 130, 190, 255)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    maxWidth: "95%",
  },
  borderTwo: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgba(0, 130, 190, 255)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    maxWidth: "95%",
  },
  title: {
    fontFamily: "BPoppins",
    fontSize: 36,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "BPoppins",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(0, 130, 190, 255)",
    marginTop: "10%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sendButton: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
    paddingHorizontal: "15%",
    borderRadius: 4,
    backgroundColor: "rgba(0, 130, 190, 255)",
    borderWidth: 1,
    borderColor: "white",
  },
  sendButtonText: {
    color: "white",
    fontFamily: "BPoppins",
  },
});

export default matchInfo;
