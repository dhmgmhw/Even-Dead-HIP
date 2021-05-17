import React from 'react';
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

export default function PostComponent({ navigation, post }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('PostDetailPage', post);
      }}>
      <View style={styles.card}>
        <View>
          <Image
            style={styles.cardImage}
            resizeMode='cover'
            source={
              post.image
                ? { uri: post.image }
                : require('../../assets/splash.png')
            }
          />
        </View>
        <View style={styles.cardTitleBox}>
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'SCDream6',
            }}>
            {post.title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 40,
    width: diviceWidth / 2,
    height: diviceWidth / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  cardImage: {
    height: 200,
    width: 130,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cardTitleBox: {
    width: 100,
    alignSelf: 'center',
    marginTop: 15,
  },
});
