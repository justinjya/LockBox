import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from 'src/values';
import Button from './Button';

interface CardProps {
  item: any;
  style?: object;
}

export default function BookALockerCard({ item, style }: CardProps) {
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
        <View style={styles.locationSection}>
          <SimpleLineIcons name="location-pin" size={37} color={Colors.orangeDarker} style={{ marginRight: 8 }}/>
          <View style={styles.lockerDetailsSection}>
            <Text style={styles.locationText}>{item.name}</Text>
            <Text style={styles.availability}>{item.availableLockers}/{item.totalLockers} Available</Text>
          </View>
        </View>
      </View>
      <Button
        title="Book"
        style={styles.bookButton}
        onPress={() => navigation.navigate('Payment', { id: item.id, location: item.name })} />
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