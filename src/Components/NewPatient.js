import React from 'react';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 

import Spinner from './Spinner';
import Login from './Login'
import { connect } from 'react-redux';
import { startAddPatient} from '../actions/auth';

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


class NewPatient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      patientName: '',
      diasease: '',
      medication: '',
      date:'',
      cost:null,
      loading: false,
  };
  }
  patientHandler =() =>{
    if(this.state.patientName.trim() && this.state.diasease.trim() && this.state.medication.trim() &&
    this.state.cost.trim() ){
            this.setState({ error: ' ', loading: true});
            let cdate = new Date().toUTCString()
            let createdAt = cdate.toString("MMM dd")
            let todayDate = new Date()
            let currentDay = todayDate.getDate()
            let currentMonth = todayDate.getMonth()
            let currentYear = todayDate.getFullYear()
            let date = `${currentDay}/${currentMonth +1 }/${currentYear}`
            this.props.startAddPatient({
            patientName:this.state.patientName,
            diasease:this.state.diasease,
            medication:this.state.medication,
            createdAt:createdAt,
            date:date,
            cost:this.state.cost,
          })
          Keyboard.dismiss();  
          setTimeout(() => {
            this.setState({
            loading: false,
          })
        }, 3000)
      }
      else{
        alert('Please enter all fields correctly !');
      }
  }
handleChange = (event, index, value) => this.setState({
  value:value
});
render(){
//   const title = 'Patient ';
  return (
      <View style={styles.container}>
          <Text style={styles.welcome}>
              New Patient
          </Text>
          <Item style={styles.item} regular>
              <Input placeholder='Patient name' style={styles.input} onChangeText={name => this.setState({ patientName: name.trim() })} />                    
          </Item>
          <Item style={styles.item} regular>
              <Input placeholder='Patient Diasease' style={styles.input} onChangeText={diasease => this.setState({ diasease: diasease.trim() })} />
          </Item>
          <Item style={styles.item} regular>
              <Input placeholder='Medication Provided' style={styles.input} onChangeText={medication=> this.setState({ medication: medication.trim() })} />
          </Item>
          <Item style={styles.item} regular>
              <Input placeholder='Cost' keyboardType='numeric'style={styles.input} onChangeText={cost => this.setState({ cost: cost.trim() })} />
          </Item>
          <Text style={{fontSize: 20, color: 'red'}}>{this.state.error}</Text>                
          <View style={styles.btn}>
                <Button color="#4A86C5" title="+ Add Patient" onPress={this.patientHandler} />
          </View>
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
        fontSize: 34,
        textAlign: 'center',
        marginTop: 80,
        fontFamily: "serif",
        marginBottom: 40,
    },
    input: {
        height: 50,
    },
    item: {
        width: "80%",
        marginBottom: 10,
        borderColor: '#4A86C5',
        borderWidth: 5,
        borderRadius: 7,
    },
    btn: {
        width: "70%",
        height: 90,
    },
});
const mapDispatchToProp = (dispatch) =>({
    startAddPatient: (patientDetails) => dispatch(startAddPatient(patientDetails))
})
export default connect(undefined, mapDispatchToProp)(NewPatient);

