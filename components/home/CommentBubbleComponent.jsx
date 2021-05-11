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

import { Tooltip } from 'react-native-elements';
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
  }, []);

  const fixComment = async () => {
    await changeComment(post.commentId, text);
    setCommentChanger(false);
    download();
  };

  const delComment = async () => {
    await deleteComment(post.commentId);
    download();
  };

  return (
    <Pressable
      onPress={() => {
        console.log(post.email);
      }}>
      <View style={styles.bubbleBox}>
        <View style={styles.userImgBox}>
          <Image
            style={styles.userImg}
            resizeMode='cover'
            source={{
              uri: post.image,
            }}
          />
        </View>
        <View style={styles.commentBox}>
          {commentChanger ? (
            <TextInput
              style={[
                styles.commentText,
                {
                  borderBottomWidth: 2,
                  paddingBottom: 3,
                  borderColor: 'lightgrey',
                },
              ]}
              onChangeText={setText}
              value={text}
              placeholder='수정할 내용을 작성해 주세요'
              placeholderTextColor={'#757575'}
            />
          ) : (
            <Text style={styles.commentText}>{post.contents}</Text>
          )}
          <View style={styles.optionBox}>
            <Text style={styles.commentText}>by. {post.username} </Text>
            <View style={{ flexDirection: 'row' }}>
              {/* <Text style={styles.dataText}>2021.04.29 </Text> */}
              {post.email == myEmail ? (
                <Tooltip
                  withOverlay={false}
                  containerStyle={{
                    height: 60,
                    backgroundColor: '#438732',
                  }}
                  pointerColor={'#438732'}
                  popover={
                    <>
                      <Pressable
                        style={styles.tooltipBtn}
                        onPress={() => {
                          setCommentChanger(true);
                        }}>
                        <Text style={styles.tooltipText}>수정</Text>
                      </Pressable>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: 'white',
                          width: 100,
                        }}></View>
                      <Pressable style={styles.tooltipBtn} onPress={delComment}>
                        <Text style={styles.tooltipText}>삭제</Text>
                      </Pressable>
                    </>
                  }>
                  {commentChanger ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        onPress={() => {
                          setCommentChanger(false);
                        }}
                        style={[
                          styles.dataText,
                          { color: 'black', marginLeft: 10 },
                        ]}>
                        취소
                      </Text>
                      <Text
                        onPress={fixComment}
                        style={[
                          styles.dataText,
                          { color: 'black', marginLeft: 10 },
                        ]}>
                        수정하기
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.dataText}> 수정/삭제</Text>
                  )}
                </Tooltip>
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
  tooltipBtn: {
    width: 100,
    height: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    fontFamily: 'SCDream5',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});
