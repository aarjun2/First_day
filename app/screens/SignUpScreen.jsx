import { View, Text, TouchableOpacity, Image, TextInput,
TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          console.log(response);
          alert('Account created');
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      const dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={tw`flex-1 bg-white`} >
      <SafeAreaView style={tw`flex`}>
        <View style={tw`flex-row justify-start`}>
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                style={tw`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4`}
            >
            <Ionicons name="arrow-back-outline" size={20} color="black" />
            </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center`}>
            {/* <Image source={require('../assets/images/signup.png')} 
                style={{width: 165, height: 110}} /> */}
        </View>
      </SafeAreaView>
      <View style={tw`flex-1 bg-white px-8 pt-8`}
      >
        <View>
            {/* <Text style={tw`text-gray-700 ml-4`}>Full Name</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value="john snow"
                placeholder='Enter Name'
            /> */}
            <Text style={tw`text-gray-700 ml-4`}>Email Address</Text>
            <TextInput
                style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
                placeholder='Enter Email'
                onChangeText={(e) => setEmail(e)}
                value={email}
            />
            <Text style={tw`text-gray-700 ml-4`}>Password</Text>
            <TextInput
                style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7`}
                secureTextEntry
                placeholder='Enter Password'
                onChangeText={(e) => setPassword(e)}
                value={password}
            />
            {loading ? (
          <ActivityIndicator size="large" color="red" />
            ) : (<TouchableOpacity
                style={tw`py-3 bg-yellow-400 rounded`}
                onPress={signUp}
            >
                <Text style={tw`font-xl font-bold text-center text-gray-700`}>
                    Sign Up
                </Text>
            </TouchableOpacity>)}
        </View>
        <Text style={tw`text-xl text-gray-700 font-bold text-center py-5`}>
            Or
        </Text>
        {/* <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/google.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/apple.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/facebook.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
        </View> */}
        <View style={tw`flex-row justify-center mt-7`}>
            <Text style={tw`text-gray-500 font-semibold`}>Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')}>
                <Text style={tw`font-semibold text-yellow-500`}> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}