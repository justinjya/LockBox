import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from '@values';
import { BookALockerCard, Button } from '@components';
import LogoAlt from 'src/components/svg/LogoAlt';

interface Locker {
  id: number;
  name: string;
  location: string;
  locked: boolean;
}

const data = [ // TODO: Finalize data structure then replace
  { 
    id: 1,
    name: 'ID-19',
    location: 'GKU 3',
    locked: true
  },
  { 
    id: 2,
    name: 'ID-08',
    location: 'Plano',
    locked: false
  },
  { 
    id: 3,
    name: 'ID-13',
    location: 'GKU 1',
    locked: true
  },
  { 
    id: 4,
    name: 'ID-18',
    location: 'Perpustakaan',
    locked: true
  },
  { 
    id: 5,
    name: 'ID-03',
    location: 'KOICA',
    locked: true
  },
] as Array<Locker>;

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
    <>
      <AppBar />
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Location</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <BookALockerCard locker={item} style={{ marginBottom: 15 }} />
          )}
        />
      </View>
      <StatusBar style="auto" />
    </>
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