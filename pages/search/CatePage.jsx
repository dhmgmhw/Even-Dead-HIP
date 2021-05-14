import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { searchByCate } from '../../config/SearchApi';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import GenreSearchComponent from '../../components/search/GenreSearchResult';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CatePage({ navigation, route }) {
  const cate = route.params;

  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState();

  useEffect(() => {
    download();
  }, []);

  const download = async () => {
    const result = await searchByCate(cate);
    if (result.ok == false) {
      Alert.alert('아직 등록된 책이 없어요 :(');
      setTimeout(() => {
        navigation.pop();
      }, 1000);
    } else {
      //   console.log(result.results);
      setPosts(result.results);
      setLoader(false);
    }
  };

  return loader ? (
    <ActivityIndicator
      style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
      size='large'
      color='grey'
    />
  ) : (
    <>
      <View style={styles.statusAvoid}></View>
      <View style={styles.mainHeader}>
        <View style={styles.headerLComp}>
          <View style={styles.headerLeftBox}>
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name={'chevron-back'}
              size={27}
            />
            <Text style={styles.headerLeftText}>{cate}</Text>
          </View>
        </View>
        <View style={styles.headerCComp}></View>
        <View style={styles.headerRComp}></View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {posts ? (
          <>
            {posts.map((post, i) => {
              return (
                <Pressable
                  onPress={() => {
                    console.log(post);
                  }}
                  key={i}>
                  <GenreSearchComponent navigation={navigation} post={post} />
                </Pressable>
              );
            })}
          </>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 25,
  },
  headerLeftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  headerLeftText: {
    fontSize: 18,
    fontFamily: 'SansBold',
    marginLeft: 10,
    color: '#4CB73B',
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
