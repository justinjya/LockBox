import { Text, StyleSheet, Alert, Dimensions, View, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { Colors } from '@values';
import { Button, Modal, CredentialInput, Logo } from '@components';
import { db } from '@utils';

interface SignUpScreenProps {
  navigation: any;
}

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [name, setName] = useState('');
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

  const handleSignUpPress = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        try {
          const userDocRef = doc(db, 'users', user.uid);

          await setDoc(userDocRef, {
            name: name,
            phoneNumber: '',
            email: email,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
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
              <Text style={styles.title}>Sign Up</Text>
              <CredentialInput
                value={name}
                onChangeText={setName}
                placeholder='Name'
                style={{ marginBottom: 29 }} />
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
              <Button title="Sign Up" onPress={handleSignUpPress}/>
            </Modal>
            <Button style={styles.signUpButton} onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.smallText}>Already have an account? </Text>
              <Text style={[styles.smallText, { fontFamily: 'Inter-Bold' }]}>Login</Text>
            </Button>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.contentContainer, { position: 'absolute'}]}>
            <Logo width={92} style={{ marginTop: 40, alignSelf: 'flex-start' }} />
          </View>
          <View style={[styles.contentContainer, { justifyContent: 'center' }]}>
            <Modal style={{ alignItems: 'center', marginBottom: 19 }}>
              <Text style={styles.title}>Sign Up</Text>
              <CredentialInput
                value={name}
                onChangeText={setName}
                placeholder='Name'
                style={{ marginBottom: 29 }} />
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
              <Button title="Sign Up" onPress={handleSignUpPress}/>
            </Modal>
            <Button style={styles.signUpButton} onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.smallText}>Already have an account? </Text>
              <Text style={[styles.smallText, { fontFamily: 'Inter-Bold' }]}>Login</Text>
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
  },
  smallText: {
    color: Colors.textLight,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});