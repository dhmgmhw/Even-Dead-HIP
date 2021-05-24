import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function OpponentChatComponent({ time, message, img }) {
  useEffect(() => {
    // console.log(time.split(' ')[1].substring(0, 5));
    // console.log(time);
  }, []);

  return (
    <View style={{ paddingBottom: 10, marginHorizontal: 20 }}>
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
              uri: img,
            }}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>{message}</Text>
        </View>
        <Text style={styles.time}>{time.split(' ')[1].substring(0, 5)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  oppositeChatBox: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'SansRegular',
    fontSize: 13,
    marginVertical: 10,
    marginHorizontal: 15,
    includeFontPadding: false,
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
  time: {
    marginLeft: 5,
    fontSize: 10,
    fontFamily: 'SansRegular',
    alignSelf: 'flex-end',
    color: 'grey',
  },
});
