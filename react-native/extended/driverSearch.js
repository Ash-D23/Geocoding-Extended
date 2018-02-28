import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,ListView,Image} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import { StackNavigator } from 'react-navigation';

class DriverSearch extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  header:null
  });
  constructor(props) {

   super(props);

   this.state = {
     cityName:''
   };
 }
  render() {
    let{cityName}=this.state;
    const { navigate } = this.props.navigation;
  return (
    <View style={{height:Dimensions.get('window').height,justifyContent:'space-between'}}>
    <View style={{height:Dimensions.get('window').height,marginTop:20,backgroundColor:'white'}}>
    				 <TextInput
    			value={cityName}
    			placeholder='Enter City'
    				style={{height:50}}
    			onChangeText={(cityName)=> this.setState({cityName})}></TextInput>
          <Button style={{width: Dimensions.get('window').width,justifyContent:'center',marginTop:5,backgroundColor:'#2f4f4f'}}  onPress={() =>navigate('Driver',{origin:this.state.cityName})}>< Text style={{paddingTop:5,fontWeight:'bold'}}>Get Driver Details</Text></Button>
<Image style={{ flex:1,resizeMode: 'cover'}} source={{uri:'http://cdn.wonderfulengineering.com/wp-content/uploads/2013/12/Ferrari-Wallpaper-3.jpg'}}/>
          </View>
    </View>
  );
}
}

const styles = StyleSheet.create({

  MainContainer :{

    justifyContent: 'center',
    flex:1,
    margin: 10
  },
}
);
export default DriverSearch;
