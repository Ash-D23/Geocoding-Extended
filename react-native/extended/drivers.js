import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,ListView} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import { StackNavigator } from 'react-navigation';
var productArray=[];
class Driver extends React.Component {

  constructor(props) {

   super(props);
var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     city:'',
    dataSource:dataSource.cloneWithRows(productArray)
   };
 }
 ListViewItemSeparator = () => {
     return (
       <View
         style={{
           height: .5,
           width: "100%",
           backgroundColor: "#000",
         }}
       />
     );
   }

   GetListViewItem (rowData) {

 alert(rowData);

 }
 componentDidMount(){
try{
     fetch(`https://api.backbitten72.hasura-app.io/drivers_list/${this.props.navigation.state.params.origin}`)
     .then((result)=>result.json())
     .then((res)=>{
       for(i=0;i<res.length;i++){
       productArray[i]=['Name: '+res[i].Name+' & '+'Phone: '+res[i].Phone_No]
     }
      this.setState({
          dataSource:this.state.dataSource.cloneWithRows(productArray)
       })
  //  console.warn(res[0].Name,res.length)
 })
}
catch(error){

alert(error)

return error
}
}

render() {
return (

<View style={styles.MainContainer}>
<View style={{alignItems:'center'}}>
<Thumbnail large source={{ uri: 'https://cdn0.iconfinder.com/data/icons/smartphone-5/100/Uber-128.png'}} />
         </View><ListView
          enableEmptySections={true}
            dataSource={this.state.dataSource}

            renderSeparator= {this.ListViewItemSeparator}

            renderRow={
                        (rowData) => <Text style={styles.rowViewContainer} onPress={this.GetListViewItem.bind(this, rowData)}>{rowData}</Text>
                      }

          />

</View>

    );
  }

}


const styles = StyleSheet.create({

  MainContainer :{

    justifyContent: 'center',
    flex:1,
    margin: 10,
  },

  rowViewContainer:
  {

    fontSize: 18,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color:'red'

  }
});

export default Driver;
