import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import { ref } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtlgWf_Umo58CmyyZlpmSt08gKSZZS1jw",
    authDomain: "crescendo-scouting-app.firebaseapp.com",
    databaseURL: "https://crescendo-scouting-app-default-rtdb.firebaseio.com",
    projectId: "crescendo-scouting-app",
    storageBucket: "crescendo-scouting-app.appspot.com",
    messagingSenderId: "1033324848129",
    appId: "1:1033324848129:web:8a214a091f2c90e02b0c00",
    measurementId: "G-2HM4L7Y26K",
    databaseURL: "https://crescendo-scouting-app-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
