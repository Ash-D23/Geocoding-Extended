import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,FlatList} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import MapView from 'react-native-maps';

import Polyline from '@mapbox/polyline';
import { StackNavigator } from 'react-navigation';
class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
  header:null
  });
	 constructor(props) {

    super(props);

    this.state = {
      data:'',
      driver:'',
			time:'',
			cost:'',
      coords: [],
			startLoc:'',
			destinationLoc:'',
			Region:({
				latitude:100,
				longitude:100,
				latitudeDelta:100,
				longitudeDelta:100
			}),
		  coordinate1:({
				latitude:0,
				longitude:0
			}),
			coordinate2:({
				latitude:0,
				longitude:0
			}),
			footerColor:({
				backgroundColor:'transparent'
			})
	  };

  }

	getDistance(startLoc,destinationLoc){
		try{
if(startLoc !== ''&&destinationLoc !== ''){
if(isNaN(startLoc&&destinationLoc)){
	fetch(`https://api.backbitten72.hasura-app.io/api/address?origin=${startLoc}&destination=${destinationLoc}`)
.then((result)=>result.json())
.then((res)=>{
		let color={
					backgroundColor:'white'
			}
			this.setState({
				data:'Distance between source and destination :'+res.distance,
				time:'Time of travel :'+res.duration,
				cost:'Estimated Cost of travel is :'+res.cost,
        driver:`Click here to see the drivers in ${this.state.startLoc}`,
				footerColor:color
		})
}	)

}
else
{
		fetch(`https://api.airborne24.hasura-app.io/api/coordinates?lat=${startLoc}&long=${destinationLoc}`)
	.then((result)=>result.json())
	.then((res)=>{

				alert('The location name is '+res['formatted address'])

	}	)
	}
}
else{
	if (startLoc===''){
		fetch(`https://api.airborne24.hasura-app.io/api/location/${destinationLoc}`)
	.then((result)=>result.json())
	.then((res)=>{

				alert('The coordinates are latitude:'+res.latitude+' & longitude:'+res.longitude)

	}	)
	}
	else if (destinationLoc===''){
		fetch(`https://api.airborne24.hasura-app.io/api/location/${startLoc}`)
	.then((result)=>result.json())
	.then((res)=>{

				alert('The coordinates are latitude:'+res.latitude+' & longitude:'+res.longitude)

	}	)
	}

}
}
catch(error){

alert(error)

return error
}
}


  async getDirections(startLoc, destinationLoc) {

        try {

				fetch(`https://api.airborne24.hasura-app.io/api/location/${startLoc}`)
				.then((result)=>result.json())
				.then((res)=>{
				let coord={
						latitude:res.latitude,
						longitude:res.longitude
				}
				let Coord={
						latitude:res.latitude,
						longitude:res.longitude,
						latitudeDelta:2,
						longitudeDelta:2
				}

				this.setState({
					coordinate1:coord,
					Region:Coord
				})
				})
				fetch(`https://api.airborne24.hasura-app.io/api/location/${destinationLoc}`)
				.then((result)=>result.json())
				.then((res)=>{
				let coord={
					latitude:res.latitude,
					longitude:res.longitude
				}
				this.setState({
				coordinate2:coord
				})
				})

          let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)

            let respJson = await resp.json();

            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);

            let coords = points.map((point, index) => {

                return  {

                    latitude : point[0],

                    longitude : point[1]

                }

            })

            this.setState({coords: coords})

            return coords
					}

		catch(error){

 		alert(error)

 	return error
		}
    }

  render() {
let{startLoc, destinationLoc}=this.state;
const { navigate } = this.props.navigation;

return(

<View>


        <MapView style={styles.map} region={this.state.Region}>

				<MapView.Marker
				//source marker_green color
					coordinate={this.state.coordinate1}
					pinColor='#90ee90' />
					<MapView.Marker
					//destination marker_red color
						coordinate={this.state.coordinate2} />

        <MapView.Polyline

            coordinates={this.state.coords}

            strokeWidth={3}

            strokeColor="blue"/>



        </MapView>
<View style={{height:Dimensions.get('window').height,justifyContent:'space-between'}}>
<View style={{height:200,marginTop:20,backgroundColor:'white'}}>
				 <TextInput
			value={startLoc}
			placeholder='Enter Source/latitude'
				style={{height:50}}
			onChangeText={(startLoc)=> this.setState({startLoc})}></TextInput>



       <TextInput
			value={destinationLoc}
			placeholder='Enter destination/longitude'
			style={{height:50}}
			onChangeText={(destinationLoc)=> this.setState({destinationLoc})}></TextInput>
<Button success style={{width: Dimensions.get('window').width,justifyContent:'center'}} onPress={() =>this.getDirections(this.state.startLoc,this.state.destinationLoc)}>< Text style={{paddingTop:5,fontWeight:'bold'}}>Get Directions</Text></Button>
<Button warning style={{width: Dimensions.get('window').width,justifyContent:'center',marginTop:5}}  onPress={() =>this.getDistance(this.state.startLoc,this.state.destinationLoc)}>< Text style={{paddingTop:5,fontWeight:'bold'}}>Get Distance/location-name/coordinates</Text></Button>

</View>
<View>
<Footer style={{backgroundColor:'transparent',height:80}}>

<FooterTab  style={this.state.footerColor}>
<View style={{flexDirection:'column',width:Dimensions.get('window').width}}>
<Text style={{color:'#2f4f4f'}}>{this.state.data}</Text>
<Text style={{color:'#2f4f4f'}}>{this.state.time}</Text>
<Text style={{color:'#2f4f4f'}}>{this.state.cost}</Text>
<Text style={{color:'orange'}} onPress={() =>navigate('DriverSearch',{origin:this.state.startLoc})}>{this.state.driver}</Text>
</View>
	</FooterTab>

						</Footer>
</View>
      </View>

</View>
    );

  }

}



const styles = StyleSheet.create({

  map: {

    position: 'absolute',

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    width: Dimensions.get('window').width,

    height: Dimensions.get('window').height

  },

});
  export default HomeScreen;
