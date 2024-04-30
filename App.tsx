import { StyleSheet, SafeAreaView } from 'react-native';
import { LogInScreen, SignUpScreen, YourLockers } from '@screens';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <LogInScreen /> */}
      {/* <SignUpScreen /> */}
      <YourLockers />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
