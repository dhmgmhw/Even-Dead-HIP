import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { mocklist } from '../../mock.json';
import OurTownComponent from '../../components/home/OurTownComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function HomeMain({ navigation }) {
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
        leftComponent={{
          text: '송파구',
          style: { fontSize: 20, fontWeight: '800' },
        }}
        centerComponent={{
          text: '니책내책',
          style: { fontSize: 20, fontWeight: '800' },
        }}
        rightComponent={''}
      />
      <View
        style={{
          width: diviceWidth * 0.9,
          height: 150,
          backgroundColor: 'grey',
          alignSelf: 'center',
          marginVertical: 30,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 17 }}>자체제작 컨텐츠??</Text>
      </View>
      <View style={styles.subTitleBox}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>우리 동네 책장</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('OurTownPage');
          }}
          style={styles.subTitleBtn}>
          <Text
            style={{ fontSize: 17, fontWeight: '600', top: 5, color: 'grey' }}>
            {'>>'}
          </Text>
        </Pressable>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.ourTown}>
          {posts.map((post, i) => {
            return (
              <OurTownComponent key={i} navigation={navigation} post={post} />
            );
          })}
        </ScrollView>
        <View style={styles.subTitleBox}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            우리 동네 인기 도서
          </Text>
          <Pressable style={styles.subTitleBtn}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                top: 5,
                color: 'grey',
              }}>
              {'>>'}
            </Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.ourTown}>
          {posts.map((post, i) => {
            return (
              <OurTownComponent key={i} navigation={navigation} post={post} />
            );
          })}
        </ScrollView>
      </View>
      <Button
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddPage')}>
        <Ionicons name={'add'} size={30} style={{ color: 'white' }} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  subTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: diviceWidth,
    height: 40,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subTitleBtn: {
    width: 30,
    height: 30,
  },
  ourTown: {
    height: 170,
  },
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
