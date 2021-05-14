import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import { Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import GenreComponent from '../../components/home/GenreComponent';
import MainUserBox from '../../components/home/MainUserBox';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getPostedBook } from '../../config/MainPageApi';
import { getUserProfile } from '../../config/BackData';
import { Pressable } from 'react-native';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function HomeMain({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerPosts, setBannerPosts] = useState([]);

  const [posts, setPosts] = useState([]);
  const [scrapList, setScrapList] = useState([]);

  const [myTown, setMyTown] = useState();
  const [myEmail, setMyEmail] = useState();
  const [myName, setMyName] = useState();
  const [myImg, setMyImg] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('새로고침');
    wait(1000).then(() => {
      download();
      userCheck();
      setRefreshing(false);
    });
  }, []);

  const userCheck = async () => {
    const myInfo = await getUserProfile();
    setMyTown(myInfo.results.town);
    setScrapList(myInfo.results.scrapList);
    setMyEmail(myInfo.results.email);
    setMyName(myInfo.results.username);
    setMyImg(myInfo.results.image);
  };

  const download = async () => {
    const result = await getPostedBook(currentPage);
    const banner = await getPostedBook(1);
    setPosts(result);
    setBannerPosts(banner);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      download();
      userCheck();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.statusAvoid}></View>
      <View style={styles.mainHeader}>
        <View style={styles.headerLComp}>
          <Image
            style={{ height: 25, width: 40 }}
            resizeMode='contain'
            source={require('../../assets/mainlogo.png')}
          />
        </View>
        <View style={styles.headerCComp}></View>
        <View style={styles.headerRComp}></View>
      </View>
      <ScrollView
        style={{ backgroundColor: 'white' }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <MainUserBox myName={myName} myImg={myImg} />
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            zIndex: 99,
          }}>
          <View style={styles.mainTitleBox}>
            <View>
              <Text style={styles.mainTitleDesc}>
                좋은 책을 좋은 이웃과 함께
              </Text>
              <Text style={styles.mainTitleText}>우리 동네 책장</Text>
              <View
                style={{
                  height: 20,
                  backgroundColor: '#31B11C',
                  position: 'relative',
                  bottom: 20,
                  zIndex: 2,
                }}></View>
              <View>
                <Text style={styles.mainTitleDesc2}>
                  지역에서 관심있는 책을 교환하며
                </Text>
                <Text style={styles.mainTitleDesc2}>
                  내 안의 가치를 같이 키워보세요
                </Text>
              </View>
              <Pressable
                style={styles.townChangeBtn}
                onPress={() => {
                  navigation.navigate('TownChangePage');
                }}>
                <Text style={styles.myTownText}>{myTown}</Text>
                <Ionicons
                  name={'chevron-down'}
                  size={25}
                  style={{ color: 'white' }}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.mainTitleDescBox}>
            <Text style={styles.mainTitleDesc3}>다양한 분야의 책도 만나고</Text>
            <Text style={styles.mainTitleDesc3}>동네 이웃도 만나고</Text>
            <Text style={styles.mainTitleDesc4}>같이하는 가치나눔</Text>
            <Ionicons
              name={'chevron-down'}
              size={25}
              style={{ color: 'white', top: 15 }}
            />
            <Ionicons
              name={'chevron-down'}
              size={25}
              style={{ color: 'lightgrey' }}
            />
            <Ionicons
              name={'chevron-down'}
              size={25}
              style={{ color: 'grey', bottom: 15 }}
            />
          </View>
        </View>
        <View>
          <View style={styles.subTitleBox}>
            <Text style={{ fontSize: 16, fontFamily: 'SansRegular' }}>
              우리동네 새로 등록된 도서
            </Text>
          </View>
          {posts ? (
            <View>
              <FlatList
                data={posts}
                renderItem={(post) => {
                  return (
                    <GenreComponent
                      key={post.id}
                      navigation={navigation}
                      post={post.item}
                      scrapList={scrapList}
                      userCheck={userCheck}
                      myEmail={myEmail}
                    />
                  );
                }}
                keyExtractor={(item) => String(item.id)}
                onEndReachedThreshold={0.1}
                onEndReached={async () => {
                  let nextPosts = await getPostedBook(currentPage + 1);
                  // if (nextPosts.length != 0) {
                  if (nextPosts != undefined) {
                    setCurrentPage(currentPage + 1);
                    let allPosts = [...posts, ...nextPosts];
                    setPosts(allPosts);
                  } else {
                    console.log('불러올 정보가 없어요');
                  }
                }}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
      <Button
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddPage')}>
        <Ionicons name={'add'} size={30} style={{ color: 'white' }} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  mainTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    top: 1,
    backgroundColor: '#64BB35',
    paddingTop: getStatusBarHeight(),
  },
  mainTitleDescBox: {
    backgroundColor: '#64BB35',
    paddingTop: 10,
    alignItems: 'center',
  },
  mainTitleDesc: {
    fontFamily: 'SCDream7',
    fontSize: 12,
    color: 'white',
    lineHeight: 20,
    marginBottom: 10,
  },
  mainTitleDesc2: {
    fontFamily: 'SCDream5',
    fontSize: 13,
    color: 'white',
    lineHeight: 20,
  },
  mainTitleDesc3: {
    fontFamily: 'SCDream5',
    fontSize: 13,
    color: 'white',
    lineHeight: 20,
  },
  mainTitleDesc4: {
    fontFamily: 'SCDream7',
    fontSize: 22,
    color: 'white',
    marginTop: 20,
  },
  mainTitleText: {
    fontSize: 28,
    fontFamily: 'SCDream7',
    marginBottom: 5,
    color: '#FFF4BE',
    zIndex: 3,
    left: 5,
  },
  subTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  townChangeBtn: {
    width: 100,
    height: 30,
    backgroundColor: '#31B11C',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  myTownText: {
    fontFamily: 'SCDream5',
    fontSize: 14,
    color: 'white',
  },
  newBooksScroll: {
    height: 140,
    marginBottom: 20,
  },
  subTitleBtn: {
    width: 35,
    height: 30,
  },
  borderBox: {
    height: 5,
    marginHorizontal: 20,
    backgroundColor: '#F3F3F3',
  },
  addBtn: {
    backgroundColor: '#398E3D',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '3%',
    right: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  loader: {
    marginTop: 10,
    alignSelf: 'center',
  },
  statusAvoid: {
    height: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  mainHeader: {
    width: diviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 45,
  },
  headerLComp: {
    height: 45,
    width: diviceWidth / 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerCComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
  },
  headerRComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});
