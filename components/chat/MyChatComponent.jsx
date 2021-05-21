import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function MyChatComponent({ time, message }) {
  return (
    <View style={styles.myChatBox}>
      <Text style={styles.time}>{time.split(' ')[1].substring(0, 5)}</Text>
      <View style={styles.textBox}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SansRegular',
    fontSize: 13,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  myChatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  textBox: {
    maxWidth: '60%',
    backgroundColor: '#d8f3d4',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  time: {
    marginRight: 5,
    fontSize: 10,
    fontFamily: 'SansRegular',
    alignSelf: 'flex-end',
    color: 'grey',
  },
});
