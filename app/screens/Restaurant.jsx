import React, { useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from './MainNavigator';

export default function RestaurantScreen() {
  const [cityVal, setCity] = useState('');
  const [stateVal, setState] = useState('');
  const navigation = useNavigation();
  const { city, state } = useContext(LocationContext);

  const handleNavigate = () => {
    if (cityVal.trim() === '' || stateVal.trim() === '') {
      Alert.alert('Incomplete Information', 'Please fill all fields before proceeding.');
      return;
    }
    navigation.navigate('RestaurantResult', {
      cityVal,
      stateVal,
    });

    setCity('');
    setState('');
  };

  const useDefaultLocation = () => {
    console.log('Default City:', city);
    console.log('Default State:', state);
    setCity(city);
    setState(state);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <View style={tw`w-3/4`}>
          <View style={tw`mb-6`}>
            <TouchableOpacity style={tw`flex-row items-center px-3 py-2 bg-yellow-600 rounded-full mb-3`}>
              <Ionicons name="search" size={20} color="black" style={tw`mr-2`} />
              <TextInput
                style={tw`flex-1 text-base text-black`}
                placeholder="Enter City"
                placeholderTextColor="black"
                value={cityVal}
                onChangeText={(text) => setCity(text)}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center px-3 py-2 bg-yellow-600 rounded-full`}>
              <Ionicons name="search" size={20} color="black" style={tw`mr-2`} />
              <TextInput
                style={tw`flex-1 text-base text-black`}
                placeholder="Enter State"
                placeholderTextColor="black"
                value={stateVal}
                onChangeText={(text) => setState(text)}
              />
            </TouchableOpacity>
          </View>
          <Button
            onPress={handleNavigate}
            title="Search"
            color="#FFD700"
          />
           <View style={tw`mt-4 justify-center items-center`}>
            <TouchableOpacity
              onPress={useDefaultLocation}
              style={tw`rounded-full bg-yellow-600 px-4 py-2 mt-2`}
            >
              <Text style={tw`text-black text-base font-semibold`}>Use Default Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}