import React from 'react';

import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeMain from '../pages/home/HomeMain';
import SearchMain from '../pages/search/SearchMain';
import ChatMain from '../pages/chat/ChatMain';
import MyPageMain from '../pages/mypage/MyPageMain';

import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === '홈') {
            iconName += 'home';
          } else if (route.name === '검색') {
            iconName += 'search-outline';
          } else if (route.name === '채팅') {
            iconName += 'chatbubble-outline';
          } else if (route.name === 'MY') {
            iconName += 'person-outline';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? '#438732' : 'lightgrey'}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#438732',
        inactiveTintColor: 'lightgrey',
        style: {
          backgroundColor: '#fff',
          height: Platform.OS === 'ios' ? 85 : 60,
          fontSize: 11,
          borderTopWidth: 1,
          borderColor: 'black',
        },
      }}>
      <Tabs.Screen name='홈' component={HomeMain} />
      <Tabs.Screen name='검색' component={SearchMain} />
      <Tabs.Screen
        name='채팅'
        options={{
          tabBarBadge: 1,
          tabBarBadgeStyle: {
            backgroundColor: '#64BB35',
            color: 'white',
            fontSize: 11,
          },
        }}
        component={ChatMain}
      />
      <Tabs.Screen name='MY' component={MyPageMain} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
