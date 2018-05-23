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
    Button,
    Keyboard,
} from 'react-native';
import { Container,Title,Content, Input, Item,Body,Header,Left,Icon,Right,Footer,FooterTab } from 'native-base';
import { Drawer } from 'native-base';
// import SideBar from './yourPathToSideBar';

class Home extends React.Component{
  
    constructor(props){
      super(props);
      this.state ={
          email: '',
          password: '',
          loading: false,
          error: '',
          loggedIn: null
      }
    }
  
    componentWillMount(){
      {this.props.getUsersData({
        user:"From user Dispatch"
      })}
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ 
                  loggedIn: true,
               });
          } else {
              this.setState({ loggedIn: false });
          }
      });
  }
    render(){
      closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
        this.drawer._root.open()
      };
      return(
        <Container>
        <Header>
          {/* <Left /> */}
            {/* <Button transparent onPress={()=>firebase.auth().signOut().then(()=>Actions.login())}>
              <Icon name='menu' />
            </Button>
          </Left> */}
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            {/* <Button transparent> */}
              <Icon name='menu'style={{color:"white"}} onPress={()=>firebase.auth().signOut().then(()=>Actions.login())}/>
            {/* </Button> */}
          </Right>
        </Header>
       
        <Content>
        <Text>content</Text>
        </Content>
        
      </Container>
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
  export default connect(undefined, mapDispatchToProp)(Home);
  const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 150
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        height: 50,
    },
    item: {
        width: "80%",
        marginBottom: 30,
        borderColor: '#4A86C5',
        borderWidth: 5,
        borderRadius: 7,
    },
    btn: {
        width: 200,
        height: 50,
    },
});