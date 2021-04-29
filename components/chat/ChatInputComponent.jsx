import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Item } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatInputComponent() {
  const [text, setText] = useState('');

  const leaveMessage = async () => {
    await console.log('Hey');
  };

  return (
    <KeyboardAvoidingView style={styles.messageBar} behavior='position'>
      <Item style={styles.messageBox}>
        <TextInput
          style={{
            paddingLeft: 20,
            backgroundColor: '#eeeeee',
            margin: 7,
            height: 40,
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 100,
            width: diviceWidth * 0.8,
          }}
          onChangeText={setText}
          value={text}
          placeholder='메시지를 입력하세요'
        />
        <Ionicons
          active
          onPress={leaveMessage}
          name='chatbox'
          size={27}
          style={{ marginHorizontal: 10, color: '#202540' }}
        />
      </Item>
    </KeyboardAvoidingView>
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
  messageBar: {
    width: diviceWidth,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  messageBox: {
    width: diviceWidth,
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E4E4E4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
