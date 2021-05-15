import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function MyChatComponent() {
  return (
    <View style={styles.myChatBox}>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          나리는 꽃가루에 눈이 따끔해 (아야) 눈물이 고여도 꾹 참을래 내 마음
          한켠 비밀스런 오르골에 넣어두고서 영원히 되감을 순간이니까
        </Text>
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
});
