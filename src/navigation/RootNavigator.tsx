import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  LogInScreen, 
  SignUpScreen, 
  YourLockersScreen, 
  PinScreen,
  BookScreen,
  PaymentScreen,
  ProfileScreen,
} from '@screens';
import { useContext} from 'react';
import { AuthContext } from '@utils';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user === null ? (
        <Stack.Group>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="YourLockers" component={YourLockersScreen} />
          <Stack.Screen name="Book" component={BookScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Pin" component={PinScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}