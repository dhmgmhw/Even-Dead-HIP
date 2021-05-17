import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function MainUserBox({ navigation, myName, myImg, myPoint }) {
  return (
    <View style={{ paddingBottom: 10, backgroundColor: '#64BB35' }}>
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={styles.title}>{myName}님의</Text>
            <Text style={styles.title2}>
              콩나무 <Text style={{ color: '#4CB73B' }}>새싹 단계</Text>
            </Text>
            <Text style={styles.town}>책을 교환하면 포인트를</Text>
            <Text style={styles.town}>얻을 수 있어요!</Text>
            <Text
              style={[
                styles.town,
                { marginTop: Platform.OS == 'ios' ? 5 : 0 },
              ]}>
              내 콩나무 포인트 : {myPoint} 점
            </Text>
          </View>
        </View>
        <View
          style={{
            borderRadius: 5,
          }}>
          <Image
            style={styles.userImg}
            resizeMode='contain'
            source={{ uri: myImg }}
          />
        </View>
      </View>
      <View style={styles.decoyBox}>
        <Button
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddPage')}>
          <Ionicons name={'add'} size={30} style={{ color: 'white' }} />
        </Button>
        <View style={styles.innerTopDecoyBox}></View>
        <View style={styles.innerBottomDecoyBox}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    zIndex: 1300,
  },

  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 15,
    borderWidth: 0.1,
  },
  title: {
    fontFamily: 'SCDream6',
    fontSize: 24,
    marginVertical: 3,
  },
  title2: {
    fontFamily: 'SCDream6',
    fontSize: 24,
    marginBottom: 15,
    marginVertical: 3,
  },
  town: {
    fontFamily: 'SCDream4',
    color: '#434343',
    fontSize: 13,
    lineHeight: 20,
  },
  bottomBar: {
    height: 5,
    marginHorizontal: 20,
    backgroundColor: '#F7F6FF',
  },
  doneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 80,
    borderRadius: 15,
    backgroundColor: '#54B65E',
    top: 5,
    alignSelf: 'flex-end',
  },
  done: {
    fontFamily: 'SansMedium',
    fontSize: 12,
    color: 'white',
  },
  addBtn: {
    backgroundColor: '#4CB73B',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '0%',
    right: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 100,
  },
  decoyBox: {
    height: 60,
  },
  innerTopDecoyBox: {
    backgroundColor: 'white',
    height: 30,
  },
  innerBottomDecoyBox: {
    height: 30,
    backgroundColor: '#64BB35',
  },
});
