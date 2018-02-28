import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,ListView} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import { StackNavigator } from 'react-navigation';

class Main extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  header:null
  });
render(){
    const { navigate } = this.props.navigation;
  return(
    <View style={styles.MainContainer}>
    <Thumbnail large source={{ uri: 'http://3.bp.blogspot.com/-p2X0yCMVDV8/TcLgW1hmwWI/AAAAAAAAB14/kpErcjyrPd4/s1600/google-maps-icon.png'}} />
    <Button style={{ width:Dimensions.get('window').width,justifyContent:'center',backgroundColor:'#2f4f4f'}} onPress={() =>navigate('Login')}>< Text style={{paddingTop:5,fontWeight:'bold',color:'#daa520'}}>Login</Text></Button>
    <Button style={{ width:Dimensions.get('window').width,justifyContent:'center',marginTop:5,backgroundColor:'#2f4f4f'}} onPress={() =>navigate('SignUp')}>< Text style={{paddingTop:5,fontWeight:'bold',color:'#adff2f'}}>Sign Up</Text></Button>
    < Text style={{paddingTop:5,fontWeight:'bold',color:'#fff0f5'}} onPress={() =>navigate('Home')}>Google map</Text>
    < Text style={{paddingTop:5,fontWeight:'bold',color:'#ffb6c1'}} onPress={() =>navigate('DriverSearch')}>See drivers in your city</Text>
    <Text style={{marginTop:20,fontWeight:'bold',color:'#ff8c00'}}>To update Driver Details you must login first!!</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({

  MainContainer :{
    backgroundColor:'grey',
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    alignItems:'center',
    justifyContent:'center',
  },
}
);
export default Main;
