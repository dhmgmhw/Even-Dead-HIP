import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  Pressable,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatInputComponent() {
  const [text, setText] = useState('');

  const leaveMessage = async () => {
    await console.log('Hey');
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
        <Pressable onPress={leaveMessage}>
          <Image
            style={{ height: 35, width: 40, padding: 5 }}
            resizeMode='contain'
            source={require('../../assets/mainlogo.png')}
          />
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
