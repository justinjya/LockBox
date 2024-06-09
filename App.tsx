import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@utils';
import { RootNavigator } from '@navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer documentTitle={{ enabled: false }}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent('App', () => App);
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  if (!rootTag?.hasChildNodes()) {
    AppRegistry.runApplication('App', { rootTag });
  };
};