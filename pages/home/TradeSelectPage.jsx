import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { tradeConfirm } from '../../config/MyPageApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function TradeSelectPage({ navigation, route }) {
  const [commentedUser, setCommentedUser] = useState([]);

  const [sendData, setSendData] = useState('');
  const [uploaderId, setUploaderId] = useState();
  const [postId, setPostId] = useState();

  const data = route.params;
  useEffect(() => {
    let list = [];
    let setList = [];
    for (let i = 0; i < data[1].length; i++) {
      if (list.includes(data[1][i].username) == false) {
        list.push(data[1][i].username);
        setList.push(data[1][i]);
      } else {
        console.log('filter');
      }
    }
    setCommentedUser(setList);
    setUploaderId(data[0].user.id);
    setPostId(data[0].id);
  }, []);

  const confirmChange = async () => {
    if (sendData == '') {
      Alert.alert('교환한 상대를 선택해주세요');
      return;
    }
    if (uploaderId == sendData.userId) {
      Alert.alert('본인의 게시글에는 교환을 할 수 없습니다');
      return;
    }
    await tradeConfirm(uploaderId, sendData.userId, postId, navigation);
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      <Pressable
        style={{
          width: 130,
          height: 50,
          backgroundColor: sendData == '' ? '#E0E0E0' : '#1EA608',
          borderRadius: 15,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          top: '85%',
          zIndex: 300,
        }}
        onPress={confirmChange}>
        <Text
          style={{ color: 'white', fontFamily: 'SansMedium', fontSize: 20 }}>
          확인
        </Text>
      </Pressable>

      <View style={styles.header}>
        <Ionicons
          name={'chevron-back'}
          size={25}
          style={{ color: 'grey' }}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={styles.headerText}>교환자 선택</Text>
        <Ionicons name={'add'} size={25} style={{ color: 'white' }} />
      </View>

      {sendData == '' ? (
        <>
          <View style={styles.bookBox}>
            <Image
              style={styles.bookImg}
              resizeMode='cover'
              source={{ uri: data[0].image }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'SansBold',
                  fontSize: 14,
                  color: '#adadad',
                  marginBottom: 20,
                }}>
                교환할 도서
              </Text>
              <Text numberOfLines={2} style={styles.bookTitle}>
                {data[0].title}
              </Text>
              <Text numberOfLines={1} style={styles.author}>
                {data[0].author}
              </Text>
            </View>
          </View>
          <View style={styles.guideBox}>
            <Text style={styles.guideText}>위 책을 교환한 이웃을</Text>
            <Text style={styles.guideText}>선택해주세요</Text>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 30,
              backgroundColor: '#F5F5F5',
            }}>
            <Image
              style={styles.pickUserImg}
              resizeMode='cover'
              source={{ uri: sendData.image }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text style={styles.pickedUser}>{sendData.username}</Text>
            </View>
          </View>
          <View style={styles.guideBox}>
            <Text style={styles.guideText}>
              이 책을 {sendData.username} 님과
            </Text>
            <Text style={styles.guideText}>교환했어요</Text>
          </View>
        </>
      )}
      <ScrollView contentContainerStyle={{ height: diviceHeight / 2 }}>
        {commentedUser.map((user, i) => {
          return (
            <Pressable
              onPress={() => {
                setSendData(user);
              }}
              style={styles.chatterBox}
              key={i}>
              <Image
                style={styles.chatUserImg}
                resizeMode='cover'
                source={{ uri: user.image }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  marginLeft: 20,
                }}>
                <Text style={styles.chatUser}>{user.username}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={{ height: 100 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight(),
  },
  headerText: {
    color: '#4CB73B',
    fontSize: 18,
    fontFamily: 'SansMedium',
  },
  bookBox: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#F5F5F5',
  },
  bookTitle: { fontFamily: 'SansBold', fontSize: 14, width: '50%' },
  author: { fontFamily: 'SansRegular', fontSize: 12, width: '50%' },
  bookImg: { height: 120, width: 90, borderRadius: 5 },
  guideBox: {
    height: 90,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  guideText: {
    color: '#4CB73B',
    fontSize: 18,
    fontFamily: 'SansMedium',
    alignSelf: 'center',
  },
  chatterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 90,
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 25,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  chatUserImg: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  pickUserImg: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  chatUser: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'SansExtra',
    color: 'black',
  },
  pickedUser: {
    fontSize: 14,
    fontFamily: 'SansExtra',
    color: 'black',
    marginTop: 10,
  },
});
