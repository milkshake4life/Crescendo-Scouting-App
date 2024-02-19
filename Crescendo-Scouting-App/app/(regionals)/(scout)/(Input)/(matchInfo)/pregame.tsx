import { Link, router, useGlobalSearchParams } from "expo-router";
import { Pressable, Button, Text, View, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../../../backButton";
import { onValue, ref } from "@firebase/database";
import { database } from "../../../../../firebaseConfig";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { CheckBox } from "react-native-elements";
import React from "react";


const matchInfo = () => {

  const { regional } = useGlobalSearchParams<{ regional: string }>();
  const { teamNumber } = useGlobalSearchParams<{ teamNumber: string }>();
  let modifiedRegional = regional
  if (regional === 'Orange County') {
    modifiedRegional = 'Orange-County'
  }

  interface DropdownItem {
    label: string;
    value: string;
  }

  const [dropdownData, setDropdownData] = useState<DropdownItem[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedAlliance, setSelectedAlliance] = useState<"Red" | "Blue" | null>(null);
  const [selectedSeating, setSelectedSeating] = useState<"Amp" | "Source" | null>(null);
  const [selectedStartingPosition, setSelectedStartingPosition] = useState<"Amp" | "Middle" | "Source" | null>(null);

  const fetchTeams = () => {
    const qualMatchRef = ref(database, modifiedRegional + '/teams/' + teamNumber + '/Match-Info'); // Adjusted path
    onValue(qualMatchRef, (snapshot) => {
      const qualMatch = snapshot.val();
      if (qualMatch) {
        const processedData = Object.keys(qualMatch).map((qualMatch) => {
          return {
            label: qualMatch,  // Using the team number as the label
            value: qualMatch,  // Also using the team number as the value
          };
        });
        setDropdownData(processedData);
      } else {
        setDropdownData([]);
      }
    });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <ScrollView>
      <View>
        <BackButton buttonName="Home Page" />
        <Text>Plese Input the Pre Game Information!</Text>
        <Text>Qualification Match</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select match' : '...'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedValue(item.value);  // Update the state to the new value
            setIsFocus(false);  // Assuming you want to unfocus the dropdown after selection
          }}
        />
        <Text>Alliance</Text>
        <CheckBox
          title="Red"
          checked={selectedAlliance === "Red"}
          onPress={() => setSelectedAlliance(selectedAlliance === "Red" ? null : "Red")}
          containerStyle={styles.checkboxContainer}
        />
        <CheckBox
          title="Blue"
          checked={selectedAlliance === "Blue"}
          onPress={() => setSelectedAlliance(selectedAlliance === "Blue" ? null : "Blue")}
          containerStyle={styles.checkboxContainer}
        />

        <Text>Seating</Text>
        <CheckBox
          title="Amp"
          checked={selectedSeating === "Amp"}
          onPress={() => setSelectedSeating(selectedSeating === "Amp" ? null : "Amp")}
          containerStyle={styles.checkboxContainer}
        />
        <CheckBox
          title="Source"
          checked={selectedSeating === "Source"}
          onPress={() => setSelectedSeating(selectedSeating === "Source" ? null : "Source")}
          containerStyle={styles.checkboxContainer}
        />

        <Text>Starting Position</Text>
        <CheckBox
          title="Amp"
          checked={selectedStartingPosition === "Amp"}
          onPress={() => setSelectedStartingPosition(selectedStartingPosition === "Amp" ? null : "Amp")}
          containerStyle={styles.checkboxContainer}
        />
        <CheckBox
          title="Middle"
          checked={selectedStartingPosition === "Middle"}
          onPress={() => setSelectedStartingPosition(selectedStartingPosition === "Middle" ? null : "Middle")}
          containerStyle={styles.checkboxContainer}
        />
        <CheckBox
          title="Source"
          checked={selectedStartingPosition === "Source"}
          onPress={() => setSelectedStartingPosition(selectedStartingPosition === "Source" ? null : "Source")}
          containerStyle={styles.checkboxContainer}
        />

        <Pressable
          style={styles.buttonOne}
          onPress={() => router.push(`/(matchInfo)/auto?alliance=${selectedAlliance}`)}
        >
          <Text style={styles.buttonOneText}>Auto</Text>
        </Pressable>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  backButtonText: {
    fontFamily: 'BPoppins',
    fontSize: 15,
    color: 'white',
    marginBottom: 30,
  },
  backButton: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 82,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonOne: {
    marginTop: 0,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 53,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0, 130, 190, 255)',
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonOneText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'BPoppins',
  },
  dropdown: {
    height: 50,
    width: '80%', // or some other appropriate width
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // Add margin for some spacing if needed
    marginTop: 10,
    marginBottom: 40,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
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
});

export default matchInfo;