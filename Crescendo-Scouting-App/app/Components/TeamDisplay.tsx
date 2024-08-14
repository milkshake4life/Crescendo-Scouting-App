
import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, LayoutAnimation, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { DataPoint } from "../(regionals)/rankings";
import { useState } from "react";
  
const TeamDisplay = ({ title, children }) => {
//need to make a drop down with team name as the title and then data underneath. 
    // <Pressable 
    //         style={styles.backButton}
    //         onPress={() => router.back()}
    //         >
    //         <Image style = {styles.backButtonIcon} source={require('./../assets/images/back_arrow.png')} />
    // </Pressable>
    // need to change this back to false after new query is made (to close open accordians)
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(value => !value);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  
    return (
      <>
        <TouchableOpacity onPress={toggleOpen} activeOpacity={0.6}>
          <Text>{title}</Text>
        </TouchableOpacity>
        <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
          {children}
        </View>
      </>
    );
  };

const styles = StyleSheet.create({
    hidden: {
        height: 0,
    },
    list: {
        overflow: 'hidden'
    },
    backButton: {
    marginTop: '15%',
    marginBottom: 40, //adding bottom margins to avoid changing the title style
    //alignItems: 'center',
    //justifyContent: 'center',
    //paddingVertical: 12,
    //paddingHorizontal: 82,
    paddingRight: 350,
    borderRadius: 4,
    //backgroundColor: 'rgba(0, 130, 190, 255)', //removing background color so we can use an image. 
    //borderWidth: 1,                            //removing border for same reason as above
    borderColor: 'white',
    marginLeft:'3%',
    width: 20,
    height: 20,
},
backButtonIcon: {
    width: 20,
    height: 20,
}
});

export default TeamDisplay;