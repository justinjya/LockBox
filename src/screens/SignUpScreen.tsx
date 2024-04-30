import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Colors } from '@values';
import { Button, Modal, CredentialInput } from '@components';

export default function SignUpScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('@fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('@fonts/Inter-Bold.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient colors={[Colors.orange, Colors.red]} style={StyleSheet.absoluteFillObject}>
      <SafeAreaView style={styles.safeArea}>
        <Modal style={{ alignItems: 'center', marginBottom: 19 }}>
          <Text style={styles.title}>Sign Up</Text>
          <CredentialInput 
            placeholder='Name'
            style={{ marginBottom: 29 }} />
          <CredentialInput 
            placeholder='Email'
            style={{ marginBottom: 29 }} />
          <CredentialInput 
            placeholder='Password'
            style={{ marginBottom: 43 }} />
          <Button title="Sign Up"/>
        </Modal>
        <Button style={styles.signUpButton}>
          <Text style={styles.smallText}>Already have an account? </Text>
          <Text style={[styles.smallText, { fontFamily: 'Inter-Bold' }]}>Login</Text>
        </Button>
        <StatusBar style="light" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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