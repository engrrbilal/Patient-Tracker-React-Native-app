import React,{ Component } from 'react';
// import { Nav } from './nav';
import { Router, Scene } from 'react-native-router-flux';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';

export default class Routers extends Component{
    render(){
        return(
            <Router>
            <Scene key="root">
              {/* <Scene
                key="login"
                component={Login}
                title="Patient Tracker"
                back={false}
                // drawer={true}
                // hideNavBar={true}
                /> */}
              {/* <Scene
                key="signup"
                component={Signup}
                title="Patient Tracker"
                back={false}
                // drawer={true}
                // hideNavBar={true}
                /> */}
                <Scene
                key="home"
                component={Home}
                back={false}
                drawer={true}
                hideNavBar={true}
                // title="Home"
                />
            </Scene>
          </Router>
        );
    };
};