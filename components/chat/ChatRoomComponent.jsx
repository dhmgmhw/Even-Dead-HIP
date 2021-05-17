import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';

export default function ChatRoomComponent({ navigation }) {
  return (
    <Pressable
      onPress={() => {
        navigation.push('ChatRoom');
      }}
      style={styles.chatBox}>
      <View style={styles.userBox}>
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 100,
            marginRight: 15,
          }}
          resizeMode='cover'
          source={{
            uri: 'https://image.bugsm.co.kr/artist/images/1000/800491/80049126.jpg',
          }}
        />
      </View>
      <View style={styles.descBox}>
        <Text style={styles.userName}>아이유</Text>
        <Text style={styles.chat}>자니..?</Text>
      </View>
      <Image
        style={styles.bookBox}
        resizeMode='cover'
        PlaceholderContent={<ActivityIndicator />}
        source={{
          uri: 'http://image.newsis.com/2021/01/15/NISI20210115_0000674160_web.jpg',
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chatBox: {
    marginHorizontal: 20,
    borderBottomWidth: 4,
    borderColor: '#f3f3f3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  userBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  descBox: {
    width: '60%',
    justifyContent: 'center',
  },
  bookBox: {
    width: 50,
    height: 70,
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  userName: {
    fontFamily: 'SansExtra',
    fontSize: 14,
    marginBottom: 10,
  },
  chat: {
    fontFamily: 'SansMedium',
    fontSize: 14,
  },
});
