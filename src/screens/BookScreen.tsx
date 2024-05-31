import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from 'src/values';
import { BookALockerCard } from '@components';

const data = [
  {
    id: 1,
    location: 'GKU 3',
    totalLockers: 2,
    availableLockers: 1,
    lockers: [
      {
        id: 1,
        name: 'ID-19',
        booked: true
      },
      {
        id: 2,
        name: 'ID-20',
        booked: false
      }
    ]
  },
  // {
  //   id: 2,
  //   location: 'Plano',
  //   totalLockers: 1,
  //   availableLockers: 0,
  //   lockers: []
  // },
  // {
  //   id: 3,
  //   location: 'GKU 1',
  //   totalLockers: 3,
  //   availableLockers: 3,
  //   lockers: []
  // },
  // {
  //   id: 4,
  //   location: 'Perpustakaan',
  //   totalLockers: 5,
  //   availableLockers: 0,
  //   lockers: []
  // },
  // {
  //   id: 5,
  //   location: 'KOICA',
  //   totalLockers: 3,
  //   availableLockers: 2,
  //   lockers: []
  // },
]

// TO-DO - Add pagination
export default function BookScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <AppBar profileButtonDisabled />
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Location</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <BookALockerCard item={item} style={{ marginBottom: 15 }} />
          )}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  containerAlt: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: Colors.orangeDarker,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 22,
  },
  titleNumber: {
    color: Colors.textDark,
    fontSize: 20,
    fontFamily: 'Poppons-Regular',
  },
  text: {
    color: Colors.grayDarker,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 38,
  }
});