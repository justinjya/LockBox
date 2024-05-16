import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@values';
import Button from './Button';

export default function Alert() {
  return (
    <View style={styles.container}>
      <Ionicons name="close-sharp" size={25} color={Colors.white} style={styles.closeIcon} />
      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>Alert!</Text>
        <Text style={styles.alertMessage}>Canceling the payment will automatically cancel your locker booking. Continue?</Text>
        <View style={styles.buttonContainer}>
          <Button title='Yes' style={styles.yesButton} />
          <Button title='No' textStyle={{ color: Colors.orangeDarker }} style={styles.noButton} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 264,
    backgroundColor: Colors.orangeDarker,
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 12,
    borderStartStartRadius: 14,
    borderStartEndRadius: 14
  },
  closeIcon: {
    alignSelf: 'flex-end'
  },
  alertContent: {
    alignItems: 'center'
  },
  alertTitle: {
    fontSize: 24,
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    marginBottom: 23
  },
  alertMessage: {
    width: '60%',
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Segoe UI',
    textAlign: 'center',
    marginBottom: 41
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  yesButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 14,
    marginRight: 22
  },
  noButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 14
  }
});