import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from 'src/values';
import { Button, SuccessCircle, ErrorCircle } from '@components';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { AuthContext, db } from '@utils';
import { collection, doc, getDocs, query, runTransaction, where } from 'firebase/firestore';

interface PaymentScreenProps {
  route: any;
  navigation: any;
}

export default function PaymentConfirmScreen({ route, navigation }: PaymentScreenProps) {
  const { id, name, location, pin ,state } = route.params;
  const { user } = useContext(AuthContext);
  
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
    'Segoe UI': require('@fonts/Segoe UI.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {
    if (state === 'success') {
      const userRef = doc(db, 'users', user.uid);
      const locationsRef = collection(db, 'locations');
      const q = query(locationsRef, where('name', '==', location));

      getDocs(q).then((querySnapshot) => {
        let locationSnapshot: any;
        let lockerSnapshot: any;

        querySnapshot.forEach((locDoc) => {
          const locationRef = locDoc.ref;
          const lockerRef = doc(locationRef, 'lockers', id);
    
          runTransaction(db, async (transaction) => {
            locationSnapshot = await transaction.get(locationRef);
            lockerSnapshot = await transaction.get(lockerRef);

            if (!locationSnapshot.exists() || !lockerSnapshot.exists()) {
              throw 'Document does not exist!';
            }

            // Add locker to user's lockers collection
            const userLockersRef = doc(userRef, 'lockers', id);
            transaction.set(userLockersRef, {
              name,
              location,
              pin,
              locked: true,
              ipAddress: lockerSnapshot.data().ipAddress
            });
    
            // Update locker's booked state
            transaction.set(lockerRef, { booked: true }, { merge: true });
  
            // Decrease availLockers by 1, but not below 0
            const availableLockers = locationSnapshot.data().availableLockers;
            const newAvailableLockers = availableLockers > 0 ? availableLockers - 1 : 0;
            transaction.update(locationRef, { availableLockers: newAvailableLockers });
          }).then(() => {
            const ipAddress = lockerSnapshot.data().ipAddress;
          
            fetch(`http://${ipAddress}/led`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ led: 'unavail' }),
            }).catch((error) => {
              console.error('Network request failed', error);
            });
          }).catch((error) => {
            console.log('Transaction failed: ', error);
          });
        });
      });
    }
  }, [state]);

  const handleUnlockLockerPress = () => {
    navigation.navigate('Pin', {
      id: id,
      name: name,
      location: location,
      state: 'unlock'
    });
  };

  const handleTryAgain = () => {
    navigation.navigate('Book');
  };

  const handleHomePress = () => {
    navigation.dispatch(
      StackActions.popToTop()
    );
  };

  return (
    <>
      <AppBar backButtonDisabled profileButtonDisabled />
      <View style={styles.container}>
        <Text style={[styles.title, { color: 'transparent' }]}>Payment</Text>
        {state === 'success' ? (
          <>
            <View style={styles.detailsSection}>
              <SuccessCircle style={{ marginBottom: 10 }}/>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: Colors.orangeDarker }}>Hooray!</Text>
              <Text style={{ width: '60%', fontSize: 18, fontFamily: 'Segoe UI', textAlign: 'center', marginBottom: 30 }}>Your locker is successfully booked</Text>
              <Text style={styles.lockerName}>{name}</Text>
              <View style={[styles.locationSection, { marginBottom: 34 }]}>
                <SimpleLineIcons name="location-pin" size={17} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
                <Text style={styles.locationText}>{location}</Text>
              </View>
              <Text style={[styles.text, { width: '50%', marginBottom: 24 }]}>
                Please enter your PIN to unlock the locker
              </Text>
              <Button title='Unlock Locker' style={{ marginBottom: 11 }} onPress={handleUnlockLockerPress} />
              <Button
                title='Home'
                textStyle={{ color: Colors.orangeDarker }}
                style={styles.homeButton}
                onPress={handleHomePress} />
            </View>
          </>
        ) : null}

        {state === 'failed' ? (
          <>
            <View style={styles.detailsSection}>
              <ErrorCircle style={{ marginBottom: 10 }}/>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: Colors.orangeDarker }}>Uh Oh!</Text>
              <Text style={{ width: '60%', fontSize: 18, fontFamily: 'Segoe UI', textAlign: 'center', marginBottom: 30 }}>something went wrong</Text>
              <Text style={styles.lockerName}>{name}</Text>
              <View style={[styles.locationSection, { marginBottom: 34 }]}>
                <SimpleLineIcons name="location-pin" size={17} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
                <Text style={styles.locationText}>{location}</Text>
              </View>
              <Text style={[styles.text, { width: '60%', marginBottom: 24 }]}>
                Please make another attempt to book your locker
              </Text>
              <Button title='Try Again' style={{ paddingHorizontal: 76, marginBottom: 11 }} onPress={handleTryAgain} />
              <Button
                title='Home'
                textStyle={{ color: Colors.orangeDarker }}
                style={styles.homeButton}
                onPress={handleHomePress} />
            </View>
          </>
        ) : null}
      </View>
      <StatusBar style="auto" />
    </>
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
    marginBottom: 26,
  },
  detailsSection: {
    width: '100%',
    height: 529,
    borderRadius: 5,
    borderColor: Colors.grayDarker,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lockerName: {
    color: Colors.orangeDarker,
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 39,
  },
  locationText: {
    color: Colors.textDark,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    color: Colors.textDark,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 31,
  },
  homeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.orangeDarker,
    paddingHorizontal: 87
  }
});