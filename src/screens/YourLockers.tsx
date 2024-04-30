import { View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { AppBar } from '@components';
import { Colors } from '@values';
import { Card, Button } from '@components';

const data = [ // TODO: Finalize data structure then replace
  { 
    id: 1,
    title: 'LO-19',
    location: 'Locker Location'
  },
]

export default function YourLockers() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar />
      {/* <View style={styles.containerAlt}>
        <Text style={[styles.title, { alignSelf: 'center', marginTop: 136 }]}>Uh Oh!</Text>
      </View> */}
      <View style={styles.container}>
        <Text style={styles.title}>Your Lockers</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card />
          )}
        />
      </View>
      <Button title="Book Locker" style={{ alignSelf: 'center', marginBottom: 24 }}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  containerAlt: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
  },
  title: {
    color: Colors.orangeDarker,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 22,
  }
});