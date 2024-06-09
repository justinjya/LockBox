import { View, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from 'src/values';
import Button from './Button';
import { collection, doc, getDocs, query, runTransaction, updateDoc, where } from 'firebase/firestore';
import { AuthContext, db } from '@utils';
import { useContext } from 'react';
import IconButton from './IconButton';

interface CardProps { 
  item: any;
  style?: object;
}

export default function YourLockerCard({ item, style }: CardProps) {
  const { user } = useContext(AuthContext);
  const navigation: any = useNavigation();
  
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleButtonPress = async () => {
    if (item.locked) {
      navigation.navigate('Pin', { id: item.id, name: item.name, state: 'unlock' });
    } else {
      try {
        const response = await fetch(`http://${item.ipAddress}/relay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ relay: 'lock' }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Update the locked state in the database
        const userRef = doc(db, 'users', user.uid);
        const lockerRef = doc(userRef, 'lockers', item.id);
        await updateDoc(lockerRef, { locked: true });
      } catch (error) {
        console.error('Network request failed', error);
      }
    }
  };

  const handleUnbookPress = async () => {
    const userRef = doc(db, 'users', user.uid);
    const lockerRef = doc(userRef, 'lockers', item.id);
    const locationsRef = collection(db, 'locations');
    const q = query(locationsRef, where('name', '==', item.location));

    const locationSnapshot = await getDocs(q);
    if (locationSnapshot.empty) {
      Alert.alert('Error', 'Location not found');
      return;
    }
    const locationRef = doc(db, 'locations', locationSnapshot.docs[0].id);

    // Unbook the locker and update the available lockers count
    try {
      await runTransaction(db, async (transaction) => {
        const locationSnapshot = await transaction.get(locationRef);
  
        if (!locationSnapshot.exists()) {
          throw 'Document does not exist';
        }
  
        transaction.delete(lockerRef);
        transaction.update(locationRef, { availableLockers: locationSnapshot.data().availableLockers + 1});
      });
    } catch {
      Alert.alert('Error', 'Failed to unbook locker');
    }

    const ledResponse = await fetch(`http://${item.ipAddress}/led`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ led: 'avail' }),
    });

    if (!ledResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const relayResponse = await fetch(`http://${item.ipAddress}/relay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ relay: 'lock' }),
    });

    if (!relayResponse.ok) {
      throw new Error('Network response was not ok');
    }
  }

  return (
    <View style={[styles.card, style]}>
      <View style={styles.lockerDetailsSection}>
        <Text style={styles.lockerName}>{item.name}</Text>
        <View style={styles.locationSection}>
          <SimpleLineIcons name="location-pin" size={15} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button style={styles.lockUnlockButton} onPress={handleButtonPress}>
          <LinearGradient colors={[Colors.orange, Colors.red]} style={[StyleSheet.absoluteFillObject, { borderRadius: 50 }]} />
          { item.locked ? 
            <Octicons name="lock" size={28} color={Colors.white} /> :
            <Octicons name="unlock" size={28} color={Colors.white} /> }
        </Button>
        <IconButton
          icon={<Ionicons name='remove-circle-outline' size={28} color={Colors.red} />}
          onPress={handleUnbookPress}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 91,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grayDarker,
    padding: 20,
  },
  lockerDetailsSection: {
    flexDirection: 'column',
  },
  lockerName: {
    color: Colors.orangeDarker,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 3
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: Colors.textDark,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  lockUnlockButton: {
    width: 51,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginRight: 24,
  }
});