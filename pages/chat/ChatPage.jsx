import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { Header } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatPage({ navigation }) {
  return (
    <>
      <Header
        placement='left'
        containerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          borderBottomWidth: 1,
        }}
        leftComponent={
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name={'chevron-back'}
            size={27}
            color={'black'}
          />
        }
        centerComponent={''}
        rightComponent={
          <Ionicons
            name={'search'}
            size={27}
            style={{ marginHorizontal: 10 }}
          />
        }
      />
      <View style={styles.chatInfoBox}>
        <View style={styles.bookBox}></View>
        <View style={styles.userBox}></View>
        <View style={styles.descBox}></View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.chatBox}>
          <View style={styles.userBox}></View>
          <View style={styles.descBox}></View>
          <View style={styles.bookBox}></View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white' },
  chatInfoBox: {
    width: diviceWidth,
    height: 80,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBox: {
    width: diviceWidth,
    height: 80,
    borderWidth: 2,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  descBox: {
    width: '60%',
    height: 70,
    backgroundColor: 'lightgrey',
  },
  bookBox: {
    width: 60,
    height: 70,
    backgroundColor: 'grey',
  },
});
