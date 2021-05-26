import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function OpponentChatComponent({ message }) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(message);
  }, []);
  return (
    <View style={{ paddingBottom: 10, marginHorizontal: 20 }}>
      <View style={styles.oppositeChatBox}>
        <View style={styles.oppositeUserBox}>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalBox}>
                <View style={styles.userBox}>
                  <Ionicons
                    name={'close'}
                    onPress={() => setModalVisible(!modalVisible)}
                    size={25}
                    style={{ alignSelf: 'flex-end', color: 'white' }}
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.userImgBox}>
                      <Image
                        style={styles.userImg}
                        resizeMode='cover'
                        source={{
                          uri: message.userProfile,
                        }}
                      />
                    </View>
                    <Text numberOfLines={2} style={styles.userName}>
                      {message.userName}님의 서재
                    </Text>
                  </View>
                </View>
                <ScrollView></ScrollView>
              </View>
            </Modal>
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
              }}
              resizeMode='cover'
              source={{
                uri: message.userProfile,
              }}
            />
          </Pressable>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>{message.message}</Text>
        </View>
        <Text style={styles.time}>
          {message.timenow.split(' ')[1].substring(0, 5)}
        </Text>
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
  modalBox: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    width: diviceWidth,
    height: diviceHeight * 0.8,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  userBox: {
    padding: 20,
    width: diviceWidth,
    backgroundColor: '#4CB73B',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: '25%',
  },
  userName: {
    fontFamily: 'SansBold',
    fontSize: 24,
    color: 'white',
    maxWidth: '70%',
  },
  userImgBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginRight: 20,
  },
  userImg: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
});
