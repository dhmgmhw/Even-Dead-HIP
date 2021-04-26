import React from 'react';

import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeMain from '../pages/home/HomeMain';
import ServiceMain from '../pages/ourservice/ServiceMain';
import SearchMain from '../pages/search/SearchMain';
import History from '../pages/history/HistoryMain';
import MyPageMain from '../pages/mypage/MyPageMain';

import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === 'HomeMain') {
            iconName += 'home-outline';
          } else if (route.name === 'ServiceMain') {
            iconName += 'library-outline';
          } else if (route.name === 'SearchMain') {
            iconName += 'search-outline';
          } else if (route.name === 'History') {
            iconName += 'reader-outline';
          } else if (route.name === 'MyPageMain') {
            iconName += 'person';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? 'black' : 'lightgrey'}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          height: Platform.OS === 'ios' ? 85 : 60,
          fontSize: 10,
        },
      }}>
      <Tabs.Screen name='HomeMain' component={HomeMain} />
      <Tabs.Screen name='ServiceMain' component={ServiceMain} />
      <Tabs.Screen name='SearchMain' component={SearchMain} />
      <Tabs.Screen name='History' component={History} />
      <Tabs.Screen name='MyPageMain' component={MyPageMain} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
