import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from 'src/values';
import { BookALockerCard } from '@components';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@utils';

export default function BookScreen() {
  const [locations, setLocations] = useState<any[]>([]);

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {
    const fetchLocations = async () => {
      const locationsRef = collection(db, 'locations');
      const locationsSnapshot = await getDocs(locationsRef);
      const locationsList = locationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLocations(locationsList);
    };

    fetchLocations();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <AppBar profileButtonDisabled />
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Location</Text>
        <FlatList
          data={locations}
          renderItem={({ item }) => (
            <BookALockerCard item={item} style={{ marginBottom: 15 }} />
          )}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth > 600 ? 390 : '100%',
    alignSelf: 'center',
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