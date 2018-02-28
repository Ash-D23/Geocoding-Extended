import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,FlatList} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import MapView from 'react-native-maps';
import Driver from './extended/drivers'
import HomeScreen from './extended/HomeScreen'
import DriverSearch from './extended/driverSearch'
import Login from './extended/login'
import SignUp from './extended/signup'
import DriverUpdate from './extended/driverupdate'
import Main from './extended/MainPage'
import Polyline from '@mapbox/polyline';
import {StackNavigator} from 'react-navigation';

const Task1 = StackNavigator({
	Main:{screen:Main},
	Login:{screen:Login},
	SignUp:{screen:SignUp},
	DriverUpdate:{screen:DriverUpdate},
	Home:{screen: HomeScreen},
  Driver: { screen: Driver },
	DriverSearch:{screen:DriverSearch},

});
export default class App extends React.Component {
	render() {

	return (
	  <Task1 />
    );

  }

}
