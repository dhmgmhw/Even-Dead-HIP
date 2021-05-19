import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  Keyboard,
  Pressable,
  Platform,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

let sock = new SockJS('http://3.34.178.136/ws-stomp');
let ws = Stomp.over(sock);

export default function ChatInputComponent({ roomId, myInfo }) {
  const [text, setText] = useState('');

  const onSend = async () => {
    const token = await AsyncStorage.getItem('session');
    ws.send(
      '/pub/api/chat/message',
      {
        token: token,
      },
      JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        message: text,
        userName: myInfo.username,
        userProfile: myInfo.image,
      })
    );
    Keyboard.dismiss();
    setText('');
  };

  return (
    <View style={styles.messageBar}>
      <View style={styles.messageBox}>
        <View
          style={{
            width: '85%',
          }}>
          <TextInput
            style={{
              paddingLeft: 20,
              backgroundColor: 'white',
              margin: 7,
              height: 30,
              borderRadius: 15,
              width: '100%',
            }}
            onChangeText={setText}
            value={text}
            placeholder='메시지를 입력하세요'
          />
        </View>
        <Pressable onPress={text == '' ? null : onSend}>
          <Text
            style={{
              padding: 5,
              fontFamily: 'SansBold',
              color: text == '' ? 'lightgrey' : 'green',
            }}>
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageBar: {
    width: diviceWidth,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  messageBox: {
    width: diviceWidth,
    paddingHorizontal: 10,
    backgroundColor: '#EEF5ED',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 13 : 0,
  },
});
