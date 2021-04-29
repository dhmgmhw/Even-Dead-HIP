import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { mocklist } from '../../mock.json';
import { Grid } from 'native-base';
import PostComponent from '../../components/search/PostComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function SearchMain({ navigation }) {
  const [posts, setPosts] = useState(mocklist);

  useEffect(() => {
    // console.log(posts);
  }, []);

  return (
    <>
      <Header
        containerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
        }}
        leftComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name={'chevron-back'} size={27} />
            <Text style={{ fontSize: 17, fontWeight: '600' }}>송파구</Text>
          </View>
        }
        centerComponent={{
          text: '우리 동네 책장',
          style: { fontSize: 20, fontWeight: '800' },
        }}
        rightComponent={
          <View style={{ flexDirection: 'row' }}>
            <Ionicons
              name={'heart-outline'}
              size={27}
              style={{ marginHorizontal: 10 }}
            />
            <Ionicons name={'bookmark-outline'} size={27} />
          </View>
        }
      />
      <ScrollView style={styles.container}>
        <Grid style={{ flexWrap: 'wrap', marginTop: 30 }}>
          {posts.map((post, i) => {
            return (
              <PostComponent key={i} navigation={navigation} post={post} />
            );
          })}
        </Grid>
      </ScrollView>
      <Button
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddPage')}>
        <Ionicons name={'add'} size={30} style={{ color: 'white' }} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flexWrap: 'wrap' },
  addBtn: {
    backgroundColor: '#6864FF',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '3%',
    right: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
