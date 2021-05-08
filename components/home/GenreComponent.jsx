import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
} from 'react-native';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function GenreComponent({ navigation, post }) {
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
                numberOfLines={1}
                style={{
                  fontFamily: 'SCDream3',
                  fontSize: 13,
                  marginBottom: 10,
                }}>
                #{post.category}
              </Text>
              <Text
                numberOfLines={2}
                style={{ fontFamily: 'SCDream6', fontSize: 13 }}>
                {post.title}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{ fontFamily: 'SCDream3', fontSize: 12 }}>
              {post.author}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    borderWidth: 1,
  },
  card: {
    height: 115,
    marginLeft: 20,
  },
  cardFlex: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cardTitleBox: {
    width: 130,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingVertical: 10,
  },
});
