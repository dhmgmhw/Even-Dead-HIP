import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import ChatRoomComponent from '../../components/chat/ChatRoomComponent';
import { getUserProfile } from '../../config/BackData';
import { getMyRoom } from '../../config/SocketApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatMain({ navigation }) {
  const [profile, setProfile] = useState('');
  const [chatRooms, setChatRooms] = useState([]);

  const loadMyProfile = async () => {
    const result = await getUserProfile();
    setProfile(result.results);
  };

  const loadChatRoom = async () => {
    const result = await getMyRoom();
    setChatRooms(result.reverse());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMyProfile();
      loadChatRoom();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.statusAvoid}></View>
      <Pressable style={styles.mainHeader}>
        <View style={styles.headerLComp}></View>
        <View style={styles.headerCComp}>
          <Text style={styles.headerCText}>채팅</Text>
        </View>
        <View style={styles.headerRComp}></View>
      </Pressable>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ marginTop: 20, paddingBottom: 40 }}>
        {chatRooms ? (
          <>
            {chatRooms.map((chatRoom, i) => {
              return (
                <ChatRoomComponent
                  key={i}
                  navigation={navigation}
                  profile={profile}
                  chatRoom={chatRoom}
                />
              );
            })}
          </>
        ) : (
          <View style={{ height: 300, width: 300, backgroundColor: 'red' }}>
            <Text style={styles.info}>채팅방이 없습니다</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  statusAvoid: {
    height: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  mainHeader: {
    width: diviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 45,
    borderBottomWidth: 4,
    borderColor: '#f3f3f3',
  },
  headerLComp: {
    height: 45,
    width: diviceWidth / 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerCComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
  },
  headerRComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  headerCText: {
    fontFamily: 'SansBold',
    fontSize: 18,
    textAlign: 'center',
  },
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
  userName: {
    fontFamily: 'SansExtra',
    fontSize: 14,
  },
  chat: {
    fontFamily: 'SansMedium',
    fontSize: 14,
  },
  info: {
    fontFamily: 'SansMedium',
    fontSize: 60,
  },
});
