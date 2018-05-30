import React,{ Component } from 'react';
// import { Nav } from './nav';
import { Router, Scene } from 'react-native-router-flux';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import NewPatient from './Components/NewPatient'
import PatientDetails from './Components/PatientDetails'
export default class Routers extends Component{
    render(){
        return(
            <Router>
            <Scene key="root">
              <Scene
                key="login"
                component={Login}
                back={false}
                hideNavBar={true}
                />
              <Scene
                key="signup"
                component={Signup}
                back={false}
                hideNavBar={true}
                />
                <Scene
                key="home"
                component={Home}
                back={false}
                drawer={true}
                hideNavBar={true}
                // title="Home"
                />
                <Scene
                key="newpatient"
                component={NewPatient}
                title="New Patient"
                />
                <Scene
                key="patientDetails"
                component={PatientDetails}
                hideNavBar={true}
                // title="Patient Details"
                />
            </Scene>
          </Router>
        );
    };
};