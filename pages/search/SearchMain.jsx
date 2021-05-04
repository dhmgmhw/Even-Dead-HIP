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
} from 'react-native';
import { Searchbar } from 'react-native-paper';
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
          <Searchbar
            style={styles.searchBar}
            placeholder='책 검색'
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={() => {
              console.log('pressed');
            }}
          />
        ) : (
          <View style={styles.searchUnopenedBar}>
            <Text style={{ fontFamily: 'SCDream5', fontSize: 18 }}>
              책 검색
            </Text>
            <Ionicons
              name='search-sharp'
              size={22}
              color='grey'
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
    marginTop: getStatusBarHeight(),
    height: 50,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderColor: '#818181',
  },
  searchUnopenedBar: {
    marginTop: getStatusBarHeight(),
    height: 50,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderColor: '#818181',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
