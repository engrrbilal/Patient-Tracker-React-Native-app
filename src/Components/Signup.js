import React from 'react';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 

import Spinner from './Spinner';
import Login from './Login'
import { connect } from 'react-redux';
import { startSignUp} from '../actions/auth';
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


class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      loading: false,
  };
  }
  SignupHandler =() =>{
    console.log("creating account ...");
    console.log(this.state.fullName,this.state.email,this.state.password)
    if(this.state.email.trim() && this.state.password.trim() && this.state.userName.trim()){
            this.setState({ error: ' ', loading: true});
            let date = new Date().toUTCString()
            let createdAt = date.toString("MMM dd")
            this.props.startSignUp({
            userName:this.state.userName,
            email:this.state.email,
            password:this.state.password,
            createdAt:createdAt
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
        return <Button color="#4A86C5" title="Singup" onPress={this.SignupHandler} />            
    };
}
handleChange = (event, index, value) => this.setState({
  value:value
});
render(){
//   const title = 'Patient ';
  return (
      <View style={styles.container}>
          <Text style={styles.welcome}>
              Signup
          </Text>
          <Item style={styles.item} regular>
              <Input placeholder='Your name' style={styles.input} onChangeText={name => this.setState({ userName: name.trim() })} />                    
          </Item>
          <Item style={styles.item} regular>
              <Input placeholder='Email Address' style={styles.input} onChangeText={email => this.setState({ email: email.trim() })} />
          </Item>
          <Item style={styles.item} regular>
              <Input placeholder='Password' style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({ password: password.trim() })} />
          </Item>
          
          <Text style={{fontSize: 20, color: 'red'}}>{this.state.error}</Text>                
          <View style={styles.btn}>
              { this.renderButton() }
          </View>
          <Text onPress={() => Actions.login()} style={{ fontSize: 20 }}>
              Already have an account ?
          </Text>
      </View>
  );
};
}
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
        margin:80,
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
const mapDispatchToProp = (dispatch) =>({
  startSignUp: (userDetails) => dispatch(startSignUp(userDetails))
})
export default connect(undefined, mapDispatchToProp)(Signup);

