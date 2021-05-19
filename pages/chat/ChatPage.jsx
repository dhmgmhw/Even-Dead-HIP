import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import ChatInputComponent from '../../components/chat/ChatInputComponent';
import MyChatComponent from '../../components/chat/MyChatComponent';
import OpponentChatComponent from '../../components/chat/OpponentChatComponent';
import ChatHeader from '../../components/chat/ChatHeader';
import {
  sockConnect,
  connectServer,
  enterChatAndSub,
} from '../../config/SocketApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatPage({ navigation, route }) {
  const myInfo = route.params[0];
  const roomInfo = route.params[1];
  const [chats, setChats] = useState();

  const connecetToSub = async (roomId) => {
    await sockConnect();
    await connectServer();
    await enterChatAndSub(roomId);
  };

  useEffect(() => {
    connecetToSub(roomInfo.roomId);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <ChatHeader navigation={navigation} />
        <View style={styles.chatContainer}>
          <OpponentChatComponent />
          <MyChatComponent />
        </View>
        <KeyboardAvoidingView
          style={{ position: 'absolute', bottom: '0%' }}
          behavior='position'>
          <ChatInputComponent roomId={roomInfo.roomId} myInfo={myInfo} />
        </KeyboardAvoidingView>
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
});
