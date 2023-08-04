import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { FIREBASE_AUTH } from './firebaseConfig';
import { useState } from 'react';
import MainContainer from './app/screens/MainNavigator';
import LoginStack from './app/screens/LoginStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user',user);
      setUser(user);
    }, []);
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (<Stack.Screen
          name="Account"
          component={MainContainer}
        />) : (<Stack.Screen
          name="Login"
          component={LoginStack}
        />)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

