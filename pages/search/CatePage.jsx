import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';
import { Header } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import { searchByCate } from '../../config/SearchApi';
import GenreComponent from '../../components/home/GenreComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CatePage({ navigation, route }) {
  const cate = route.params;

  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState();

  useEffect(() => {
    download();
  }, []);

  const download = async () => {
    const result = await searchByCate(cate);
    if (result.ok == false) {
      Alert.alert('아직 등록된 책이 없어요 :(');
      setTimeout(() => {
        navigation.pop();
      }, 1000);
    } else {
      //   console.log(result.results);
      setPosts(result.results);
      setLoader(false);
    }
  };

  return loader ? (
    <ActivityIndicator
      style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
      size='large'
      color='grey'
    />
  ) : (
    <>
      <Header
        containerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          borderBottomWidth: 0,
        }}
        leftComponent={
          <View style={styles.headerLeftBox}>
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name={'chevron-back'}
              size={27}
            />
            <Text style={styles.headerLeftText}>{cate}</Text>
          </View>
        }
        centerComponent={''}
        rightComponent={''}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {posts ? (
          <>
            {posts.map((post, i) => {
              return (
                <Pressable
                  onPress={() => {
                    console.log(post);
                  }}
                  key={i}>
                  <GenreComponent navigation={navigation} post={post} />
                </Pressable>
              );
            })}
          </>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 25,
  },
  headerLeftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  headerLeftText: {
    fontSize: 18,
    fontFamily: 'SansBold',
    marginLeft: 10,
    color: '#4CB73B',
  },
});
