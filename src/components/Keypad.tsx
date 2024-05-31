import { Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Colors } from 'src/values';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -1];

interface KeypadProps {
  value: string;
  setValue: (value: string) => void;
  style? : object;
}

export default function Keypad({ value, setValue, style }: KeypadProps) {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePress = (item: number) => {
    if (item === -1) {
      setValue(value.slice(0, -1));
    } else {
      setValue(value + item.toString());
    }
  };

  return (
    <>
      <View style={[styles.container, style]}>
        {numbers.map((item, index) => (
          item === -1 ? (
            <TouchableOpacity 
              key={index}
              style={[styles.circle, { backgroundColor: 'transparent' }]}
              onPress={() => handlePress(item)}
            >
              <Ionicons
                name={'backspace-outline'}
                size={32}
                color={Colors.textLight} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              key={index}
              style={styles.circle}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.number}>{item}</Text>
            </TouchableOpacity>
          )
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '76%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  circle: {
    backgroundColor: Colors.anotherOrange,
    width: 63,
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 12,
  },
  number: {
    color: Colors.textLight,
    fontSize: 32,
    fontFamily: 'Poppins-Regular'
  }
});