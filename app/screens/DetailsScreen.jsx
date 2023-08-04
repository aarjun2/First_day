import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import { LocationContext } from './MainNavigator';
import * as ImagePicker from 'expo-image-picker';

export default function DetailsScreen() {
  const [location, setLocation] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [tempCity, setTempCity] = useState('');
  const [tempState, setTempState] = useState('');
  const { setCity, setState } = useContext(LocationContext);

  useEffect(() => {
    const getPermissionsAndReverseGeocode = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:");
        console.log(currentLocation);

        const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
          longitude: currentLocation.coords.longitude,
          latitude: currentLocation.coords.latitude
        });
        console.log("Reverse Geocoded:");
        console.log(reverseGeocodedAddress[0].city);
        console.log(reverseGeocodedAddress[0].region);
        setCity(reverseGeocodedAddress[0].city)
        setState(reverseGeocodedAddress[0].region)
        setTempCity(reverseGeocodedAddress[0].city)
        setTempState(reverseGeocodedAddress[0].region)
      } catch (error) {
        console.log("Error while getting location or reverse geocoding:", error);
      }
    };

    if (isButtonClicked) {
      getPermissionsAndReverseGeocode();
    }
  }, [isButtonClicked]);

  const handleButtonPress = () => {
    setIsButtonClicked(true);
  };

  const [image, setImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const TakeImage = async () => {
    if (permission.status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } else {
      Alert.alert(
        'Camera Permission Required',
        'Please grant camera permission in order to take a photo.',
        [
          { text: 'OK', onPress: requestPermission },
        ]
      );
    }
  };

  return (
    <View style={[tw`flex-1 items-center justify-center bg-black`]}>
      <Text style={tw`text-white text-4xl mb-6 font-bold shadow-lg`}>Account Details</Text>
      {image ? (
        <Image
          source={{ uri: image }}
          style={tw`w-48 h-48 rounded-full mb-4 border-4 border-yellow-400`}
        />
      ) : (
        <View
          style={tw`w-48 h-48 bg-gray-300 rounded-full justify-center items-center mb-4`}
        >
          <Ionicons name="person" size={40} color="black" />
          <Text style={tw`text-black text-xl mt-2`}>Add Profile Photo</Text>
        </View>
      )}
      {location && (
        <View style={tw`flex-row items-center mb-4`}>
          <Ionicons name="location" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-lg`}>
            {tempCity}, {tempState}
          </Text>
        </View>
      )}
      <View style={tw`flex-col items-center mb-4`}>
        <TouchableOpacity
          onPress={TakeImage}
          style={tw`py-3 px-6 bg-yellow-400 rounded-lg mb-2`}
        >
          <Text style={tw`text-xl font-bold text-center text-gray-700`}>
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImage}
          style={tw`py-3 px-6 bg-yellow-400 rounded-lg`}
        >
          <Text style={tw`text-xl font-bold text-center text-gray-700`}>
            Choose from Photos
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={tw`border border-white px-6 py-3 rounded-md`}
        onPress={handleButtonPress}
      >
        <Text style={tw`text-white text-xl font-bold`}>FIND LOCATION</Text>
      </TouchableOpacity>
    </View>
  );
}