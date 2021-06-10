import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatRoomComponent({ navigation, profile, chatRoom }) {
  const [chatUser, setChatUser] = useState('');
  const [userImg, setUserImg] = useState('');

  const compLoader = async () => {
    if (profile.email == chatRoom.user[1].email) {
      setChatUser(chatRoom.user[0].username);
      setUserImg(chatRoom.user[0].image);
    } else {
      setChatUser(chatRoom.user[1].username);
      setUserImg(chatRoom.user[1].image);
    }
  };
  // chatRoom.user[0]  -- [1]

  useEffect(() => {
    compLoader();
  }, []);

  return (
    <Pressable
      onPress={() => {
        navigation.push('ChatPage', [profile, chatRoom]);
      }}
      style={styles.chatBox}>
      <View style={styles.userBox}>
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 100,
            marginRight: 15,
          }}
          resizeMode='cover'
          source={{
            uri: userImg,
          }}
        />
      </View>
      <View style={styles.descBox}>
        <Text numberOfLines={2} style={styles.userName}>
          {chatRoom.roomName}
        </Text>
        <Text style={styles.chat}>{chatUser}</Text>
      </View>
      <Image
        style={styles.bookBox}
        resizeMode='cover'
        PlaceholderContent={<ActivityIndicator />}
        source={
          chatRoom.image
            ? {
                uri: chatRoom.image,
              }
            : require('../../assets/splash.png')
        }
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chatBox: {
    marginHorizontal: 20,
    borderBottomWidth: 4,
    borderColor: '#f3f3f3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  userBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  descBox: {
    width: '60%',
    justifyContent: 'center',
  },
  bookBox: {
    width: 50,
    height: 70,
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  userName: {
    maxWidth: '90%',
    fontFamily: 'SansExtra',
    fontSize: 14,
    marginBottom: 10,
    includeFontPadding: false,
  },
  chat: {
    fontFamily: 'SansMedium',
    fontSize: 14,
    includeFontPadding: false,
  },
});
