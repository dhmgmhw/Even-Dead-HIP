import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TextInput,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Ionicons } from '@expo/vector-icons';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function SearchMain() {
  const [searchBar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

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
              onPress={() => {
                setSearchBar(true);
              }}
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
    paddingHorizontal: 15,
  },
  searchUnopenedBar: {
    marginTop: getStatusBarHeight(),
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#818181',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
