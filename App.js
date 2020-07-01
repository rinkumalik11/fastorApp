import 'react-native-gesture-handler';

import React from 'react'
import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login'
import History from './src/screens/History'

const Stack = createStackNavigator();

export default App=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='History' component={History}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}




