import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
  LogBox,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { delScrapBook, postScrapBook } from '../../config/MyPageApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function GenreSearchResult({ navigation, post }) {
  LogBox.ignoreLogs(['Warning: ...']);

  useEffect(() => {}, []);

  return (
    <Pressable
      style={styles.cardBox}
      onPress={() => {
        navigation.navigate('PostDetailPage', post);
      }}>
      <View style={styles.card}>
        <View style={styles.cardFlex}>
          <Image
            style={styles.cardImage}
            resizeMode='cover'
            source={{ uri: post.image }}
          />
          <View style={styles.cardTitleBox}>
            <View>
              <Text
                numberOfLines={2}
                style={{ fontFamily: 'SCDream6', fontSize: 13 }}>
                {post.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'SCDream3',
                  fontSize: 13,
                  marginTop: 10,
                }}>
                {post.author}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{ fontFamily: 'SCDream3', fontSize: 12 }}>
              {post.town}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomBorder}></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    marginHorizontal: 20,
  },
  bottomBorder: {
    height: 4,
    backgroundColor: '#F3F3F3',
  },
  card: {
    height: 95,
    marginVertical: 20,
  },
  cardFlex: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cardTitleBox: {
    width: diviceWidth * 0.7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingVertical: 10,
  },
  scrap: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '60%',
  },
});
