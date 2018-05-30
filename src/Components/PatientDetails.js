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
import { Container,Title,Content, Input,Card,CardItem, Item,Body,Header,Left,Icon,Right,Footer,FooterTab } from 'native-base';
import {List,ListItem,Thumbnail,avatar} from 'native-base';
import Sidebar from './Sidebar';
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'

class PatientDetails extends React.Component{
  
    constructor(props){
      super(props);
    //   this.state ={
    //   }
    }
  
    componentWillMount(){
      {this.props.getUsersData({
        user:"From user Dispatch"
      })}
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ 
                  uid: user.uid,
               });
          }
      });
  }
    render(){
      
      return(
        <Container style = {{flex:1}}> 
        <View style  ={{backgroundColor:"steelblue",minHeight:"10%",justifyContent:"center",padding:"2%",flexDirection:"row"}} >
          <View style = {{flex:1,justifyContent:"center"}}>
          <Icon name = "md-arrow-back"  style = {{color:"white"}} onPress = {()=>{Actions.pop()}} />
          </View>
          <View style = {{flex:2,justifyContent:"center"}}>
          <Text style = {{fontSize:20,color:"white",}}>Patient Details</Text>
          </View>
          <View style = {{flex:1}} />
         </View>
         <Content>
          <List style={{backgroundColor:'lightgray',flex:1}}>
            <ListItem avatar>
                <Thumbnail style={{marginLeft:"33%", marginTop:"4%",width: 100, height: 100,}}  source={require('../images/patient.png')} />
              </ListItem>
              <Body>
                  <Text style = {{fontSize:20,padding:"3%",alignSelf:"center",textAlign:"center"}}>{this.props.patientName}{"\n"}</Text>  
              </Body>
          </List> 
           <Card>
             <CardItem>
               <Body >
                 <Text style={{fontSize:18,padding:3}}>
                 Medications: {this.props.medication}
                 </Text>
                 <Text style={{fontSize:18,padding:3}}>
                 Cost: {this.props.cost}
                 </Text>
                 <Text style={{fontSize:18,padding:3}}>
                 Date: {this.props.date}
                 </Text>
               </Body>
             </CardItem>        
          </Card>
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
  export default connect(mapStateToProps, mapDispatchToProp)(PatientDetails);
  