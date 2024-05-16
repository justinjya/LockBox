import React, { useState } from 'react';
import { Text, StyleSheet, View } from "react-native";
import { useFonts } from 'expo-font';
import { Colors } from "@values";
import { AppBar, CredentialInput, Button } from '@components';

export default function ProfileScreen() {
  const [name, setName] = useState('Kartika Sari');
  const [number, setNumber] = useState('081212336163');
  const [email, setEmail] = useState('kartik@mail.com');

  const [initiallName, setinitiallName] = useState(name);
  const [initiallNumber, setinitiallNumber] = useState(number);
  const [initiallEmail, setinitiallEmail] = useState(email);

  const [isChanged, setIsChanged] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Segoe UI': require('@fonts/Segoe UI.ttf'),
    'Segoe UI Bold': require('@fonts/Segoe UI Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
      return null;
  };

  return (
      <>
        <AppBar />
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <CredentialInput 
              value={name} 
              onChangeText={(text) => { setName(text); setIsChanged(true); }} 
              style={styles.inputField} 
            />
            <Text style={styles.label}>Number</Text>
            <CredentialInput 
              value={number} 
              onChangeText={(text) => { setNumber(text); setIsChanged(true); }} 
              style={styles.inputField} 
            />
            <Text style={styles.label}>Email</Text>
            <CredentialInput 
              value={email} 
              onChangeText={(text) => { setEmail(text); setIsChanged(true); }} 
              style={styles.inputField} 
            />
            <Button 
              title='Save' 
              style={[styles.saveButton, !isChanged && styles.disabledButton]} 
              disabled={!isChanged}
              onPress={() => {
                  setinitiallName(name);
                  setinitiallNumber(number);
                  setinitiallEmail(email);
                  setIsChanged(false);
              }}
            />
            <Button 
              title='Discard' 
              style={[styles.discardButton, !isChanged && styles.disabledButton]} 
              textStyle={[styles.discardButtonText, !isChanged && styles.disabledButtonText]}
              disabled={!isChanged}
              onPress={() => {
                  setName(initiallName);
                  setNumber(initiallNumber);
                  setEmail(initiallEmail);
                  setIsChanged(false);
              }}
            />
            <Button title='Log Out' style={styles.logoutButton} textStyle={styles.logoutButtonText}/>
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
    backgroundColor: Colors.grayLighter,
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