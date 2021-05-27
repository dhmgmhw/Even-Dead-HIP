import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  FlatList,
  Platform,
  TextInput,
  Pressable,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import MyChatComponent from '../../components/chat/MyChatComponent';
import OpponentChatComponent from '../../components/chat/OpponentChatComponent';
import ChatHeader from '../../components/chat/ChatHeader';
import { sockConnect } from '../../config/SocketApi';
import SockJS from 'sockjs-client';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

let sock = new SockJS('http://13.124.182.223/ws-stomp');
let ws = Stomp.over(sock);

export default function ChatPage({ navigation, route }) {
  const myInfo = route.params[0];
  const roomInfo = route.params[1];

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const connecetToSub = async () => {
    await sockConnect();
    await enterChat(roomInfo.roomId);
    await connectServer();
  };

  const connectServer = async () => {
    console.log('연결중입니다...');
    let sock = new SockJS('http://13.124.182.223/ws-stomp');
    let ws = Stomp.over(sock);

    const token = await AsyncStorage.getItem('session');
    ws.connect(
      {
        token: token,
      },
      async (frame) => {
        if (frame.command == 'CONNECTED') {
          console.log('연결되었습니다');
          setIsLoading(false);
          await ws.subscribe(
            `/sub/chat/room/${roomInfo.roomId}`,
            async (res) => {
              console.log('메시지 수신');
              await enterChat(roomInfo.roomId);
            }
          );
        } else {
          console.log('재연결중입니다...');
          setIsLoading(true);
          setTimeout(connectServer, 500);
        }
      },
      function (error) {
        console.log('재연결중입니다...');
        setIsLoading(true);
        setTimeout(connectServer, 500);
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
      setMessages(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const onSend = async () => {
    const token = await AsyncStorage.getItem('session');
    ws.send(
      '/pub/api/chat/message',
      {
        token: token,
      },
      JSON.stringify({
        type: 'TALK',
        roomId: roomInfo.roomId,
        message: text,
        userName: myInfo.username,
        userProfile: myInfo.image,
      })
    );
    setText('');
    await enterChat(roomInfo.roomId);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      connecetToSub(roomInfo.roomId);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ChatHeader navigation={navigation} roomInfo={roomInfo} myInfo={myInfo} />
      <FlatList
        data={messages}
        inverted
        renderItem={(message) => {
          return myInfo.email == message.item.email ? (
            <MyChatComponent
              key={message.id}
              time={message.item.timenow}
              message={message.item.message}
            />
          ) : (
            <OpponentChatComponent key={message.id} message={message.item} />
          );
        }}
        keyExtractor={(item) => String(item.id)}
      />
      <View style={styles.messageBar}>
        <View style={styles.messageBox}>
          <View
            style={{
              width: '85%',
            }}>
            <TextInput
              style={styles.input}
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
      {isLoading ? (
        <ActivityIndicator
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
          }}
          size='large'
          color='grey'
        />
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  chatContainer: { backgroundColor: 'white' },
  statusAvoid: {
    height: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  messageBar: {
    width: diviceWidth,
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
  input: {
    paddingLeft: 20,
    backgroundColor: 'white',
    margin: 7,
    height: 30,
    borderRadius: 15,
    width: '100%',
  },
});
