import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from 'src/values';
import { YourLockerCard, Button } from '@components';
import LogoAlt from 'src/components/svg/LogoAlt';
import { useContext, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { AuthContext, db } from '@utils';

interface YourLockersScreenProps {
  navigation: any;
}

export default function YourLockersScreen({ navigation }: YourLockersScreenProps) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<any[]>([]);

  useFocusEffect(() => {
    const fetchLockers = async () => {
      const userRef = doc(db, 'users', user.uid);
      const lockersRef = collection(userRef, 'lockers');
      const lockersSnapshot = await getDocs(lockersRef);
      const lockers = lockersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(lockers);
    };

    fetchLockers();
  });
  
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <AppBar backButtonDisabled />
      <View style={styles.container}>
        {data.length === 0 ? (
          <>
            <View style={{ flexDirection: 'row', marginBottom: 138 }}>
              <Text style={styles.title}>Your Lockers</Text>
              <Text style={styles.titleNumber}> (0)</Text>
            </View>
            <LogoAlt style={{ alignSelf: 'center', marginBottom: 16 }} />
            <Text style={styles.text}>You Haven't Booked Any Locker Yet!</Text>
            <Button
              title="Book Locker"
              style={{ alignSelf: 'center', marginBottom: 24 }}
              onPress={() => navigation.navigate('Book')} /> 
          </>
        ) : (
          <>
            <View style={{ flexDirection: 'row', marginBottom: 22 }}>
              <Text style={styles.title}>Your Lockers</Text>
              <Text style={styles.titleNumber}> ({data.length})</Text>
            </View>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <YourLockerCard item={item} style={{ marginBottom: 15 }} />
              )}
            />
            <Button 
              title="Book Locker"
              style={{ alignSelf: 'center', marginBottom: 24 }}
              onPress={() => navigation.navigate('Book')} />
          </>
        )}
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
  title: {
    color: Colors.orangeDarker,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  titleNumber: {
    color: Colors.textDark,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
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