import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigations/StackNavigator';

export default function App() {
  const [loaded] = useFonts({
    SCDream1: require('./assets/fonts/SCDream1.otf'),
    SCDream2: require('./assets/fonts/SCDream2.otf'),
    SCDream3: require('./assets/fonts/SCDream3.otf'),
    SCDream4: require('./assets/fonts/SCDream4.otf'),
    SCDream5: require('./assets/fonts/SCDream5.otf'),
    SCDream6: require('./assets/fonts/SCDream6.otf'),
    SCDream7: require('./assets/fonts/SCDream7.otf'),
    SCDream8: require('./assets/fonts/SCDream8.otf'),
    SCDream9: require('./assets/fonts/SCDream9.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style='black' />
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
