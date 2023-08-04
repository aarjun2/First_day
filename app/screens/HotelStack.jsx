import React from 'react'
import Results from './Results';
import HotelScreen from './Hotel';
import Map from './Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const HotelStack = () => {
  return (
    <Stack.Navigator initialRouteName="HotelScreen">
        <Stack.Screen name="Result" component={Results} options={{ headerShown: false }}/>
        <Stack.Screen name="HotelScreen" component={HotelScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Map" component={Map}/>
    </Stack.Navigator>
  )
}

export default HotelStack