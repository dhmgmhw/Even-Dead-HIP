import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../../components/chat/ChatHeader';
import SockJS from 'sockjs-client';
import SockJsClient from 'react-stomp';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

const chats = [
  {
    _id: 1,
    text: '돌림노래야이야',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: '아이유',
      avatar:
        'https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/01/57f00c7a-6fb6-49b1-905f-2438e4f7897a.jpg',
    },
  },
];

export default function ChatRoom({ navigation }) {
  const [messages, setMessages] = useState(chats);

  // const sockConnect = async () => {
  //   const token = await AsyncStorage.getItem('session');
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: 'http://3.34.178.136/ws-stomp',
  //       headers: {
  //         token: token,
  //       },
  //     });
  //     console.log(response.data);
  //     // Welcome to SockJS!
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const makingChatRoom = async (myEmail, youEmail) => {
  //   const token = await AsyncStorage.getItem('session');
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: 'http://3.34.178.136/api/chat/create',
  //       data: {
  //         chatUser: [myEmail, youEmail],
  //       },
  //       headers: {
  //         token: token,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const enterChatRoom = async (roomId) => {
  //   const token = AsyncStorage.getItem('session');
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: 'http://3.34.178.136/api/chat/enter/' + roomId,
  //       headers: {
  //         token: token,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const connectAndSub = async () => {
  //   const token = await AsyncStorage.getItem('session');
  //   ws.connect(
  //     {
  //       token: token,
  //     },
  //     function (frame) {
  //       console.log('소캣연결성공', frame);
  //       // ws.subscribe(
  //       //   'http://3.34.178.136/sub/chat/room/' + roomId,
  //       //   function (res) {
  //       //     console.log(JSON.parse(res.body));
  //       //   }
  //       // );
  //     }
  //   );
  // };

  useEffect(() => {
    // sockConnect();
    connectServer();
    // sockConnect();
    // enterChatRoom();
    // makingChatRoom();
    // connectAndSub();
    // ws.disconnect()
  }, []);

  const onSend = async (messages) => {
    // console.log(messages[0].text);
    const token = await AsyncStorage.getItem('session');
    ws.send(
      '/pub/api/chat/message',
      {
        token: token,
      },
      JSON.stringify({
        type: 'TALK',
        roomId: '3d3f74a1-f014-4ce6-b07d-ec9cbca8768b',
        message: messages[0].text,
        userName: '문형원',
        userProfile: '내 이미지 주소',
      })
    );
    Keyboard.dismiss();
  };

  return (
    <>
      <ChatHeader navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <GiftedChat
          placeholder={'메시지를 입력해 주세요.'}
          renderAvatarOnTop={true}
          textInputStyle={styles.input}
          messages={messages}
          onSend={(messages) => onSend(messages)}
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
