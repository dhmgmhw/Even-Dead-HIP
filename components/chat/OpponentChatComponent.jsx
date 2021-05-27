import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserPosts } from '../../config/PostingApi';
const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function OpponentChatComponent({ message }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState();

  const userPosts = async () => {
    setModalVisible(!modalVisible);
    const lists = await getUserPosts(message.email);
    setPosts(lists);
  };

  return (
    <View style={{ paddingBottom: 10, marginHorizontal: 20 }}>
      <View style={styles.oppositeChatBox}>
        <View style={styles.oppositeUserBox}>
          <Pressable onPress={userPosts}>
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalBox}>
                <View style={styles.userBox}>
                  <Ionicons
                    name={'close'}
                    onPress={() => setModalVisible(!modalVisible)}
                    size={25}
                    style={{ alignSelf: 'flex-end', color: 'white' }}
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.userModalImgBox}>
                      <Image
                        style={styles.userModalImg}
                        resizeMode='cover'
                        source={{
                          uri: message.userProfile,
                        }}
                      />
                    </View>
                    <Text numberOfLines={2} style={styles.userName}>
                      {message.userName}님의 서재
                    </Text>
                  </View>
                </View>
                <ScrollView>
                  {posts ? (
                    <>
                      {posts.map((post, i) => {
                        return (
                          <View key={i}>
                            <Pressable
                              style={styles.cardBox}
                              onPress={() => {
                                setModalVisible(!modalVisible);
                                navigation.push('PostDetailPage', post);
                              }}>
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
                                    <View>
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          fontFamily: 'SCDream6',
                                          fontSize: 13,
                                        }}>
                                        {post.title}
                                      </Text>
                                      <Text
                                        numberOfLines={1}
                                        style={{
                                          fontFamily: 'SCDream3',
                                          fontSize: 13,
                                          marginTop: 10,
                                        }}>
                                        {post.author}
                                      </Text>
                                    </View>
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        fontFamily: 'SCDream3',
                                        fontSize: 12,
                                      }}>
                                      {post.town}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.bottomBorder}></View>
                            </Pressable>
                          </View>
                        );
                      })}
                    </>
                  ) : (
                    <View>
                      <Text
                        style={{
                          fontFamily: 'SansRegular',
                          fontSize: 14,
                          textAlign: 'center',
                          top: 30,
                          color: 'grey',
                        }}>
                        {message.userName}님의 게시글이 없습니다.
                      </Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </Modal>
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                borderWidth: 0.1,
                borderColor: 'grey',
              }}
              resizeMode='cover'
              source={{
                uri: message.userProfile,
              }}
            />
          </Pressable>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>{message.message}</Text>
        </View>
        <Text style={styles.time}>
          {message.timenow.split(' ')[1].substring(0, 5)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  oppositeChatBox: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'SansRegular',
    fontSize: 13,
    marginVertical: 10,
    marginHorizontal: 15,
    includeFontPadding: false,
  },
  oppositeUserBox: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#EEF5ED',
    marginRight: 10,
  },
  textBox: {
    maxWidth: '60%',
    backgroundColor: '#EEF5ED',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  time: {
    marginLeft: 5,
    fontSize: 10,
    fontFamily: 'SansRegular',
    alignSelf: 'flex-end',
    color: 'grey',
  },
  modalBox: {
    borderColor: '#e5e5e5',
    width: diviceWidth,
    height: diviceHeight * 0.9,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  userBox: {
    padding: 20,
    paddingBottom: 40,
    width: diviceWidth,
    backgroundColor: '#4CB73B',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  userName: {
    fontFamily: 'SansBold',
    fontSize: 24,
    color: 'white',
    maxWidth: '70%',
  },
  userModalImgBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 20,
  },
  userModalImg: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
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
    maxWidth: diviceWidth * 0.6,
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
});
