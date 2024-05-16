import { View, StyleSheet, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from '@values';
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

export default function BookALockerCard({ locker, style }: CardProps) {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={[styles.card, style]}>
      <View style={styles.lockerDetailsSection}>
        <View style={styles.locationSection}>
          <SimpleLineIcons name="location-pin" size={37} color={Colors.orangeDarker} style={{ marginRight: 8 }}/>
          <View style={styles.lockerDetailsSection}>
            <Text style={styles.locationText}>{locker.location}</Text>
            <Text style={styles.availability}>12/19 Available</Text>
          </View>
        </View>
      </View>
      <Button title="Book" style={styles.bookButton} />
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
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockerDetailsSection: {
    flexDirection: 'column',
  },
  locationText: {
    color: Colors.textDark,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  availability: {
    color: Colors.anotherGrayDarker,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    marginBottom: 3
  },
  bookButton: {
    paddingVertical: 5,
    paddingHorizontal: 25,
  }
});