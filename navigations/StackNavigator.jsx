import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
// import SignInPage from '../pages/login/SignInPage';
// import SignUpPage from '../pages/login/SignUnPage';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      {/* <Stack.Screen name='SignInPage' component={SignInPage} />
      <Stack.Screen name='SignUpPage' component={SignUpPage} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
