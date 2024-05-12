import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Colors } from '@values';
import { Button, Modal, CredentialInput, Keypad } from '@components';
import { useState } from 'react';

export default function PinScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const [pin, setPin] = useState('');

  const handleSetPin = (value: string) => {
    if (value.length <= 4) {
      setPin(value);
    }
  };

  return (
    <>
      <LinearGradient colors={[Colors.orange, Colors.red]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={{ width: '100%', alignItems: 'center', paddingHorizontal: 24 }}>
        <Ionicons name={'arrow-back'} size={32} color={Colors.white} style={{ alignSelf: 'flex-start', marginBottom: 40 }} />
        <Text style={styles.title}>ID - 19</Text>
        <Text style={styles.subTitle}>Create Pin</Text>
        <View style={{ flexDirection: 'row', marginBottom: 50 }}>
          {Array(4).fill(null).map((_, index) => (
            <View key={index} style={{
              width: 12,
              height: 12,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: Colors.white,
              backgroundColor: index < pin.length ? Colors.white : 'transparent',
              marginHorizontal: 10,
            }} />
          ))}
        </View>
        <Keypad value={pin} setValue={handleSetPin} style={{ marginBottom: 38 }} />
        <Button title="Enter" style={{ backgroundColor: Colors.white }} textStyle={{ color: Colors.red }} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    marginBottom: 9,
  },
  subTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginBottom: 45,
  },
  signUpButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  smallText: {
    color: Colors.textLight,
    fontSize: 12,
  },
});