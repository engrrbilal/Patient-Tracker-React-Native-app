import { AppRegistry } from 'react-native';
import App from './App';
import * as firebase from "firebase";
var config = {
    apiKey: "AIzaSyAOW1Rpjywq1RU6R4ut6Mgeq4VjAcqknjg",
    authDomain: "patient-tracker-ea332.firebaseapp.com",
    databaseURL: "https://patient-tracker-ea332.firebaseio.com",
    projectId: "patient-tracker-ea332",
    storageBucket: "patient-tracker-ea332.appspot.com",
    messagingSenderId: "671551811377"
  };
  firebase.initializeApp(config);
AppRegistry.registerComponent('patienttracker', () => App);
