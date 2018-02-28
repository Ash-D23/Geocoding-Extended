import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,ListView} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import { StackNavigator } from 'react-navigation';
var token
class DriverUpdate extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  header:null
  });

  constructor(props) {

   super(props);

   this.state = {
     name:'',
     city:'',
     phoneNumber:'',
   };
 }

updateDriver(name,city,phoneNumber){
  try{
    token = this.props.navigation.state.params.token;
    if(name.length>0 && city.length>0 && phoneNumber.length>0){
    fetch('https://api.backbitten72.hasura-app.io/insertdriver',{
      method:'POST',
      headers: {
        'Authorization':"Bearer "+token,
        'Accept':'application/json',
        'content-Type': 'application/json'

      },
      body: JSON.stringify({
        name: this.state.name,
        city: this.state.city,
        phone_no: this.state.phoneNumber
      }),
    })
    .then((result)=>result.json())
    .then((res)=>{
      if(res.code=='postgres-error'){
      alert('Driver details Violation/ Driver already exists, Try another username')}
    })
  }
  else{
    alert('All fields are required')
  }
  }
  catch(error){
    alert(error)

    return error
  }
}

render(){
  let{name,city,phoneNumber}=this.state;
    const { navigate } = this.props.navigation;
  return(
    <View style={{height:Dimensions.get('window').height,backgroundColor:'#008080'}}>
    <View style={{height:Dimensions.get('window').height,marginTop:20,justifyContent:'center'}}>
             <TextInput
          value={name}
          placeholder='Name'
            style={{height:50}}
          onChangeText={(name)=> this.setState({name})}></TextInput>

          <TextInput
       value={city}
       placeholder='City'
         style={{height:50}}
       onChangeText={(city)=> this.setState({city})}></TextInput>

       <TextInput
    value={phoneNumber}
    placeholder='Phone Number'
      style={{height:50}}
    onChangeText={(phoneNumber)=> this.setState({phoneNumber})}></TextInput>

          <Button style={{width: Dimensions.get('window').width,justifyContent:'center',marginTop:5,backgroundColor:'#d8bfd8'}} onPress={() =>this.updateDriver(this.state.name,this.state.city,this.state.phoneNumber)}>< Text style={{paddingTop:5,fontWeight:'bold'}}>Update Driver</Text></Button>
          <View style={{flexDirection:'row', justifyContent:'space-between',paddingTop:20}}>
          < Text style={{paddingTop:5,fontWeight:'bold',color:'orange'}} onPress={() =>navigate('Home')}>Google map</Text>
          < Text style={{paddingTop:5,fontWeight:'bold',color:'orange'}} onPress={() =>navigate('DriverSearch')}>See drivers in your city</Text>
          </View>
          <View>
            <Button transparent style={{width: Dimensions.get('window').width,justifyContent:'center',marginTop:50,backgroundColor:'red'}} onPress={() =>navigate('Main')}>< Text style={{paddingTop:5,fontWeight:'bold'}}>Sign Out</Text></Button>
          </View>
        </View>
    </View>
  );
}
}

export default DriverUpdate;
