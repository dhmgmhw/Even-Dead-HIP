import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { Header } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatMain({ navigation }) {
  const [image, setimage] = useState('kimchi');
  return (
    <>
      <Header
        placement='left'
        containerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          borderBottomWidth: 1,
        }}
        leftComponent={''}
        centerComponent={{
          text: { image },
          style: { fontSize: 20, fontWeight: '800' },
        }}
        rightComponent={
          <Ionicons
            name={'search'}
            size={27}
            style={{ marginHorizontal: 10 }}
          />
        }
      />
      <ScrollView style={styles.container}>
        <Pressable
          style={styles.chatBox}
          onPress={() => {
            // navigation.navigate("ChatPage", setimage)
            navigation.navigate('SignUpPage');
          }}>
          {/* 변화 */}
          <View style={styles.userBox}></View>

          <View style={styles.descBox}></View>
          <View style={styles.bookBox}></View>
          <Text>{image}</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white' },
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
});
