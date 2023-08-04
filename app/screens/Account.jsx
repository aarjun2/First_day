import { View, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useContext } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { updatePassword } from 'firebase/auth';

const Account = () => {
  const [newPassword, setNewPassword] = useState('');
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  const handleChangePassword = () => {
    if (!newPassword) {
      alert('Please enter a new password.');
      return;
    }

    updatePassword(user, newPassword)
      .then(() => {
        alert('Password changed successfully.');
        setNewPassword('');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to change password. Please try again.');
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <TextInput
          style={{
            width: 250,
            height: 40,
            borderColor: 'yellow',
            borderWidth: 1,
            marginTop: 10,
            paddingHorizontal: 10,
            color: 'yellow',
          }}
          secureTextEntry
          placeholder="New Password"
          placeholderTextColor="yellow"
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
        />
        <Button onPress={handleChangePassword} title="Change Password" color="yellow" />
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sign Out" color="yellow" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Account;