import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MyBookComponent from './MyBookComponent';
import { getMyPost } from '../../config/MyPageApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function MyLibraryTab({ navigation }) {
  const [myPosts, setMyPosts] = useState();
  const [loading, setLoading] = useState(true);

  const download = async () => {
    const response = await getMyPost();
    if (response.length > 0) {
      setMyPosts(response);
      setLoading(false);
    } else {
      console.log('No Posts');
      setLoading(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      download();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabTitleBox}>
        <Feather name='book' size={28} color='black' />
        <Text
          style={{
            fontFamily: 'SansBold',
            fontSize: 18,
            marginHorizontal: 10,
          }}>
          내 서재
        </Text>
      </View>
      {loading ? null : (
        <>
          {myPosts.map((post, i) => {
            return (
              <MyBookComponent navigation={navigation} key={i} post={post} />
            );
          })}
        </>
      )}
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
