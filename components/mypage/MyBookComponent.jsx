import React from 'react';
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

export default function MyBookComponent({ navigation }) {
  return (
    <>
      <Pressable
        onPress={() => {
          console.log('나는 곰돌이푸');
        }}
        style={styles.container}>
        <View
          style={{
            borderRadius: 5,
          }}>
          <Image
            style={styles.bookCoverImg}
            resizeMode='cover'
            source={{
              uri:
                'https://lh3.googleusercontent.com/proxy/E9c2IMWfYxWvfXkqwun2m5rpySo0QHXnep0-30EhQmdTrcFu8m61QjpX8dhUhGA4F1xruuhNMbhsJV2FIfccN9KEEb8O96PA82_IN_SoDIs5hg',
            }}
          />
        </View>
        <View style={{ width: diviceWidth * 0.65 }}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={styles.state}>S급</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
              나는 곰돌이푸
            </Text>
            <Text style={styles.region}>송파구 잠실동 2</Text>
            <Text style={styles.time}>16분전</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.bottomBar}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  bookCoverImg: {
    width: 100,
    height: 150,
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  state: {
    fontFamily: 'SCDream5',
    fontSize: 18,
    color: '#6864FF',
  },
  title: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    marginVertical: 10,
  },
  region: {
    fontFamily: 'SCDream5',
    fontSize: 17,
    marginVertical: 10,
  },
  time: { fontFamily: 'SCDream5', color: '#9A9A9A' },
  bottomBar: {
    height: 5,
    width: diviceWidth,
    backgroundColor: '#F7F6FF',
  },
});
