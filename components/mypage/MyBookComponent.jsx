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
                'http://image.yes24.com/momo/TopCate2841/MidCate009/179530372(2).jpg',
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
    marginVertical: 10,
  },
  bookCoverImg: {
    width: 90,
    height: 130,
    marginHorizontal: 20,
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
    fontSize: 16,
    marginVertical: 10,
  },
  time: { fontFamily: 'SCDream5', color: '#9A9A9A' },
  bottomBar: {
    height: 5,
    width: diviceWidth,
    backgroundColor: '#F7F6FF',
  },
});
