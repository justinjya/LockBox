import { View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from 'src/values';
import IconButton from './IconButton';
import Logo from './svg/Logo';

interface AppBarProps {
  title?: string;
  backButtonDisabled?: boolean;
  profileButtonDisabled?: boolean;
  onBackPress?: () => void;
}

export default function AppBar({ title, backButtonDisabled, profileButtonDisabled, onBackPress }: AppBarProps = { backButtonDisabled: false, profileButtonDisabled: false }) {
  if (title) {
    const [fontsLoaded, fontError] = useFonts({
      'Poppins-Bold': require('@fonts/Poppins-Bold.ttf')
    });
  
    if (!fontsLoaded && !fontError) {
      return null;
    }
  }

  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();

  return (
    <>
      <View style={{ height: insets.top, backgroundColor: Colors.orange }} />
      <View style={styles.container}>
        <LinearGradient colors={[Colors.orange, Colors.red]} style={StyleSheet.absoluteFillObject} />
        <IconButton icon={
          <Ionicons name='arrow-back' size={24} color={backButtonDisabled ? 'transparent' : Colors.white} />
        } onPress={onBackPress? onBackPress : () => navigation.goBack()} disabled={backButtonDisabled} />
        {title ? (
          <Text style={{ color: Colors.white, fontSize: 20, fontFamily: 'Poppins-Bold' }}>{title}</Text>
        ) : (
          <Logo width={61} height={26} />
        )}
        <IconButton icon={
          <FontAwesome name='user-o' size={24} color={profileButtonDisabled ? 'transparent' : Colors.white} />    
        } onPress={() => navigation.navigate('Profile')} disabled={profileButtonDisabled} />
      </View>
    </>
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