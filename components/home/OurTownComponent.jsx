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

export default function OurTownComponent({ navigation, post }) {
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
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  cardImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cardTitleBox: {
    width: 90,
    alignSelf: 'center',
    marginTop: 15,
  },
});
