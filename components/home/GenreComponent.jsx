import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
  LogBox,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { delScrapBook, postScrapBook } from '../../config/MyPageApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function GenreComponent({
  navigation,
  post,
  scrapList,
  userCheck,
  myEmail,
}) {
  LogBox.ignoreLogs(['Warning: ...']);

  const [modalVisible, setModalVisible] = useState(false);

  const bookMark = async () => {
    await postScrapBook(post.id);
    await userCheck();
  };

  const delBookMark = async () => {
    await delScrapBook(post.id);
    await userCheck();
  };

  return (
    <Pressable
      style={styles.cardBox}
      onPress={() => {
        // navigation.navigate('PostDetailPage', post);
        setModalVisible(!modalVisible);
      }}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBox}>
          <ScrollView
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}>
            <Ionicons
              name={'close'}
              onPress={() => setModalVisible(!modalVisible)}
              size={25}
              style={{ alignSelf: 'flex-end', color: 'grey' }}
            />
            <Image
              style={styles.cardModalImage}
              resizeMode='cover'
              source={
                post.image
                  ? { uri: post.image }
                  : require('../../assets/splash.png')
              }
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  fontFamily: 'SansMedium',
                  fontSize: 12,
                  color: '#4CB73B',
                  marginVertical: 10,
                  includeFontPadding: false,
                }}>
                #{post.category}
              </Text>
              <Text numberOfLines={2} style={styles.modalTitle}>
                {post.title}
              </Text>
              <View>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'SansRegular',
                    fontSize: 13,
                    includeFontPadding: false,
                  }}>
                  {post.author} 지음 |
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'SansRegular',
                    fontSize: 13,
                    includeFontPadding: false,
                  }}>
                  {post.publisher} 출판
                </Text>
              </View>
            </View>
            <View style={styles.postedBox}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.userImgShadow}>
                  <Image
                    style={styles.userImg}
                    resizeMode='cover'
                    source={
                      post.user.image
                        ? { uri: post.user.image }
                        : require('../../assets/userimg.png')
                    }
                  />
                </View>
                <View style={styles.postedTextBox}>
                  <Text style={styles.status}>상태 | {post.status}</Text>
                  <Text style={styles.postedBy}>{post.user.username}</Text>
                  <Text style={styles.postedTown}>{post.user.town}</Text>
                </View>
                {post.user.email == myEmail ? null : (
                  <>
                    {scrapList.includes(post.id) ? (
                      <Ionicons
                        name={'bookmark'}
                        onPress={delBookMark}
                        size={25}
                        style={[styles.innerScrap, { color: 'green' }]}
                      />
                    ) : (
                      <Ionicons
                        name={'bookmark-outline'}
                        onPress={bookMark}
                        size={25}
                        style={[styles.innerScrap, { color: 'white' }]}
                      />
                    )}
                  </>
                )}
              </View>
              <Pressable
                style={styles.goBtn}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('PostDetailPage', post);
                }}>
                <Text
                  style={{
                    fontFamily: 'SansBold',
                    fontSize: 16,
                    color: 'white',
                    includeFontPadding: false,
                  }}>
                  가치 교환하기
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.card}>
        <View style={styles.cardFlex}>
          <Image
            style={styles.cardImage}
            resizeMode='cover'
            source={
              post.image
                ? { uri: post.image }
                : require('../../assets/splash.png')
            }
          />
          <View style={styles.cardTitleBox}>
            <View style={{ justifyContent: 'space-between' }}>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: diviceWidth * 0.6,
                  fontFamily: 'SansMedium',
                  fontSize: 14,
                  includeFontPadding: false,
                }}>
                {post.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'SansRegular',
                  fontSize: 13,
                  marginTop: 5,
                  includeFontPadding: false,
                }}>
                {post.author}
              </Text>
            </View>
            {post.finish == 0 ? (
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'SansRegular',
                  fontSize: 12,
                  includeFontPadding: false,
                }}>
                {post.town}
              </Text>
            ) : (
              <View style={styles.doneBox}>
                <Text style={styles.done}>교환완료</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {post.user.email == myEmail ? null : (
        <>
          {scrapList.includes(post.id) ? (
            <Ionicons
              name={'bookmark'}
              onPress={delBookMark}
              size={25}
              style={[styles.scrap, { color: 'green' }]}
            />
          ) : (
            <Ionicons
              name={'bookmark-outline'}
              onPress={bookMark}
              size={25}
              style={[styles.scrap, { color: 'gray' }]}
            />
          )}
        </>
      )}
      <View style={styles.bottomBorder}></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    marginHorizontal: 20,
  },
  bottomBorder: {
    height: 4,
    backgroundColor: '#F3F3F3',
  },
  card: {
    height: 95,
    marginVertical: 20,
  },
  cardFlex: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cardTitleBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingVertical: 10,
  },
  scrap: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '60%',
  },
  innerScrap: {
    position: 'absolute',
    top: 10,
    left: '90%',
  },
  cardModalImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  modalBox: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    width: diviceWidth,
    height: diviceHeight * 0.75,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  modalTitle: {
    fontFamily: 'SansBold',
    fontSize: 16,
    maxWidth: '70%',
  },
  postedBox: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#4CB73B',
    padding: 20,
    marginTop: 20,
  },
  userImg: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#e5e5e5',
  },
  userImgShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  postedTextBox: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  status: {
    fontFamily: 'SansBold',
    fontSize: 18,
    color: 'white',
    includeFontPadding: false,
  },
  postedBy: {
    fontFamily: 'SansExtra',
    fontSize: 14,
    color: 'white',
    includeFontPadding: false,
  },
  postedTown: {
    fontFamily: 'SansMedium',
    fontSize: 14,
    color: 'white',
    includeFontPadding: false,
  },
  goBtn: {
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1ea608',
    paddingVertical: 3,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  doneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 80,
    borderRadius: 15,
    backgroundColor: '#54B65E',
    marginTop: 10,
  },
  done: {
    fontFamily: 'SansMedium',
    fontSize: 12,
    color: 'white',
  },
});
