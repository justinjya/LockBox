import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View, Alert } from "react-native";
import { useFonts } from 'expo-font';
import { Colors } from "src/values";
import { AppBar, CredentialInput, Button } from '@components';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext, db } from '@utils';
import { doc, updateDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const { 
    user,
    name: sessionName,
    email: sessionEmail,
    phoneNumber: sessionPhoneNumber,
  } = useContext(AuthContext);
  const [name, setName] = useState(sessionName || '');
  const [phoneNumber, setPhoneNumber] = useState(sessionPhoneNumber || '');
  const [email] = useState(sessionEmail || '');

  const [initialName, setInitialName] = useState(name);
  const [initialPhoneNumber, setInitialPhoneNumber] = useState(phoneNumber);

  const [isChanged, setIsChanged] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Segoe UI': require('@fonts/Segoe UI.ttf'),
    'Segoe UI Bold': require('@fonts/Segoe UI Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
      return null;
  };

  const handleSavePress = async () => {
    setInitialName(name);
    setInitialPhoneNumber(phoneNumber);

    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        name: name,
        phoneNumber: phoneNumber,
      });
      setIsChanged(false);
    } catch (error: any) {
      Alert.alert('Save Failed', 'Something went wrong. Please try again.');
    }
  }

  const handleDiscardPress = () => {
    setName(initialName);
    setPhoneNumber(initialPhoneNumber);
    setIsChanged(false);
  }

  const handleLogOutPress = () => {
    const auth = getAuth();
    signOut(auth)
      .catch(() => {
        Alert.alert('Log Out Failed', 'Something went wrong. Please try again.');
      });
  }

  return (
    <>
      <AppBar title='Profile' profileButtonDisabled />
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <CredentialInput 
          value={name} 
          onChangeText={(text) => { setName(text); setIsChanged(true); }} 
          style={styles.inputField} 
        />
        <Text style={styles.label}>Number</Text>
        <CredentialInput 
          value={phoneNumber} 
          onChangeText={(text) => { setPhoneNumber(text); setIsChanged(true); }} 
          style={styles.inputField} 
        />
        <Text style={styles.label}>Email</Text>
        <View style={[styles.inputField, { width: '100%', height: 40, justifyContent: 'center' }]}>
          <Text style={{ fontFamily: 'Segoe UI Bold', color: Colors.anotherGrayDarker }}>{email}</Text>
        </View>
        <Button 
          title='Save' 
          style={[styles.saveButton, !isChanged && styles.disabledButton]} 
          disabled={!isChanged}
          onPress={handleSavePress}
        />
        <Button 
          title='Discard' 
          style={[styles.discardButton, !isChanged && styles.disabledButton]} 
          textStyle={[styles.discardButtonText, !isChanged && styles.disabledButtonText]}
          disabled={!isChanged}
          onPress={handleDiscardPress}
        />
        <Button
          title='Log Out'
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
          onPress={handleLogOutPress}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 13, 
    alignSelf: 'flex-start', 
    fontFamily: 'Segoe UI'
  },
  inputField: {
    backgroundColor: Colors.gray,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 13,
    borderBottomWidth: 0,
    fontFamily: 'Segoe UI Bold',
  },
  saveButton: {
    marginTop: 44, 
    marginBottom: 13
  },
  discardButton: {
    backgroundColor: 'transparent', 
    marginBottom: 63
  },
  discardButtonText: {
    color: Colors.textDark,
    fontFamily: 'Segoe UI',
  },
  logoutButton: {
    backgroundColor: 'transparent'
  },
  logoutButtonText: {
    color: Colors.redDarker
  },
  disabledButton: {
    opacity: 0.5
  },
  disabledButtonText: {
    color: Colors.white
  },
});