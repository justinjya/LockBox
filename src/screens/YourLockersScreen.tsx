import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from '@values';
import { YourLockerCard, Button } from '@components';
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
] as Array<Locker>;

export default function YourLockersScreen() {
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
      {/* <View style={styles.containerAlt}>
        <View style={{ flexDirection: 'row', marginBottom: 138 }}>
          <Text style={styles.title}>Your Lockers</Text>
          <Text style={styles.titleNumber}> (0)</Text>
        </View>
        <LogoAlt style={{ alignSelf: 'center', marginBottom: 16 }} />
        <Text style={styles.text}>You Haven't Booked Any Locker Yet!</Text>
        <Button title="Book Locker" style={{ alignSelf: 'center', marginBottom: 24 }}/> 
      </View> */}

      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginBottom: 22 }}>
          <Text style={styles.title}>Your Lockers</Text>
          <Text style={styles.titleNumber}> ({data.length})</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <YourLockerCard locker={item} style={{ marginBottom: 15 }} />
          )}
        />
      </View>
      <Button title="Book Locker" style={{ alignSelf: 'center', marginBottom: 24 }}/>
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