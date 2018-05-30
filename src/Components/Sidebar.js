import React from 'react';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 
import dataReducer from '../reducers/dataReducer'
import {getUsersData,startUpdateUser} from '../actions/dataActions'

import Spinner from './Spinner';
import { connect } from 'react-redux';
import {startSignIn} from '../actions/auth'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Keyboard,
} from 'react-native';
import { Container,Title,Thumbnail,List,ListItem,Content, Input,
     Item,Body,Header,Left,Icon,Right,Footer,FooterTab,Button } from 'native-base';

class Sidebar extends React.Component{
  
    constructor(props){
      super(props);
      this.state ={
          displayName:''
      }
    }
  
    componentWillMount(){
      {this.props.getUsersData({
        user:"From user Dispatch"
      })}
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ 
                  displayName:user.displayName
               });
          }
      });
  }
    render(){

      return(
        <Content style={{backgroundColor:'#FFFFFF',flex:1}}>
        <List style={{backgroundColor:'lightgray',flex:1}}>
          <ListItem avatar>
              <Thumbnail style={{marginLeft:"27%", marginTop:"4%",width: 100, height: 100,}}  source={require('../images/doctor.png')} />
            </ListItem>
            <Body>
                <Text style = {{fontSize:20,color:"white", padding:"3%",alignSelf:"center",textAlign:"center"}}>Dr. {this.state.displayName}{"\n"}</Text>  
            </Body>
        </List>
        <Button block info style={{marginBottom:3}} onPress={()=>Actions.newpatient()}>
            <Text style={{color:"white",fontWeight:"bold"}}>+ New Patient</Text>
          </Button>  
          <Button block info onPress={()=>firebase.auth().signOut().then(()=>Actions.login())}>
            <Text style={{color:"white",fontWeight:"bold"}}>Logout</Text>
          </Button>     
        {/* <Button light  onPress={()=>Actions.newpatient()} style ={{width:"100",alignSelf:"center"}} title="+ New Patient"><Text> + New Patient </Text></Button>         
        <Button block rounded title="Logout" 
             onPress={()=>firebase.auth().signOut().then(()=>Actions.login())} style ={{ width:"90%", alignSelf:"center", backgroundColor: '#00d084' }} /> */}
      </Content>
      )
    }

  }
  const mapStateToProps = (state) => {
    return{
        users: state.dataReducer.usersData,
        user: state.dataReducer.userProfile
    }   
  }
  const mapDispatchToProp = (dispatch) =>({
    getUsersData: (test) => dispatch(getUsersData(test)),
  })
  export default connect(undefined, mapDispatchToProp)(Sidebar);
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 150
    },
    body: {
        height: 100,
        backgroundColor: 'lightblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
        fontFamily: "serif",
        marginBottom: 25,
    },
    btn: {
        width: 40,
        height: 20,
    },
});