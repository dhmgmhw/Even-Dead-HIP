import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tab, Tabs, DefaultTabBar } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import MyLibraryTab from '../../components/mypage/MyLibraryTab';
import MyInfoTab from '../../components/mypage/MyInfoTab';

const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

export default function MyPageMain({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Tabs
        renderTabBar={renderTabBar}
        tabContainerStyle={styles.tabBarContainer}
        locked={true}
        tabBarUnderlineStyle={{
          backgroundColor: '#4CB73B',
        }}>
        <Tab
          textStyle={styles.tabBarFont}
          activeTextStyle={styles.tabBarFont}
          heading='나의 정보'
          tabStyle={styles.whiteBack}
          activeTabStyle={styles.whiteBack}>
          <MyInfoTab navigation={navigation} />
        </Tab>
        <Tab
          textStyle={styles.tabBarFont}
          activeTextStyle={styles.tabBarFont}
          heading='서재'
          tabStyle={styles.whiteBack}
          activeTabStyle={styles.whiteBack}>
          <MyLibraryTab navigation={navigation} />
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
  tabBarContainer: { color: 'white', marginTop: getStatusBarHeight() },
  tabBarFont: { fontFamily: 'SCDream5', color: 'black' },
  whiteBack: { backgroundColor: 'white' },
});
