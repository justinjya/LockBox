import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@values';
import Button from './Button';
import Logo from './svg/Logo';

export default function AppBar() {
  return (
    <LinearGradient colors={[Colors.orange, Colors.red]} style={styles.background}>
      <View style={styles.appBar}>
        <Button style={styles.homeButton}>
          <Logo width={61} height={26} />
        </Button>
        <Button style={styles.userButton}>
          <FontAwesome name="user-o" size={24} color={Colors.white} />    
        </Button>  
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 70,
  },
  appBar: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  homeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  userButton: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});