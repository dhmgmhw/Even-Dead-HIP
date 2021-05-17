import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function OpponentChatComponent() {
  return (
    <View style={styles.oppositeChatBox}>
      <View style={styles.oppositeUserBox}>
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 100,
          }}
          resizeMode='cover'
          source={{
            uri: 'https://image.bugsm.co.kr/artist/images/1000/800491/80049126.jpg',
          }}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          오 라일락 꽃이 지는 날 goodbye 이런 결말이 어울려 안녕 꽃잎 같은 안녕
          하이얀 우리 봄날의 climax 아 얼마나 기쁜 일이야
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  oppositeChatBox: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: 'SansRegular',
    fontSize: 13,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  oppositeUserBox: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#EEF5ED',
    marginRight: 10,
  },
  textBox: {
    maxWidth: '60%',
    backgroundColor: '#EEF5ED',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
