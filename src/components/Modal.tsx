import { View, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from 'src/values';

interface ModalProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function Modal({ children, style }: ModalProps) {
  return (
    <View style={[styles.modal, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
  }
});