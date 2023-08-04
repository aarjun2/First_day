import { View, Text, TouchableOpacity, 
    Image, TextInput, TouchableWithoutFeedback, Keyboard,
ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import tw from 'twrnc';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Successfully logged in');
    } catch (error) {
      console.log(error);
      alert('Account not found');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      alert('Please enter your email to reset password');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Please check your email inbox.');
    } catch (error) {
      console.log(error);
      alert('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={tw`flex-1 bg-white`}>
      <SafeAreaView  style={tw`flex`}>
        <View style={tw`flex-row justify-start`}>
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          style={tw`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4`}>
            <Ionicons name="arrow-back-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View  style={tw`flex-row justify-center`}>
          {/* <Image source={require('../assets/images/login.png')} 
          style={{width: 200, height: 200}} /> */}
        </View>
        
        
      </SafeAreaView>
      <View  
        style={tw`flex-1 bg-white px-8 pt-8`}>
          <View>
            <Text style={tw`text-gray-700 ml-4`}>Email Address</Text>
            <TextInput 
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
              placeholder="email"
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
            <Text style={tw`text-gray-700 ml-4`}>Password</Text>
            <TextInput 
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl`}
              secureTextEntry
              placeholder="password"
              onChangeText={(e) => setPassword(e)}
              value={password}
            />
            {loading ? (
                <ActivityIndicator size="large" color="red" />
                ) : (
                    <>
                        <TouchableOpacity style={tw`flex items-end`} onPress={forgotPassword}>
                            <Text style={tw`text-gray-700 mb-5`}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={tw`py-3 bg-yellow-400 rounded-xl`} onPress={signIn}>
                                <Text 
                                    style={tw`text-xl font-bold text-center text-gray-700`}
                                >
                                        Login
                                </Text>
                        </TouchableOpacity>
                    </>
                )}
          </View>
          <Text style={tw`text-xl text-gray-700 font-bold text-center py-5`}>Or</Text>
          {/* <View style={tw`flex-row justify-center space-x-12`}>
            <TouchableOpacity style={tw`p-2 bg-gray-100 rounded-2xl`}>
              <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" />
            </TouchableOpacity>
          </View> */}
          <View style={tw`flex-row justify-center mt-7`}>
              <Text style={tw`text-gray-500 font-semibold`}>
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUPScreen')}>
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}