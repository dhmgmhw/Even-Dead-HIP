import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Overlay } from 'react-native-elements';
import { tradeConfirm } from '../../config/MyPageApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatHeader({ navigation, roomInfo, myInfo }) {
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = useState(false);

  const confirmChange = async () => {
    // tradeConfirm(roomInfo.user[1].id,roomInfo.user[0].id,책아이디,navigation)
    console.log(roomInfo);
  };
  return roomInfo.user.length == 1 ? (
    <Text style={styles.doneMark}>서비스를 탈퇴한 유저입니다</Text>
  ) : (
    <>
      <View style={styles.statusAvoid}></View>
      <View style={styles.mainHeader}>
        <View style={styles.headerLComp}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name={'chevron-back'}
            size={24}
            color={'black'}
          />
        </View>
        <View style={styles.headerCComp}>
          <Text numberOfLines={2} style={styles.headerCText}>
            {myInfo.username == roomInfo.user[0].username
              ? roomInfo.user[1].username
              : roomInfo.user[0].username}
          </Text>
        </View>
        <View style={styles.headerRComp}>
          <Ionicons
            onPress={toggleOverlay}
            name={'ellipsis-vertical'}
            size={20}
            color={'black'}
          />
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={styles.tootipBox}>
              <Text
                style={[styles.infoText, { fontSize: 20, marginVertical: 20 }]}>
                가치교환 확인
              </Text>
              <Text style={styles.infoText}>교환을 완료하셨습니끼?</Text>
              <Text style={styles.infoText}>
                가치교환을 완료하면 작성자에겐 150포인트,
              </Text>
              <Text style={styles.infoText}>
                교환한 사람에겐 100포인트가 지급됩니다.
              </Text>
              <Pressable onPress={confirmChange} style={styles.btn}>
                <Text style={[styles.infoText, { color: 'white' }]}>
                  교환완료
                </Text>
              </Pressable>
            </View>
          </Overlay>
        </View>
      </View>
      <Pressable style={styles.chatInfoBox}>
        <Image
          style={styles.bookBox}
          resizeMode='cover'
          PlaceholderContent={<ActivityIndicator />}
          source={{
            uri: roomInfo.image,
          }}
        />
        <View style={styles.descBox}>
          <Text numberOfLines={3} style={styles.descText}>
            {roomInfo.roomName}
          </Text>
        </View>
      </Pressable>
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
  chatInfoBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
  },
  descBox: {
    marginLeft: 20,
    maxWidth: '80%',
  },
  descText: {
    fontFamily: 'SansMedium',
    fontSize: 15,
  },
  bookBox: {
    width: 60,
    height: 70,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  tootipBox: {
    width: diviceWidth * 0.9,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#438732',
  },
  infoText: {
    fontFamily: 'SansMedium',
    textAlign: 'center',
    color: '#438732',
    lineHeight: 30,
  },
  btn: {
    width: 150,
    backgroundColor: '#438732',
    paddingVertical: 5,
    alignSelf: 'center',
    borderRadius: 100,
    marginVertical: 20,
  },
  doneMark: {
    fontFamily: 'SansMedium',
    fontSize: 18,
    color: '#438732',
    textAlign: 'center',
    top: '10%',
  },
});
