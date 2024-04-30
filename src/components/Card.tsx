import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from '@values';
import Button from './Button';

interface CardProps { 
  // TODO: Define props after finalized data structure
}

export default function Card() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.lockerDetailsSection}>
        <Text style={styles.lockerName}>LO-19</Text>
        <View style={styles.locationSection}>
          <SimpleLineIcons name="location-pin" size={16} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
          <Text style={styles.locationText}>Locker Location</Text>
        </View>
      </View>
      <Button style={styles.lockUnlockButton}>
        <LinearGradient colors={[Colors.orange, Colors.red]} style={[StyleSheet.absoluteFillObject, { borderRadius: 50 }]} />
        <Octicons name="unlock" size={28} color={Colors.white} />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.orangeLighter,
    padding: 20,
  },
  lockerDetailsSection: {
    flexDirection: 'column',
  },
  lockerName: {
    color: Colors.orangeDarker,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
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