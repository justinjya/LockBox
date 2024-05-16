import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { AppBar } from '@components';
import { Colors } from '@values';
import { Button, Alert, SuccessCircle, ErrorCircle } from '@components';
import { SimpleLineIcons } from '@expo/vector-icons';

interface Locker {
  id: number;
  name: string;
  location: string;
  locked: boolean;
}

const locker = { 
  id: 1,
  name: 'ID-19',
  location: 'GKU 3',
  locked: true
} as Locker;

export default function PaymentScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@fonts/Poppins-Bold.ttf'),
    'Segoe UI': require('@fonts/Segoe UI.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <AppBar />
      {/* Initial */}
      {/* <View style={styles.container}>
        <Text style={styles.title}>Payment</Text>
        <View style={styles.detailsSection}>
          <Text style={styles.lockerName}>{locker.name}</Text>
          <View style={styles.locationSection}>
            <SimpleLineIcons name="location-pin" size={17} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
            <Text style={styles.locationText}>{locker.location}</Text>
          </View>
          <View style={styles.qrCodeContainer}>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>QR Code goes here</Text>
          </View>
          <Text style={styles.text}>
            Before finalizing your purchase, always ensure you've verified the location of the locker
          </Text>
          <Button title='Confirm' />
        </View>
      </View> */}

      {/* <Alert /> */}

      {/* Success */}
      {/* <View style={styles.container}>
        <Text style={[styles.title, { color: 'transparent' }]}>Payment</Text>
        <View style={styles.detailsSection}>
          <SuccessCircle style={{ marginBottom: 10 }}/>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: Colors.orangeDarker }}>Hooray!</Text>
          <Text style={{ width: '60%', fontSize: 18, fontFamily: 'Segoe UI', textAlign: 'center', marginBottom: 30 }}>Your locker is successfully booked</Text>
          <Text style={styles.lockerName}>{locker.name}</Text>
          <View style={[styles.locationSection, { marginBottom: 34 }]}>
            <SimpleLineIcons name="location-pin" size={17} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
            <Text style={styles.locationText}>{locker.location}</Text>
          </View>
          <Text style={[styles.text, { width: '50%', marginBottom: 24 }]}>
            Please enter your PIN to unlock the locker
          </Text>
          <Button title='Unlock Locker' style={{ marginBottom: 11 }} />
          <Button title='Home' textStyle={{ color: Colors.orangeDarker }} style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.orangeDarker, paddingHorizontal: 87 }} />
        </View>
      </View> */}

      {/* Failed */}
      {/* <View style={styles.container}>
        <Text style={[styles.title, { color: 'transparent' }]}>Payment</Text>
        <View style={styles.detailsSection}>
          <ErrorCircle style={{ marginBottom: 10 }}/>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: Colors.orangeDarker }}>Uh Oh!</Text>
          <Text style={{ width: '60%', fontSize: 18, fontFamily: 'Segoe UI', textAlign: 'center', marginBottom: 30 }}>something went wrong</Text>
          <Text style={styles.lockerName}>{locker.name}</Text>
          <View style={[styles.locationSection, { marginBottom: 34 }]}>
            <SimpleLineIcons name="location-pin" size={17} color={Colors.orangeDarker} style={{ marginRight: 4 }}/>
            <Text style={styles.locationText}>{locker.location}</Text>
          </View>
          <Text style={[styles.text, { width: '60%', marginBottom: 24 }]}>
            Please make another attempt to book your locker
          </Text>
          <Button title='Try Again' style={{ paddingHorizontal: 76, marginBottom: 11 }} />
          <Button title='Home' textStyle={{ color: Colors.orangeDarker }} style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.orangeDarker, paddingHorizontal: 87 }} />
        </View>
      </View> */}

      <StatusBar style="auto" />
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
  }
});