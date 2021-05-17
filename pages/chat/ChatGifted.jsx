import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default function ChatGifted() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '우린 가장 최악의~',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '아이유',
          avatar:
            'https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/01/57f00c7a-6fb6-49b1-905f-2438e4f7897a.jpg',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      placeholder={'메시지를 입력해 주세요.'}
      renderAvatarOnTop={true}
      textInputStyle={styles.input}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
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
