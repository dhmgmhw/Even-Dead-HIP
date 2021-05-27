import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import {
  changeComment,
  deleteComment,
  getUserPosts,
} from '../../config/PostingApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CommentBubbleComponent({ navigation, post, download }) {
  const [text, setText] = useState(post.contents);
  const [commentChanger, setCommentChanger] = useState(false);
  const [myEmail, setMyEmail] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState();

  const checkEmail = async () => {
    const result = await AsyncStorage.getItem('email');
    setMyEmail(result);
  };

  useEffect(() => {
    checkEmail();
  }, []);

  const userPosts = async () => {
    setModalVisible(!modalVisible);
    const lists = await getUserPosts(post.email);
    setPosts(lists);
  };

  const fixComment = async () => {
    if (text === post.contents) {
      Alert.alert('수정할 내용을 작성해주세요');
      return;
    }
    await changeComment(post.commentId, text);
    setCommentChanger(false);
    download();
  };

  const delComment = async () => {
    await deleteComment(post.commentId);
    setCommentChanger(false);
    download();
  };

  return (
    <View>
      <View style={styles.bubbleBox}>
        <Pressable onPress={userPosts} style={styles.userImgBox}>
          <Image
            style={styles.userImg}
            resizeMode='cover'
            source={
              post.image
                ? {
                    uri: post.image,
                  }
                : require('../../assets/userimg.png')
            }
          />
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
                        uri: post.image,
                      }}
                    />
                  </View>
                  <Text numberOfLines={2} style={styles.userName}>
                    {post.username}님의 서재
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
                      게시글이 없습니다.
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </Modal>
        </Pressable>
        <View style={styles.commentBox}>
          {commentChanger ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                style={[
                  styles.commentText,
                  {
                    borderBottomWidth: 2,
                    paddingBottom: 3,
                    borderColor: 'lightgrey',
                    width: '85%',
                  },
                ]}
                onChangeText={setText}
                value={text}
                placeholder='수정할 내용을 작성해 주세요'
                placeholderTextColor={'#757575'}
              />
              <Ionicons
                active
                onPress={fixComment}
                name='checkmark-sharp'
                size={22}
                style={{
                  paddingRight: 5,
                  color: 'grey',
                }}
              />
            </View>
          ) : (
            <Text style={styles.commentText}>{post.contents}</Text>
          )}
          <View style={styles.optionBox}>
            <Text style={styles.commentText}>by. {post.username} </Text>
            <View style={{ flexDirection: 'row' }}>
              {post.email == myEmail ? (
                <>
                  {commentChanger ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        onPress={delComment}
                        style={[
                          styles.dataText,
                          { color: 'red', marginLeft: 10 },
                        ]}>
                        삭제하기
                      </Text>
                      <Text
                        onPress={() => {
                          setCommentChanger(false);
                        }}
                        style={[
                          styles.dataText,
                          { color: 'black', marginLeft: 10 },
                        ]}>
                        돌아가기
                      </Text>
                    </View>
                  ) : (
                    <Text
                      onPress={() => {
                        setCommentChanger(true);
                        setText(post.contents);
                      }}
                      style={styles.dataText}>
                      수정/삭제
                    </Text>
                  )}
                </>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleBox: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  userImgBox: {},
  userImg: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  commentBox: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  commentText: {
    fontSize: 13,
    fontFamily: 'SansThin',
  },
  optionBox: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataText: {
    fontSize: 12,
    fontFamily: 'SansThin',
    color: 'black',
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
