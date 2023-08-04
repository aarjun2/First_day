import React from 'react'
import RestaurantResults from './RestaurantResults';
import RestaurantScreen from './Restaurant';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const RestaurantStack = () => {
  return (
    <Stack.Navigator initialRouteName="RestaurantScreen">
        <Stack.Screen name="RestaurantResult" component={RestaurantResults}/>
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default RestaurantStack