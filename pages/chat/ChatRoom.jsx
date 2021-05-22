import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../../components/chat/ChatHeader';
import SockJS from 'sockjs-client';
import SockJsClient from 'react-stomp';
import { sockConnect } from '../../config/SocketApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

let sock = new SockJS('http://13.124.182.223/ws-stomp');
let ws = Stomp.over(sock);

const chats = [
  {
    _id: 1,
    text: '자니?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: '아이유',
      avatar:
        'https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/01/57f00c7a-6fb6-49b1-905f-2438e4f7897a.jpg',
    },
  },
];

export default function ChatRoom({ navigation, route }) {
  const myInfo = route.params[0];
  const roomInfo = route.params[1];

  const [messages, setMessages] = useState(chats);

  const connecetToSub = async () => {
    await sockConnect();
    await connectServer();
    await enterChat(roomInfo.roomId);
  };

  const connectServer = async () => {
    const token = await AsyncStorage.getItem('session');
    ws.connect(
      {
        token: token,
      },
      (frame) => {
        // console.log(frame);
        ws.subscribe(`/sub/chat/room/${roomInfo.roomId}`, (res) => {
          const newChat = JSON.parse(res.body);
          // console.log(JSON.parse(res.body));
          let newChats = [...messages, ...newChat];
          console.log(newChats);
          // setMessages(newChats);
        });
      }
    );
  };

  const enterChat = async (arg) => {
    const token = AsyncStorage.getItem('session');
    try {
      const response = await axios({
        method: 'get',
        url: 'http://13.124.182.223/api/chat/enter/' + arg,
        headers: {
          token: token,
        },
      });
      // console.log(response.data.results);
      setMessages(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connecetToSub(roomInfo.roomId);
  }, []);

  const onSend = async (messages) => {
    const token = await AsyncStorage.getItem('session');
    ws.send(
      '/pub/api/chat/message',
      {
        token: token,
      },
      JSON.stringify(messages[0])
    );
    Keyboard.dismiss();
  };

  return (
    <>
      <ChatHeader navigation={navigation} roomInfo={roomInfo} myInfo={myInfo} />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <GiftedChat
          placeholder={'메시지를 입력해 주세요.'}
          renderAvatarOnTop={true}
          textInputStyle={styles.input}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: myInfo.id,
            name: myInfo.username,
            avatar: myInfo.image,
            roomId: roomInfo.roomId,
            type: 'TALK',
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 15,
    marginHorizontal: 10,
    paddingLeft: 20,
    paddingTop: 7,
  },
});
