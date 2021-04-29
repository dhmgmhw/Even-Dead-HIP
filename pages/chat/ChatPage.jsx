import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Header } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';
import ChatInputComponent from '../../components/chat/ChatInputComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatPage({ navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
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
          <View style={styles.oppositeChatBox}>
            <View style={styles.oppositeUserBox}></View>
            <View style={styles.oppositeTextBox}></View>
          </View>
          <View style={styles.myChatBox}>
            <View style={styles.myTextBox}></View>
          </View>
        </ScrollView>
        <ChatInputComponent />
      </>
    </TouchableWithoutFeedback>
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
  oppositeChatBox: {
    width: diviceWidth,
    height: 80,
    borderWidth: 2,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  myChatBox: {
    width: diviceWidth,
    height: 80,
    borderWidth: 2,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  oppositeUserBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  oppositeTextBox: {
    width: '60%',
    height: 70,
    backgroundColor: 'lightgrey',
  },
  myTextBox: { width: '60%', height: 70, backgroundColor: 'lightgrey' },
});
