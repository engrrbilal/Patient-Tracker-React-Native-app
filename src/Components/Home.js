import React from 'react';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 
import dataReducer from '../reducers/dataReducer'
import {getUsersData} from '../actions/dataActions'
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
    ScrollView, TouchableOpacity 
} from 'react-native';
import { Container,Title,Content, Input,Card,CardItem, Item,Body,Header,Left,Icon,Right,Footer,FooterTab } from 'native-base';
import { Drawer,List,ListItem,Thumbnail,Avatar } from 'native-base';
import Sidebar from './Sidebar';
class Home extends React.Component{
  
    constructor(props){
      super(props);
      this.state ={
        searchTerm:''

      }
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
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
   searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
    render(){
      return(
        <Container>
                <Drawer ref={(ref) => { this.drawer = ref; }} content={<Sidebar/>}>
                 <Header searchBar rounded>
                    <Item>
                      <Icon name='search' style={{color:"white"}}/>
                      <Input placeholder="Search" onChangeText={(term) => this.setState({searchTerm:term})}
                         style={styles.searchInput}/>
                      <Icon name="people" />
                      </Item>
                       <Icon name='menu'onPress={()=>this.openDrawer()} style={{color:"white",marginLeft:8,marginTop:12,}} size={24}/>
              </Header>
        <Content>
          <ScrollView>
            {
                this.props.users.map((user) => {
                  return(
                    user.id === this.state.uid&&
                    Object.keys(user.Patients).filter(key =>
                      user.Patients[key].patientName.toUpperCase().search(this.state.searchTerm.toUpperCase()) !== -1
                      || user.Patients[key].date.search(this.state.searchTerm) !== -1
                    ).map((patient,index)=>{
                      return(
                        <List key={index}> 
                        <ListItem avatar
                          onPress={() => Actions.patientDetails({
                            patientName: user.Patients[patient].patientName,
                            diasease: user.Patients[patient].diasease,
                            medication: user.Patients[patient].medication,
                            cost: user.Patients[patient].cost,
                            date: user.Patients[patient].date,
                        })}
                        >
                        <Left>
                            <Thumbnail style={{width:40,height:40}} source={require('../images/patient2.png')} />
                          </Left>
                          <Body>
                          <Text style={{fontSize: 20,ineHeight: 50}}>
                            {user.Patients[patient].patientName}
                          </Text>
                          </Body>
                        </ListItem>

                      </List>
                      )
                    })
                  )
                })
            }
            </ScrollView>
        </Content>
        </Drawer>
        </Container>
          
      )
    }

  }
  
  
 
  const mapStateToProps = (state) => {
    return{
        users: state.dataReducer.usersData,
    }   
  }
  const mapDispatchToProp = (dispatch) =>({
    getUsersData: (test) => dispatch(getUsersData(test)),
  })
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    drawerHeader: {
      height: 200,
      backgroundColor: 'white'
    },
    drawerImage: {
      height: 150,
      width: 150,
      borderRadius: 75
    },
    emailItem:{
      borderBottomWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.3)',
      padding: 10
    },
    emailSubject: {
      color: 'rgba(0,0,0,0.5)'
    },
    searchInput:{
      padding: 10,
      borderColor: '#CCC',
      borderWidth: 1
    }
  
  })
  export default connect(mapStateToProps, mapDispatchToProp)(Home);
  