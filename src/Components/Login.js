import React from 'react';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 

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
import { Content, Input, Item,Body } from 'native-base';

class Login extends React.Component{
  
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
    SigninHandler=()=>{
        if(this.state.email.trim() && this.state.password.trim()){
          this.setState({ error: ' ', loading: true}); 
          this.props.startSignIn({
            email:this.state.email,
            password:this.state.password,
          })
          Keyboard.dismiss();  
          setTimeout(() => {
            this.setState({
            loading: false,
            error:"Auth error"
          })
        }, 3000)
    }
    else{
        alert('Please enter all fields correctly !');
      }
}
    renderButton=()=>{
        const { loading } = this.state;
        if(loading){
            return <Spinner size='large' />
        }else{
            return <Button color="#4A86C5" title="Signin" onPress={this.SigninHandler} />            
        };
    }
    render(){
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>
              Signin
          </Text>
          <Item style={styles.item} regular>
              <Input placeholder='Email Address' style={styles.input} onChangeText={email => this.setState({ email: email.trim() })} />
          </Item>
          <Item style={styles.item} regular>
              <Input placeholder='************' style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({ password: password.trim() })} />
          </Item>
          
          <Text style={{fontSize: 20, color: 'red'}}>{this.state.error}</Text>                
          <View style={styles.btn}>
              { this.renderButton() }
          </View>
          <Text onPress={() => Actions.signup()} style={{ fontSize: 20 }}>
              Don't have an account ?
          </Text>
      </View>
      )
    }

  }

  const mapDispatchToProp = (dispatch) =>({
    startSignIn: (userDetails) => dispatch(startSignIn(userDetails))
  })
  export default connect(undefined, mapDispatchToProp)(Login);
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