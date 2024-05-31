import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from 'src/values';
import Button from './Button';

interface Locker {
  id: number;
  name: string;
  location: string;
  locked: boolean;
}

interface CardProps { 
  locker: Locker;
  style?: object;
}

export default function YourLockerCard({ locker, style }: CardProps) {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigation: any = useNavigation();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.lockerDetailsSection}>
        <Text style={styles.lockerName}>{locker.name}</Text>
        <View style={styles.locationSection}>
          <SimpleLineIcons name="location-pin" size={15} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
          <Text style={styles.locationText}>{locker.location}</Text>
        </View>
      </View>
      <Button style={styles.lockUnlockButton} onPress={() => navigation.navigate('Pin', { name: locker.name, state: 'unlock' })}>
        <LinearGradient colors={[Colors.orange, Colors.red]} style={[StyleSheet.absoluteFillObject, { borderRadius: 50 }]} />
        { locker.locked ? 
          <Octicons name="lock" size={28} color={Colors.white} /> :
          <Octicons name="unlock" size={28} color={Colors.white} /> }
      </Button>
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
  }
});