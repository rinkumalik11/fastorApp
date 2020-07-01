import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

function Item({order_id}) {
  return (
    <View style={styles.item}>
      <View>
      <Text style={styles.title}>{'#'} {order_id}</Text>
      </View>
      <View>
        <Text></Text>
      </View>
    </View>
  );
}

export default class History extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data:[],
      loading:false
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData=async(days=0,demopass='demopass')=>{
    this.setState({loading:true});
    const token = await AsyncStorage.getItem('@token');
    const data = await fetch(`https://staging.fastor.in/v1/web/orders?pass=${demopass}&days=${days}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    const jsonRes = await data.json();

    this.setState({
      data:jsonRes.data,
      loading:false
    })
  }
  

  render() {
    const {data,loading} = this.state;
    return (
      <View style={{flex:1}}>
        <Image
          source={require('../assets/moveforward.png')}
          style={{transform: [{rotate: '180deg'}]}}
        />
        <Text style={styles.txt}>Orders</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View>
            <Text>Total</Text>
            <Text style={styles.txt}>23010</Text>
            <Text>Restraunt</Text>
            <Text style={styles.txt}>23010</Text>
          </View>
          <View>
            <Text>Orders</Text>
            <Text style={styles.txt}>1207</Text>
            <Text>Fastor</Text>
            <Text style={styles.txt}>1207</Text>
          </View>
        </View>
        
          <SafeAreaView style={styles.container}>
            {data.length !== 0 || !!loading ? (
              <FlatList
              data={data}
              renderItem={({item}) => <Item {...item} />}
              keyExtractor={item => item.order_id}
            />
            ) : <ActivityIndicator size='large' color='blue'/>}
          </SafeAreaView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt: {fontSize: 25, fontWeight: 'bold'},
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection:"row"
  },
  title: {
    fontSize: 22,
    fontWeight:"500"
  },
});
