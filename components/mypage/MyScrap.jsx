import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getMyScrap } from '../../config/MyPageApi';
import GenreSearchResult from '../../components/search/GenreSearchResult';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function MyScrap({ navigation }) {
  const [posts, setPosts] = useState();

  const download = async () => {
    const response = await getMyScrap();
    setPosts(response.reverse());
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      download();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    download();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {posts ? (
        <>
          {posts.map((post, i) => {
            return (
              <Pressable
                onPress={() => {
                  console.log(post);
                }}
                key={i}>
                <GenreSearchResult navigation={navigation} post={post} />
              </Pressable>
            );
          })}
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  tabTitleBox: {
    width: diviceWidth,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
