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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { changeComment, deleteComment } from '../../config/PostingApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CommentBubbleComponent({ post, download }) {
  const [text, setText] = useState(post.contents);
  const [commentChanger, setCommentChanger] = useState(false);
  const [myEmail, setMyEmail] = useState();

  const checkEmail = async () => {
    const result = await AsyncStorage.getItem('email');
    setMyEmail(result);
  };

  useEffect(() => {
    checkEmail();
    // console.log(post);
  }, []);

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
    <Pressable
      onPress={() => {
        // console.log(post.contents);
      }}>
      <View style={styles.bubbleBox}>
        <View style={styles.userImgBox}>
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
        </View>
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
    </Pressable>
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
});
