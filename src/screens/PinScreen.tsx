import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from 'src/values';
import { Button, IconButton, Keypad } from '@components';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext, db } from '@utils';

interface PinScreenProps {
  route: any,
  navigation: any;
  subtitle?: string,
}

export default function PinScreen({ route, navigation }: PinScreenProps) {
  const { user } = useContext(AuthContext);
  const { id, name, location, state } = route.params;
  const [tempPin, setTempPin] = useState('');
  const [pin, setPin] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [confirmingPin, setConfirmingPin] = useState(false);
  const [triesLeft, setTriesLeft] = useState(2);

  const [subtitle, setSubtitle] = useState(() => {
    if (state === 'create') {
      return 'Create PIN';
    } else if (state === 'unlock') {
      return 'Unlock Locker';
    }
  });

  useEffect(() => {
    if (state === 'unlock') {
      const fetchLocker = async () => {
        const userRef = doc(db, 'users', user.uid);
        const lockerRef = doc(userRef, 'lockers', id);
        const lockerSnapshot = await getDoc(lockerRef);
        if (lockerSnapshot.exists()) {
          setPin(lockerSnapshot.data().pin);
          setIpAddress(lockerSnapshot.data().ipAddress);
        }
      };

      fetchLocker();
    }
  }, [state, user, id]);
  
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleSetPin = (value: string) => {
    if (value.length <= 4) {
      setTempPin(value);
    }
  };

  const validatePin = () => {
    return tempPin === pin;
  }

  const handleButtonPress = async () => {
    if (state === 'create') {
      if (!confirmingPin) {
        setPin(tempPin);
        setTempPin('');
        setConfirmingPin(true);
        setSubtitle('Confirm PIN');
        return;
      }

      if (triesLeft === 0) {
        navigation.pop();
        navigation.navigate('PaymentConfirm', { name: name, location: location, state: 'failed' });
        return;
      }

      const valid = validatePin();
      if (!valid) {
        setTriesLeft(triesLeft - 1);
        setTempPin('');
        setSubtitle('Wrong PIN');
        return;
      }

      navigation.pop();
      navigation.navigate('PaymentConfirm', { id: id, name: name, location: location, pin: pin, state: 'success' });
      return;
    }

    if (state === 'unlock') {
      const valid = validatePin();
      if (!valid) {
        setTempPin('');
        setSubtitle('Wrong PIN');
        return;
      }

      const response = await fetch(`http://${ipAddress}/relay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ relay: 'unlock' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userRef = doc(db, 'users', user.uid);
      const lockerRef = doc(userRef, 'lockers', id);
      await updateDoc(lockerRef, { locked: false });

      navigation.pop();
      navigation.navigate('YourLockers');
      return;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top', 'bottom']}>
      <LinearGradient colors={[Colors.orange, Colors.red]} style={StyleSheet.absoluteFill} />
      <View style={styles.container}>
        <View style={styles.appBar}>
          <IconButton icon={
            <Ionicons name='arrow-back' size={24} color={Colors.white} />
          } onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 50 }}>
          {Array(4).fill(null).map((_, index) => (
            <View key={index} style={{
              width: 12,
              height: 12,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: Colors.white,
              backgroundColor: index < tempPin.length ? Colors.white : 'transparent',
              marginHorizontal: 10,
            }} />
          ))}
        </View>
        <Keypad value={tempPin} setValue={handleSetPin} style={{marginBottom: 38 }} />
        <Button
          title="Enter"
          style={{ backgroundColor: Colors.white, opacity: tempPin.length < 4 ? 0.5 : 1}}
          textStyle={{ color: Colors.red }}
          disabled={tempPin.length < 4}
          onPress={handleButtonPress} />
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24
  },
  appBar: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  subtitle: {
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