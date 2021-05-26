import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import MyBookComponent from './MyBookComponent';
import { getMyPost } from '../../config/MyPageApi';
import { Tab, Tabs, DefaultTabBar } from 'native-base';
import MyScrap from './MyScrap';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

export default function MyLibraryTab({ navigation }) {
  const [myPosts, setMyPosts] = useState();
  const [loading, setLoading] = useState(true);

  const download = async () => {
    const response = await getMyPost();
    if (response.length != null) {
      setMyPosts(response.reverse());
      setLoading(false);
    } else {
      console.log('No Posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    download();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      download();
    });
    return unsubscribe;
  }, [navigation]);

  return loading ? (
    <ActivityIndicator
      style={{
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
      }}
      size='large'
      color='grey'
    />
  ) : (
    <ScrollView bounces={false} style={styles.container}>
      <Tabs
        renderTabBar={renderTabBar}
        tabBarUnderlineStyle={{
          width: 0,
        }}>
        <Tab
          heading='내 서재'
          textStyle={styles.tabBarFont}
          activeTextStyle={{ color: '#43a634' }}
          tabStyle={styles.whiteBack}
          activeTabStyle={styles.whiteBack}
          tabContainerStyle={styles.tabBarContainer}>
          {myPosts ? (
            <>
              {myPosts.map((post, i) => {
                return (
                  <MyBookComponent
                    navigation={navigation}
                    key={i}
                    post={post}
                  />
                );
              })}
            </>
          ) : null}
        </Tab>
        <Tab
          heading='교환완료'
          textStyle={styles.tabBarFont}
          tabStyle={styles.whiteBack}
          activeTabStyle={styles.whiteBack}
          activeTextStyle={{ color: '#43a634' }}
          tabContainerStyle={styles.tabBarContainer}>
          {myPosts ? (
            <>
              {myPosts.map((post, i) => {
                console.log(post.finish);
                return post.finish == 1 ? (
                  <MyBookComponent
                    navigation={navigation}
                    key={i}
                    post={post}
                  />
                ) : null;
              })}
            </>
          ) : null}
        </Tab>
        <Tab
          heading='스크랩'
          textStyle={styles.tabBarFont}
          tabStyle={styles.whiteBack}
          activeTabStyle={styles.whiteBack}
          activeTextStyle={{ color: '#43a634' }}
          tabContainerStyle={styles.tabBarContainer}>
          <MyScrap navigation={navigation} />
        </Tab>
      </Tabs>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  tabBarFont: {
    fontFamily: 'SansMedium',
    fontSize: 14,
    color: 'grey',
  },
  whiteBack: { backgroundColor: '#EEF5ED' },
});
