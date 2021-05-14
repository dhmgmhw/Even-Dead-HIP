import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
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

import GenreSearchResult from '../../components/search/GenreSearchResult';
import CateSelectComponent from '../../components/search/CateSelectComponent';

import { searchBook } from '../../config/SearchApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function SearchMain({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const [posts, setPosts] = useState([]);

  const download = async () => {};

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
    setPosts(searchResult);
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
        <View style={styles.searchOpenedBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name='close'
              size={24}
              color={searchQuery == '' ? 'white' : '#ADADAD'}
              onPress={() => {
                setSearchQuery('');
              }}
            />
            <TextInput
              style={styles.searchBar}
              placeholder='도서명 검색하기'
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>
          <Ionicons
            name='search-sharp'
            size={24}
            color='#ADADAD'
            onPress={searchBooks}
          />
        </View>

        {searchQuery == '' ? (
          <CateSelectComponent navigation={navigation} />
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {posts.map((post, i) => {
              return (
                <GenreSearchResult
                  key={i}
                  navigation={navigation}
                  post={post}
                />
              );
            })}
          </ScrollView>
        )}
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
    width: diviceWidth / 1.5,
    height: 50,
    borderColor: '#E0E0E0',
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'SansBold',
  },
  searchOpenedBar: {
    marginTop: getStatusBarHeight(),
    height: 50,
    borderBottomWidth: 3,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingHorizontal: 20,
  },
});
