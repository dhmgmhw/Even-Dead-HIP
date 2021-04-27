import React from 'react';
import { StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function PostComponent({ navigation, post }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('PostDetailPage', post);
      }}>
      <View style={styles.card}>
        <View style={{ zIndex: 2 }}>
          <Image
            style={styles.cardImage}
            resizeMode='cover'
            source={{ uri: post.image }}
          />
        </View>
        <View style={styles.cardBackBox}></View>
        <View style={styles.cardBottomBox}></View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    width: diviceWidth / 3,
    height: 170,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  cardImage: {
    width: 90,
    height: 130,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cardBackBox: {
    height: 10,
    width: 100,
    backgroundColor: '#DBDBDB',
    alignSelf: 'center',
    position: 'absolute',
    top: 125,
  },
  cardBottomBox: {
    height: 10,
    width: 90,
    alignSelf: 'center',
    top: 5,
    backgroundColor: '#c8c8c8',
  },
});
