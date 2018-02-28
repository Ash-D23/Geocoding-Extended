import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,ListView} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import { StackNavigator } from 'react-navigation';

class SignUp extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  header:null
  });

  constructor(props) {

   super(props);

   this.state = {
     username:'',
     password:''
   };
 }

getToken(username,password){
try{
  fetch('https://api.backbitten72.hasura-app.io/signup',{
    method:'POST',
    headers: {
      Accept:'application/json',
      'content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password
    }),
  })
  .then((result)=>result.json())
  .then((res)=>{
    if(res.code=='user-exists'){
      alert('Username already exists')
    }

    else if(this.state.password.length<8){
      alert('Minimum Password Length is 8 characters')
    }
    else {
      const { navigate } = this.props.navigation;
      navigate('Login')
    }
  })

}
catch(error){
  alert(error)

  return error
}
}

render(){
  let{username,password}=this.state;
    const { navigate } = this.props.navigation;
  return(
    <View style={{height:Dimensions.get('window').height,backgroundColor:'grey'}}>
    <View style={{height:Dimensions.get('window').height,marginTop:20,justifyContent:'center'}}>

             <TextInput
          value={username}
          placeholder='Username/E-mail id'
            style={{height:50}}
          onChangeText={(username)=> this.setState({username})}></TextInput>

          <TextInput
       value={password}
       placeholder='Password'
         style={{height:50}}
       onChangeText={(password)=> this.setState({password})}></TextInput>


          <Button style={{width: Dimensions.get('window').width,justifyContent:'center',marginTop:5,backgroundColor:'#2f4f4f'}}  onPress={() =>this.getToken(this.state.username,this.state.password)}>< Text style={{paddingTop:5,fontWeight:'bold'}}>Sign Up</Text></Button>
          </View>
    </View>
  );
}
}

export default SignUp;
