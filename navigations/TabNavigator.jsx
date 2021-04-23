import React from 'react';

import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeMain from '../pages/home/HomeMain';
import MapMain from '../pages/map/MapMain';
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
            iconName += 'location-outline';
          } else if (route.name === 'MapMain') {
            iconName += 'map-outline';
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
      <Tabs.Screen name='MapMain' component={MapMain} />
      <Tabs.Screen name='MyPageMain' component={MyPageMain} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
