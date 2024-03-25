import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Pressable, Button, Image, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
//importing the back-button component from the filee
import BackButton from '../../../../backButton';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useRef, useState } from "react";
import { database } from "../../../../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import { Camera, CameraType, CameraPictureOptions } from "expo-camera";



//Camera related stuff
const robotPictureView = () => {
  //Camera variables
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [cameraType, setCameraType] = useState(CameraType.back); //defaults to back camera
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<Camera>()

  //Camera Permissions
  //unnecessary (?) and handled by useCameraPermissions in var declarations
  //  useEffect(() => {
  //     (async () => {
  //       const { status } = await Camera.requestCameraPermissionsAsync();
  //       setHasPermission(granted);
  //     })();
  //  }, []);

  //onCameraReady callback
  const onCameraReady = () => 
  {
    setIsCameraReady(true);
  }

  //will run in the callback to onCameraReady: onCameraReady => takePicture
  //Taking a picture using camera:
  const takePicture = async () => {
    //this method will only be called after making sure permissions have been granted.
    //checks to see if app has a current camera
    if(cameraRef.current)
    {
      //options for picture processing. There is a skipProcessing prop which will speed up
      //photo delivery significantly, so we could always use that to speed it up. 
      const options: CameraPictureOptions = {base64: true, quality: 0.5};

      //this line returns a promise for a CapturedImage object, which also has a uri. This is
      //most likely the same data we will save in the firebase storage. 
      const data = await cameraRef.current.takePictureAsync(options);
      //the data should be submitted upon form submission, at the very end. 
      
      //image source, used to display the image in a form submission page ?
      //will also be submitted after review
      const source = data.uri;

      //toggles a preview of the picture taken, when a picture source is available
      if(source)
      {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("previewing: " + source);
      }
    }
  }

  //switching camera shouldn't be necessary, so the option will be omitted for simplicity

  //camera ui logic (picture previews, capture button, etc)
  
  const cancelCameraPreview = async () => {
    await cameraRef.current?.resumePreview();
    setIsPreview(false);
  }

  //capture button
  const renderCaptureButton = () => (
    <TouchableOpacity
      disabled={!isCameraReady} //disable capture if camera isn't ready
      onPress={takePicture} //can only capture if camera is ready + permissions granted
      >
    </TouchableOpacity>
  )

  //preview close button
  const renderClosePreviewButton = () => (
    <TouchableOpacity onPress={cancelCameraPreview}>
      <Text>Close Preview</Text>
    </TouchableOpacity>
  )

  //send back to main screen if permission denied. 
  if(!hasPermission)
  {
    return(
        <View>
            <BackButton buttonName={"pitScouting"}></BackButton>
            <View>
                <Text>No camera permissions granted</Text>
            </View>
        </View>
    );
  }



  //Camera stylings
  return(
    <View style={styles.container}>
        <BackButton buttonName={"pitScouting"}></BackButton>
        <Camera 
            // ref={cameraRef}
            style={styles.container}
            type={cameraType}
            onCameraReady={onCameraReady}
            onMountError={(error) => {
                console.log("cammera error", error);
            }}
        />
        <View style={styles.container}>
            {isPreview && renderClosePreviewButton()}
            {!isPreview && renderCaptureButton()}
        </View>
    </View>
  )


}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    container: {
      flex: 1, // Makes sure the container takes up the whole screen
      justifyContent: 'flex-start', // Centers content vertically in the container
      alignItems: 'center', // Centers content horizontally in the container
      padding: 20, // Optional: Adds padding to the container
      width: "100%",
    },
    title:{
      fontFamily: 'BPoppins',
      fontSize: 35,
    },
    buttontitle:{
      fontFamily: 'BPoppins',
      fontSize: 20,
      color: 'rgba(0, 130, 190, 255)',
     
    },
    input: {
      height: 50,
      marginTop: 10,
      marginBottom: 30,
      paddingHorizontal: 8,
      borderWidth: .5,
      padding: 10,
      width: '90%', // Set width as needed
      borderRadius: 5, // Optional: if you want rounded corners
    },
    sendButton: {
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: '3%',
      paddingHorizontal: '15%',
      borderRadius: 4,
      backgroundColor: 'rgba(0, 130, 190, 255)',
      borderWidth: 1,
      borderColor: 'white',
  
    },
    sendButtonText: {
      color:'white',
      fontFamily: 'BPoppins',
    },
    dropdown: {
      height: 50,
      width: '90%', // or some other appropriate width
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      // Add margin for some spacing if needed
      marginTop: 10,
      marginBottom: 30,
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
  });
  
  export default robotPictureView;