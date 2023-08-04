import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Button, Alert } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-ranges';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from './MainNavigator';

export default function HotelScreen() {
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const { city} = useContext(LocationContext);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{ container: { width: '80%', marginHorizontal: '3%' }, text: { fontSize: 20 } }}
        primary
        title='SUBMIT'
      />
    )
  }
  const navigation = useNavigation();
  const handleNavigate = () => {
    if (destination.trim() === '' || !selectedDate || numberOfAdults <= 0) {
      Alert.alert('Incomplete Information', 'Please fill all fields before proceeding.');
      return;
    }
    navigation.navigate('Result', {
      destination,
      selectedDate,
      numberOfAdults,
    });

    setDestination('');
    setSelectedDate(null);
    setNumberOfAdults(0);
  };

  const useDefaultLocation = () => {
    console.log('Default City:', city);
    setDestination(city);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={tw`flex-1 bg-black justify-center items-center p-4`}>
        <TouchableOpacity
          style={tw`flex-row items-center px-3 py-2 bg-yellow-600 rounded-full mb-3 w-full max-w-md`}
        >
          <Ionicons name="search" size={20} color="black" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1 text-base text-black`}
            placeholder="Enter destination"
            placeholderTextColor="black"
            value={destination}
            onChangeText={(text) => setDestination(text)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center px-3 py-2 bg-yellow-600 rounded-full mb-3 w-full max-w-md`}
        >
          <Ionicons name="search" size={20} color="black" style={tw`mr-2`} />
          <DatePicker
            style={{ width: 300, height: 30, borderRadius: 0, borderWidth: 0 }}
            customStyles={{
              placeholderText: { fontSize: 20, color: 'black' },
              headerStyle: {
                backgroundColor: '#006400',
              },
              contentText: { fontSize: 15 },
              headerMarkTitle: { display: 'none' },
            }}
            centerAlign
            allowFontScaling={false}
            customButton={(onConfirm) => customButton(onConfirm)}
            onConfirm={(startDate, endDate) => setSelectedDate(startDate, endDate)}
            placeholder={'Apr 27, 2018 → Jul 10, 2018'}
            mode={'range'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center px-3 py-2 bg-yellow-600 rounded-full mb-3 w-full max-w-md`}
        >
          <Ionicons name="person" size={20} color="black" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1 text-base text-black`}
            placeholder="Number of Adults"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={numberOfAdults > 0 ? numberOfAdults.toString() : ''}
            onChangeText={(text) => setNumberOfAdults(parseInt(text))}
          />
        </TouchableOpacity>
        <Button
          onPress={handleNavigate}
          title="Search"
          color="#FFD700"
        />
        <TouchableOpacity
            style={tw`mt-4`}
            onPress={useDefaultLocation}
          >
            <Text style={tw`text-yellow-300 text-base font-semibold`}>Use Default Location</Text>
          </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}