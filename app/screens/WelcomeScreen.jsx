import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-blue-600`}> 
      <View style={tw`flex-1 justify-around my-4`}> 
        <Text style={tw`text-white font-bold text-4xl text-center my-8`}> 
          FIRST DAY
        </Text>
        <View style={tw`flex-row justify-center mb-8`}> 
          {/* <Image source={require("../assets/images/welcome.png")} style={{ width: 350, height: 350 }} /> */}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUPScreen')}
            style={tw`py-3 bg-yellow-400 mx-7 rounded-xl mb-4`} 
          >
            <Text style={tw`text-xl font-bold text-center text-gray-700`}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row justify-center`}>
            <Text style={tw`text-white font-semibold`}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={tw`font-semibold text-yellow-400`}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}