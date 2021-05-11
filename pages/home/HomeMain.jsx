import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { mocklist } from '../../mock.json';
import OurTownComponent from '../../components/home/OurTownComponent';
import GenreComponent from '../../components/home/GenreComponent';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getPostedBook, testGetPost } from '../../config/MainPageApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function HomeMain({ navigation }) {
  const [posts, setPosts] = useState([]);

  const download = async () => {
    const result = await getPostedBook();
    setPosts(result);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      download();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    download();
  }, []);

  return (
    <>
      <Header
        containerStyle={{
          paddingHorizontal: 20,
          borderBottomWidth: 0,
          backgroundColor: 'white',
        }}
        leftComponent={
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SCDream5',
                top: 3,
                color: '#398E3D',
              }}>
              송파구
            </Text>
            <Ionicons
              name={'chevron-down'}
              size={25}
              style={{ paddingHorizontal: 5, color: '#398E3D', bottom: 4 }}
            />
          </View>
        }
        centerComponent={''}
        rightComponent={
          <Ionicons
            name={'notifications-outline'}
            size={25}
            style={{ color: '#398E3D' }}
          />
        }
      />
      <ScrollView
        style={{ backgroundColor: 'white' }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainTitleBox}>
          <View>
            <Text style={styles.mainTitleDesc}>좋은 책을 좋은 이웃과 함께</Text>
            <Text style={styles.mainTitleText}>우리 동네 책장</Text>
            <View style={{ height: 20, backgroundColor: '#31B11C' }}></View>
            <View>
              <Text style={styles.mainTitleDesc2}>
                지역에서 관심있는 책을 교환하며
              </Text>
              <Text style={styles.mainTitleDesc2}>
                내 안의 가치를 같이 키워보세요
              </Text>
            </View>
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
        <View>
          <View style={styles.subTitleBox}>
            <Text style={{ fontSize: 16, fontFamily: 'SansRegular' }}>
              새로 등록된 도서
            </Text>
            <Ionicons
              name={'add-outline'}
              size={25}
              onPress={() => {
                navigation.navigate('OurTownPage');
              }}
              style={{ color: 'black', bottom: 2 }}
            />
          </View>
          {posts ? (
            <>
              {posts.map((post, i) => {
                return (
                  <Pressable
                    onPress={() => {
                      console.log(post);
                    }}
                    key={i}>
                    <GenreComponent navigation={navigation} post={post} />
                  </Pressable>
                );
              })}
            </>
          ) : null}

          {/* {data.length == 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={posts}
          onEndReachedThreshold={0}
          onEndReached={async () => {
            console.log('바닥 가까이 감: 리프레시');
          }}
          renderItem={(data) => {
            // console.log(data);
            return (
              <GenreComponent navigation={navigation} post={post} />
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item.date.toString()}
        />
      )} */}
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
  },
  subTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 20,
    marginTop: 20,
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
});
