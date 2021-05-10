import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Ionicons } from '@expo/vector-icons';
import { mocklist } from '../../mock.json';

import GenreComponent from '../../components/home/GenreComponent';

import { getPostedBook, testGetPost } from '../../config/MainPageApi';
import { searchBook } from '../../config/SearchApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function SearchMain({ navigation }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [posts, setPosts] = useState([]);

  const download = async () => {
    const result = await getPostedBook();
    setPosts(result);
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  const searchBooks = async () => {
    if (searchQuery == '') {
      Alert.alert('검색어를 입력해주세요!');
      return;
    }
    const searchResult = await searchBook(searchQuery);
    if (searchResult == '') {
      Alert.alert('검색결과가 없습니다:(');
      return;
    }
    setSearchQuery('');
    setPosts(searchResult);
    setSearchBar(true);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      download();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <TouchableWithoutFeedback
      style={{ backgroundColor: 'white' }}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        {searchBar ? (
          <View style={styles.searchOpenedBar}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name='chevron-back'
                size={24}
                color='black'
                onPress={() => {
                  setSearchBar(false);
                }}
              />
              <TextInput
                style={styles.searchBar}
                placeholder='책 검색'
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </View>
            <Ionicons
              name='search-sharp'
              size={24}
              color='black'
              onPress={searchBooks}
            />
          </View>
        ) : (
          <View style={styles.searchUnopenedBar}>
            <Text
              style={{ fontFamily: 'SCDream5', fontSize: 17, marginLeft: 10 }}>
              책 검색
            </Text>
            <Ionicons
              name='search-sharp'
              size={24}
              color='black'
              onPress={() => {
                setSearchBar(true);
              }}
            />
          </View>
        )}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* {posts.map((post, i) => {
            return (
              <GenreComponent key={i} navigation={navigation} post={post} />
            );
          })} */}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: diviceHeight,
  },
  searchBar: {
    height: 50,
    shadowOpacity: 0,
    borderColor: '#818181',
    marginLeft: 20,
    fontSize: 17,
    fontFamily: 'SCDream5',
  },
  searchOpenedBar: {
    marginTop: getStatusBarHeight(),
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#818181',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  searchUnopenedBar: {
    marginTop: getStatusBarHeight(),
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#818181',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
});
