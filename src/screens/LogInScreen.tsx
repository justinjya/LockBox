import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Colors } from '@values';
import { Button, Modal, CredentialInput } from '@components';

export default function LogInScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('@fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('@fonts/Inter-Bold.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <LinearGradient colors={[Colors.orange, Colors.red]} style={StyleSheet.absoluteFill} />
      <View style={styles.container}>
        <Modal style={{ alignItems: 'center', marginBottom: 19 }}>
          <Text style={styles.title}>Log In</Text>
          <CredentialInput 
            placeholder='Email'
            style={{ marginBottom: 29 }} />
          <CredentialInput 
            placeholder='Password'
            style={{ marginBottom: 43 }} />
          <Button title="Log In"/>
        </Modal>
        <Button style={styles.signUpButton}>
          <Text style={styles.smallText}>Don't have an account? </Text>
          <Text style={[styles.smallText, { fontFamily: 'Inter-Bold' }]}>Sign Up</Text>
        </Button>
        <StatusBar style="light" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.orange,
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    marginBottom: 43,
  },
  signUpButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  smallText: {
    color: Colors.textLight,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});