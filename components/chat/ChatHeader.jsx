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
import { Ionicons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function ChatHeader({ navigation }) {
  return (
    <>
      <View style={styles.statusAvoid}></View>
      <View style={styles.mainHeader}>
        <View style={styles.headerLComp}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name={'chevron-back'}
            size={27}
            color={'black'}
          />
        </View>
        <View style={styles.headerCComp}>
          <Text style={styles.headerCText}>아이유</Text>
        </View>
        <View style={styles.headerRComp}></View>
      </View>
      <Pressable
        onPress={() => {
          console.log('에헤이');
        }}
        style={styles.chatInfoBox}>
        <Image
          style={styles.bookBox}
          resizeMode='cover'
          PlaceholderContent={<ActivityIndicator />}
          source={{
            uri: 'http://image.newsis.com/2021/01/15/NISI20210115_0000674160_web.jpg',
          }}
        />
        <View style={styles.descBox}>
          <Text numberOfLines={3} style={styles.descText}>
            아이유 싱글앨범 "Celebrity"
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
});
