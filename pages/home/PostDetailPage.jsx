import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { Header, Image, Tooltip } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import Swiper from 'react-native-swiper-hooks';
import CommentBubbleComponent from '../../components/home/CommentBubbleComponent';
import { deletePost, postComment, postDetail } from '../../config/PostingApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function PostDetailPage({ navigation, route }) {
  const detailData = route.params;

  const [data, setData] = useState([]);
  const [ready, setReady] = useState(true);

  const image = { uri: detailData.image };

  const [comment, setComment] = useState('');

  const [bubbles, setBubbles] = useState();

  const leaveComment = async () => {
    if (comment == '') {
      alert('댓글 내용을 작성해 주세요!');
      return;
    }
    await postComment(comment, detailData.id);
    setComment('');
    download();
  };

  const download = async () => {
    const res = await postDetail(detailData.id);
    setBubbles(res.comments);
    setData(res);
    setReady(false);
  };

  useEffect(() => {
    download();
  }, []);

  return ready ? (
    <ActivityIndicator
      style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
      size='large'
      color='grey'
    />
  ) : (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ImageBackground
        source={image}
        blurRadius={3}
        style={styles.imageBackground}
        imageStyle={{ opacity: 0.3 }}>
        <KeyboardAvoidingView behavior='position'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header
              barStyle='light-content'
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                alignSelf: 'center',
              }}
              leftComponent={
                <Ionicons
                  onPress={() => {
                    navigation.goBack();
                  }}
                  name={'chevron-back'}
                  size={27}
                  color={'white'}
                />
              }
              centerComponent={''}
              rightComponent={
                <Ionicons
                  name={'open-outline'}
                  size={27}
                  color={'white'}
                  style={{ marginHorizontal: 10 }}
                />
              }
            />
            <Swiper
              height={340}
              width={210}
              showPagination={true}
              paginationSelectedColor={'#438732'}
              paginationPosition={'bottom'}
              autoplay={false}
              loop={false}
              paginationSelectedSize={8}
              outerContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 40,
                marginTop: 20,
              }}>
              <View style={styles.bookImageBox}>
                <Image
                  style={styles.bookImage}
                  resizeMode='cover'
                  source={{ uri: detailData.image }}
                />
              </View>
              <View style={styles.bookImageBox}>
                <Image
                  style={styles.bookImage}
                  resizeMode='contain'
                  source={{ uri: detailData.captureImages[0] }}
                />
              </View>
              {detailData.captureImages[1] ? (
                <View style={styles.bookImageBox}>
                  <Image
                    style={styles.bookImage}
                    resizeMode='contain'
                    source={{ uri: detailData.captureImages[1] }}
                  />
                </View>
              ) : null}
              {detailData.captureImages[2] ? (
                <View style={styles.bookImageBox}>
                  <Image
                    style={styles.bookImage}
                    resizeMode='contain'
                    source={{ uri: detailData.captureImages[2] }}
                  />
                </View>
              ) : null}
            </Swiper>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{
                      height: 55,
                      width: 55,
                      borderRadius: 100,
                      marginRight: 15,
                    }}
                    resizeMode='cover'
                    source={{ uri: data.townBook.user.image }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: 'SCDream7',
                        marginBottom: 5,
                      }}>
                      {data.townBook.user.username}
                    </Text>
                    <Text style={{ fontSize: 13, fontFamily: 'SCDream5' }}>
                      {data.townBook.user.town}
                    </Text>
                  </View>
                </View>
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
                          navigation.pop();
                          navigation.navigate('PostFixPage', detailData);
                        }}>
                        <Text style={styles.tooltipText}>수정</Text>
                      </Pressable>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: 'white',
                          width: 100,
                        }}></View>
                      <Pressable
                        style={styles.tooltipBtn}
                        onPress={() => {
                          deletePost(detailData.id, navigation);
                          alert('게시글을 삭제했습니다!');
                        }}>
                        <Text style={styles.tooltipText}>삭제</Text>
                      </Pressable>
                    </>
                  }>
                  <Ionicons
                    name={'ellipsis-vertical'}
                    color={'black'}
                    size={27}
                  />
                </Tooltip>
              </View>
              <View style={styles.descMiddleBorder}></View>
              <Text style={styles.bookCate}>#{detailData.category}</Text>
              <Text style={styles.bookTitle} numberOfLines={2}>
                {detailData.title}
              </Text>
              <Text style={styles.bookAuthor}>{detailData.author}</Text>
              <View style={styles.descMiddleBorder}></View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.subTitle}>도서상태</Text>
                <View style={styles.bookStatusBadge}>
                  <Text
                    style={{
                      fontFamily: 'SCDream5',
                      fontSize: 18,
                      color: '#54b65e',
                      top: 1,
                    }}>
                    {detailData.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.bookDesc}>{detailData.contentInfo}</Text>
              <View style={styles.descMiddleBorder}></View>
              <Text style={styles.subTitle}>작품소개</Text>
              <Text style={styles.bookDesc}>{detailData.description}</Text>
              {/* <Text style={{ textAlign: 'right' }}>하이퍼링크</Text> */}
              <View style={styles.descMiddleBorder}></View>
              <Text style={styles.subTitle}>댓글</Text>

              <View style={styles.commentBox}>
                {bubbles ? (
                  <>
                    {bubbles.map((post, i) => {
                      return (
                        <CommentBubbleComponent
                          key={i}
                          post={post}
                          download={download}
                        />
                      );
                    })}
                  </>
                ) : null}

                <View style={styles.commentInputBox}>
                  <TextInput
                    style={styles.commentInput}
                    onChangeText={setComment}
                    value={comment}
                    placeholder='| 이 책에 대한 가치를 같이 나눠봐요.'
                    placeholderTextColor={'white'}
                  />
                  <Pressable onPress={leaveComment} style={styles.commentBtn}>
                    <Text style={styles.commentBtnText}>입력</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
          {/* <Pressable
            style={styles.chatBox}
            onPress={() => {
              navigation.navigate('ChatPage');
            }}>
            <Text style={styles.chatBtnText}>가치 교환하기</Text>
          </Pressable> */}
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  bookImageBox: {
    height: 300,
    width: 210,
    borderRadius: 5,
    marginBottom: 50,
  },
  bookImage: {
    height: '100%',
    width: 210,
    borderRadius: 5,
    alignSelf: 'center',
  },
  container: {
    width: diviceWidth,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    paddingBottom: 80,
  },
  descMiddleBorder: {
    width: diviceWidth * 0.95,
    height: 5,
    backgroundColor: '#f3f3f3',
    alignSelf: 'center',
    marginVertical: 15,
  },
  subTitle: { fontSize: 20, fontWeight: '700' },
  chatBox: {
    width: diviceWidth,
    height: 70,
    backgroundColor: '#438732',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  chatBtnText: {
    fontSize: 18,
    fontFamily: 'SCDream5',
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
  bookCate: { fontFamily: 'SCDream2', fontSize: 12, marginBottom: 5 },
  bookTitle: { fontFamily: 'SCDream7', fontSize: 18, marginBottom: 5 },
  bookAuthor: { fontFamily: 'SCDream4', fontSize: 12 },
  subTitle: { fontFamily: 'SCDream7', fontSize: 14 },
  bookDesc: { fontSize: 13, lineHeight: 20, marginVertical: 15 },
  bookStatusBadge: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: '#54b65e',
    backgroundColor: 'white',
    borderWidth: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  commentBox: {
    backgroundColor: '#E5E9E4',
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  commentInputBox: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#438732',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    margin: 15,
  },
  commentInput: {
    height: '100%',
    width: '80%',
    fontSize: 14,
    paddingHorizontal: 15,
  },
  commentBtn: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentBtnText: { fontFamily: 'SCDream4', fontSize: 13, color: 'white' },
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
