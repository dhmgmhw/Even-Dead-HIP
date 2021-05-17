import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Ionicons } from '@expo/vector-icons';
import ChatInputComponent from '../../components/chat/ChatInputComponent';
import MyChatComponent from '../../components/chat/MyChatComponent';
import OpponentChatComponent from '../../components/chat/OpponentChatComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatPage({ navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={styles.statusAvoid}></View>
        <View style={styles.mainHeader}>
          <View style={styles.headerLComp}>
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name={'chevron-back'}
              size={27}
              color={'black'}
            />
          </View>
          <View style={styles.headerCComp}>
            <Text style={styles.headerCText}>아이유</Text>
          </View>
          <View style={styles.headerRComp}></View>
        </View>
        <Pressable
          onPress={() => {
            console.log('에헤이');
          }}
          style={styles.chatInfoBox}>
          <Image
            style={styles.bookBox}
            resizeMode='cover'
            PlaceholderContent={<ActivityIndicator />}
            source={{
              uri: 'http://image.newsis.com/2021/01/15/NISI20210115_0000674160_web.jpg',
            }}
          />
          <View style={styles.descBox}>
            <Text numberOfLines={3} style={styles.descText}>
              아이유 싱글앨범 "Celebrity"
            </Text>
          </View>
        </Pressable>
        <View style={styles.chatContainer}>
          <OpponentChatComponent />
          <OpponentChatComponent />
          <MyChatComponent />
        </View>
        <ChatInputComponent />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  chatContainer: { backgroundColor: 'white' },
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
  headerCText: {
    fontFamily: 'SansBold',
    fontSize: 18,
    textAlign: 'center',
  },
  chatInfoBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF5ED',
  },
  descBox: {
    marginLeft: 20,
    maxWidth: '80%',
  },
  descText: {
    fontFamily: 'SansMedium',
    fontSize: 15,
  },
  bookBox: {
    width: 60,
    height: 70,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
});
