import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'; 

// CREATE-USER
export const signUp = (user) => ({
    type: 'CREATE-USER',
    user
  });

export const startSignUp = (userData = {}) =>{
    console.log("creating account ...");
    return dispatch =>{
        const {
            userName='',
            email='',
            password='',
            createdAt=0
          } = userData;
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
         .then(( data) =>{
            Actions.home();
             console.warn(data.user.uid)
           firebase.auth().currentUser.updateProfile({displayName:userName,email:email})
               firebase.database().ref(`Users/${data.user.uid}/`).set(userData)
               dispatch(signUp({
                   uid:data.uid,
                   ...userData
                }))
        }).catch(console.warn("error"))
    }   
  }
  
  export const signIn = (user) => ({
    type: 'USER-SIGNIN',
    user
  })

  export const startSignIn = (user = {}) =>{
    return dispatch => {
        console.log('user in signin', user)
        
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((signedinUser) => {
            Actions.home();
            let userid = signedinUser.user.uid
            // console.warn(userid)
            firebase.database().ref(`Users/${userid}`).once('value')
                .then((userData) => {
                }
        )}
    )}
    }  
    // ADD-PATIENT
export const addPatient = (user) => ({
    type: 'ADD-PATIENT',
    user
  });

export const startAddPatient = (patientData = {}) =>{
    return dispatch =>{
        const {
            patientName='',
            diasease='',
            medication= '',
            cost='',
            date='',
          } = patientData;
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid)
                firebase.database().ref(`Users/${user.uid}/Patients/`).push(patientData)
                .then(()=>{
                    dispatch(addPatient({
                        uid:user.uid,
                        ...patientData
                     }))
                     alert("New patient has been added successfully !")
                     Actions.home();
                })
            }
        })
    }   
  }