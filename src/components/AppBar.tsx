import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '@values';
import Logo from './svg/Logo';

export default function AppBar() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.orange, Colors.red]} style={StyleSheet.absoluteFillObject} />
      <Ionicons name='arrow-back' size={24} color={Colors.white} />    
      <Logo width={61} height={26} />
      <FontAwesome name='user-o' size={24} color={Colors.white} />    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: Colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});