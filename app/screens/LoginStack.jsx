import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();
const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUPScreen" component={SignUpScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default LoginStack