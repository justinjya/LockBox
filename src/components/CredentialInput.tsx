import { TextInput, StyleSheet, Platform } from 'react-native';
import { Colors } from 'src/values';

interface CredentialInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: object;
  password?: boolean;
}

export default function CredentialInput({ placeholder, value, onChangeText, style, password = false }: CredentialInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      autoCapitalize='none'
      onChangeText={onChangeText}
      secureTextEntry={password}
      style={[styles.input, style]} />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    fontSize: 15,
    color: Colors.graySlightlyDarker,
    borderColor: Colors.grayDarker,
    borderBottomWidth: 1,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        boxShadow: '0px -1px 0px 0px #D2D2D2 inset'
      },
    }),
  },
});