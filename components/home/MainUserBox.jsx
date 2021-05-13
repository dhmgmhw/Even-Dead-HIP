import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function MainUserBox({ myName, myImg }) {
  return (
    <>
      <Pressable style={styles.container}>
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
          </View>
        </View>
        <View
          style={{
            borderRadius: 5,
          }}>
          <Image
            style={styles.bookCoverImg}
            resizeMode='contain'
            source={{ uri: myImg }}
          />
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 100,
  },

  bookCoverImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 15,
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
});
