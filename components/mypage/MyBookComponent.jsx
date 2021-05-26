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

export default function MyBookComponent({ navigation, post }) {
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate('PostDetailPage', post);
        }}
        style={styles.container}>
        <View
          style={{
            borderRadius: 5,
          }}>
          <Image
            style={styles.bookCoverImg}
            resizeMode='cover'
            source={
              post.image
                ? { uri: post.image }
                : require('../../assets/splash.png')
            }
          />
        </View>
        <View style={{ width: diviceWidth * 0.65 }}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
              {post.title}
            </Text>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.town}>{post.town}</Text>
          </View>

          {post.finish === 0 ? null : (
            <View style={styles.doneBox}>
              <Text style={styles.done}>교환완료</Text>
            </View>
          )}
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
    marginVertical: 20,
  },
  bookCoverImg: {
    width: 70,
    height: 100,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  title: {
    fontFamily: 'SansBold',
    fontSize: 14,
    marginVertical: 5,
  },
  author: {
    fontFamily: 'SansRegular',
    fontSize: 12,
    marginVertical: 5,
  },
  town: { fontFamily: 'SansRegular', color: '#9A9A9A', fontSize: 12 },
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
