import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
// import SignInPage from '../pages/login/SignInPage';
// import SignUpPage from '../pages/login/SignUnPage';
import PostDetailPage from '../pages/search/PostDetailPage';
import ChatPage from '../pages/chat/ChatPage';

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
      <Stack.Screen name='PostDetailPage' component={PostDetailPage} />
      <Stack.Screen name='ChatPage' component={ChatPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
