import { TextInput, StyleSheet } from 'react-native';
import { Colors } from '@values';

interface CredentialInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: object;
}

export default function CredentialInput({ placeholder, value, onChangeText, style }: CredentialInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]} />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    fontSize: 15,
    borderColor: Colors.grayDarker,
    borderBottomWidth: 1,
  },
});