import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { mocklist } from '../../mock.json';
import OurTownComponent from '../../components/home/OurTownComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function HomeMain({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    setPosts(mocklist);
  }, []);

  const renderItem = ({ item }) => {
    return <Text style={{ height: 50 }}>{item.title}</Text>;
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size='small' />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };

  return (
    <>
      <Header
        containerStyle={{
          backgroundColor: 'white',
        }}
        leftComponent={
          <Ionicons
            name={'notifications-outline'}
            size={25}
            style={{ paddingHorizontal: 10 }}
          />
        }
        centerComponent={{
          text: '송파구',
          style: { fontSize: 18, fontFamily: 'SCDream5', top: 3 },
        }}
        rightComponent={
          <Ionicons
            name={'search-outline'}
            size={25}
            style={{ paddingHorizontal: 10 }}
          />
        }
      />
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.mainTitleBox}>
          <View>
            <Text style={styles.mainTitleText}>우리 동네</Text>
            <Text style={styles.mainTitleText}>책장</Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('OurTownPage');
            }}
            style={styles.subTitleBtn}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'SCDream6',
                top: 5,
                color: 'grey',
              }}>
              더보기{'>'}
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
            <Text style={{ fontSize: 20, fontFamily: 'SCDream5' }}>
              새로 등록된 도서
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OurTownPage');
              }}
              style={styles.subTitleBtn}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'SCDream6',
                  top: 5,
                  color: 'grey',
                }}>
                더보기{'>'}
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.newBooksScroll}>
            {posts.map((post, i) => {
              return (
                <OurTownComponent key={i} navigation={navigation} post={post} />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <FlatList
        style={{ borderWidth: 2 }}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <Button
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddPage')}>
        <Ionicons name={'add'} size={30} style={{ color: 'white' }} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  mainTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: diviceWidth,
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 20,
    backgroundColor: '#F7F6FF',
  },
  mainTitleText: {
    fontSize: 24,
    fontFamily: 'SCDream6',
    marginBottom: 5,
  },
  ourTown: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#F7F6FF',
  },
  subTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: diviceWidth,
    height: 40,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  newBooksScroll: {
    height: 180,
    marginBottom: 20,
  },
  subTitleBtn: {
    width: 50,
    height: 30,
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
  loader: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
