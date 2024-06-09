import { TouchableOpacity, StyleSheet } from "react-native";
import React from 'react';

interface ButtonProps {
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: object;
  disabled?: boolean;
}

export default function Button({ icon, onPress, style, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled} >
      {icon? icon : null}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
  }
});