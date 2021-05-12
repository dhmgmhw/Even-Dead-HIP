import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Container } from 'native-base';

export default function TradeConfirmPage({ navigation }) {
  useEffect(() => {}, []);

  return (
    <Container style={styles.container}>
      <Image
        style={styles.fontImg}
        resizeMode='cover'
        source={require('../../assets/check-square.png')}
      />
      <Text style={styles.setarea}>교환이 완료되었습니다!</Text>
      <Text style={styles.infoText}>포인트가 적립되었습니다</Text>
      <Text style={styles.infoText}>자세한 내역은 MY페이지를 참고해주세요</Text>
      <View style={styles.blank}></View>
      <Pressable
        style={{
          width: 130,
          height: 50,
          backgroundColor: '#23A40E',
          borderRadius: 15,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          top: '85%',
          zIndex: 300,
        }}
        onPress={() => {
          navigation.pop();
        }}>
        <Text
          style={{ color: 'white', fontFamily: 'SansMedium', fontSize: 20 }}>
          확인
        </Text>
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setarea: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 18,
    fontFamily: 'SansBold',
    color: '#23A40E',
  },
  fontImg: {
    height: 70,
    width: 70,
  },
  infoText: {
    fontFamily: 'SansBold',
    fontSize: 15,
    color: '#adadad',
  },
  blank: {
    height: 200,
  },
});
