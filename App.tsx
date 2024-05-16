import { StyleSheet, SafeAreaView } from 'react-native';
import { 
  LogInScreen, 
  SignUpScreen, 
  YourLockersScreen, 
  PinScreen,
  BookScreen,
  PaymentScreen
} from '@screens';
import { AppBar } from '@components';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <AppBar /> */}
      {/* <LogInScreen /> */}
      {/* <SignUpScreen /> */}
      {/* <YourLockersScreen /> */}
      {/* <BookScreen /> */}
      {/* <PaymentScreen /> */}
      {/* <PinScreen title='ID-19' subtitle='Create Pin' /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
