import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { Colors } from '@values';
import React from 'react';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
  disabled?: Boolean;
  children?: React.ReactNode;
}

export default function Button({ title, onPress, style, textStyle, children }: ButtonProps) {
  const [fontsLoaded, fontError] = useFonts({
    'Segoe UI Bold': require('@fonts/Segoe UI Bold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
      {children ? 
        children : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Segoe UI Bold',
  },
});