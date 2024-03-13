
import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';

type backButtonProps = {
    //providing image source isn't working, and its unnecessary since we only want one image for the back button. 
    buttonName: string;
  };
  
const BackButton = (props: backButtonProps) => {
let imageUrl: string;

return (
    <Pressable 
            style={styles.backButton}
            onPress={() => router.back()}
            >
            <Image style = {styles.backButtonIcon} source={require('./../assets/images/back_arrow.png')} />
            </Pressable>
)
};

const styles = StyleSheet.create({
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

export default BackButton;