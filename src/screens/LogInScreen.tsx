import { Text, StyleSheet, Alert, View, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Colors } from '@values';
import { Button, Modal, CredentialInput, Logo } from '@components';
import { useState } from 'react';

interface LogInScreenProps {
  navigation: any;
}

export default function LogInScreen({ navigation }: LogInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('@fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('@fonts/Inter-Bold.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleLogInPress = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .catch(() => {
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      });
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <LinearGradient colors={[Colors.orange, Colors.red]} style={StyleSheet.absoluteFill} />
      {Platform.OS === 'web' ? (
        <>
          <View style={[styles.contentContainer, { justifyContent: 'center' }]}>
            <Logo width={92} style={{ alignSelf: 'center' }} />
            <Modal style={{ alignItems: 'center', marginBottom: 19 }}>
              <Text style={styles.title}>Log In</Text>
              <CredentialInput 
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                style={{ marginBottom: 29 }} />
              <CredentialInput 
                value={password}
                onChangeText={setPassword}
                password
                placeholder='Password'
                style={{ marginBottom: 43 }} />
              <Button title="Log In" onPress={handleLogInPress} />
            </Modal>
            <Button style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.smallText}>Don't have an account? </Text>
              <Text style={[styles.smallText, { fontFamily: 'Inter-Bold' }]}>Sign Up</Text>
            </Button>
          </View>
        </>
      ): (
        <>
          <View style={[styles.contentContainer, { position: 'absolute' }]}>
            <Logo width={92} style={{ marginTop: 40, alignSelf: 'flex-start' }} />
          </View>
          <View style={[styles.contentContainer, { justifyContent: 'center' }]}>
            <Modal style={{ alignItems: 'center', marginBottom: 19 }}>
              <Text style={styles.title}>Log In</Text>
              <CredentialInput 
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                style={{ marginBottom: 29 }} />
              <CredentialInput 
                value={password}
                onChangeText={setPassword}
                password
                placeholder='Password'
                style={{ marginBottom: 43 }} />
              <Button title="Log In" onPress={handleLogInPress} />
            </Modal>
            <Button style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.smallText}>Don't have an account? </Text>
              <Text style={[styles.smallText, { fontFamily: 'Inter-Bold' }]}>Sign Up</Text>
            </Button>
          </View>
        </>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: windowWidth > 600 ? 310 : '90%',
    height: '100%',
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
    alignSelf: 'center',
  },
  smallText: {
    color: Colors.textLight,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});