import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tab, Tabs } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import MyLibraryTab from '../../components/mypage/MyLibraryTab';
import MyInfoTab from '../../components/mypage/MyInfoTab';

export default function MyPageMain() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Tabs
        tabContainerStyle={{ color: 'white', marginTop: getStatusBarHeight() }}
        locked={true}
        tabBarUnderlineStyle={{
          backgroundColor: '#6864FF',
        }}>
        <Tab
          textStyle={{ fontFamily: 'SCDream5', color: 'black' }}
          activeTextStyle={{
            fontFamily: 'SCDream5',
            color: 'black',
          }}
          heading='서재'
          tabStyle={{ backgroundColor: 'white' }}
          activeTabStyle={{ backgroundColor: 'white' }}>
          <MyLibraryTab />
        </Tab>
        <Tab
          textStyle={{ fontFamily: 'SCDream5', color: 'black' }}
          activeTextStyle={{ fontFamily: 'SCDream5', color: 'black' }}
          heading='나의 정보'
          tabStyle={{ backgroundColor: 'white' }}
          activeTabStyle={{ backgroundColor: 'white' }}>
          <MyInfoTab />
        </Tab>
      </Tabs>
    </View>
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
