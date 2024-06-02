import { View, Text, StyleSheet, Alert as NativeAlert, Animated, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from 'src/values';
import { Button, Alert } from '@components';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@utils';

interface PaymentScreenProps {
  route: any;
  navigation: any;
}

export default function PaymentScreen({ route, navigation }: PaymentScreenProps) {
  const { id, location } = route.params;
  const [selectedLocker, setSelectedLocker] = useState<any>(null);
  const [backPressed, setBackPressed] = useState(false);
  const alertPosition = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchLockers = async () => {
      try {
        const lockersRef = collection(doc(db, 'locations', id), 'lockers');
        const lockersSnapshot = await getDocs(lockersRef);
        const lockers = lockersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        if (lockers.length > 0) {
          const randomIndex = Math.floor(Math.random() * lockers.length);
          setSelectedLocker(lockers[randomIndex]);
        }
      } catch {
        NativeAlert.alert('Error', 'An error occurred while fetching lockers');
      }
    };

    fetchLockers();
  }, [id]);

  useEffect(() => {
    if (backPressed) {
      Animated.parallel([
        Animated.timing(alertPosition, {
          toValue: 0,
          duration: 350,
          useNativeDriver: false,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(alertPosition, {
          toValue: Dimensions.get('window').height,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [backPressed]);

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
    'Segoe UI': require('@fonts/Segoe UI.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleBackPress = () => {
    setBackPressed(true);
  }

  const handleConfirmPress = () => {
    navigation.pop();
    navigation.navigate('Pin', { id: selectedLocker.id, name: selectedLocker.name, location: location, state: 'create' })
  }

  const onAlertYesPress= () => {
    navigation.goBack();
  }

  const onAlertNoPress = () => {
    setBackPressed(false);
  }

  return (
    <>
      <AppBar profileButtonDisabled onBackPress={handleBackPress} />
      {selectedLocker === null ? (
        <View style={styles.container}>
          <Text style={styles.title}>Payment</Text>
          <View style={styles.detailsSection} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Payment</Text>
          <View style={styles.detailsSection}>
            <Text style={styles.lockerName}>{selectedLocker.name}</Text>
            <View style={styles.locationSection}>
              <SimpleLineIcons name="location-pin" size={17} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
              <Text style={styles.locationText}>{location}</Text>
            </View>
            <View style={styles.qrCodeContainer}>
              <Text style={{ fontFamily: 'Poppins-Regular' }}>QR Code goes here</Text>
            </View>
            <Text style={styles.text}>
              Before finalizing your purchase, always ensure you've verified the location of the locker
            </Text>
            <Button title='Confirm' onPress={handleConfirmPress} />
          </View>
        </View>
      )}

      {backPressed ? (
        <>
          <Animated.View style={{ ...styles.backdrop, opacity: backdropOpacity }} />
          <Animated.View style={{ transform: [{ translateY: alertPosition }] }}>
            <Alert onYesPress={onAlertYesPress} onNoPress={onAlertNoPress} /> 
          </Animated.View>
        </>
      ) : null}
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  qrCodeContainer: {
    width: 203,
    height: 203,
    borderRadius: 10,
    borderColor: Colors.grayDarker,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
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
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5
  }
});