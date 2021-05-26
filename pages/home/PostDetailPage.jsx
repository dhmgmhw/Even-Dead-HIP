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
  Share,
  Platform,
} from 'react-native';
import { Image, Tooltip, Overlay } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import Swiper from 'react-native-swiper-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageBlurLoading from 'react-native-image-blur-loading';
import * as Linking from 'expo-linking';
import SockJS from 'sockjs-client';

import CommentBubbleComponent from '../../components/home/CommentBubbleComponent';
import { deletePost, postComment, postDetail } from '../../config/PostingApi';
import { Grid } from 'native-base';
import { Alert } from 'react-native';
import { getUserProfile } from '../../config/BackData';
import { delScrapBook, postScrapBook } from '../../config/MyPageApi';
import { makingChatRoom } from '../../config/SocketApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function PostDetailPage({ navigation, route }) {
  const detailData = route.params;

  const [myInfo, setMyInfo] = useState();
  const [myEmail, setMyEmail] = useState();
  const [scrapList, setScrapList] = useState([]);

  const [data, setData] = useState([]);
  const [ready, setReady] = useState(true);
  const [onPageLoader, setOnPageLoader] = useState(false);

  const image = { uri: detailData.image };
  const [comment, setComment] = useState('');

  const [bubbles, setBubbles] = useState();

  const [visible, setVisible] = useState(false);
  const [delVisible, setDelVisible] = useState(false);

  const [innerImg, setInnerImg] = useState();

  const [description, setDescription] = useState('');

  const [tooltipControl, setTooltipControl] = useState(true);

  const bookMark = async () => {
    await postScrapBook(detailData.id);
    await userCheck();
  };

  const delBookMark = async () => {
    await delScrapBook(detailData.id);
    await userCheck();
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const delToggle = () => {
    setDelVisible(!delVisible);
  };

  const leaveComment = async () => {
    setOnPageLoader(true);
    if (comment == '') {
      alert('댓글 내용을 작성해 주세요!');
      return;
    }
    await postComment(comment, detailData.id);
    setComment('');
    download();
    setOnPageLoader(false);
  };

  const download = async () => {
    const res = await postDetail(detailData.id);
    setDescription(res.townBook.contentInfo);
    setBubbles(res.comments);
    setData(res);
    setReady(false);
  };

  const userCheck = async () => {
    const myInfo = await getUserProfile();
    setScrapList(myInfo.results.scrapList);
    setMyEmail(myInfo.results.email);
    setMyInfo(myInfo.results);
  };

  const makeChat = async () => {
    const roomInfo = await makingChatRoom(
      myEmail,
      detailData.user.email,
      detailData
    );
    navigation.push('ChatPage', [myInfo, roomInfo]);
  };

  const share = () => {
    Share.share({
      message: `${detailData.publisher} | ${detailData.author} \n ${description} \n ${detailData.description} \n\n Daum 책 검색결과\n ${detailData.webUrl}`,
    });
  };

  const hyperLink = (link) => {
    Linking.openURL(link);
  };

  useEffect(() => {
    console.log(detailData);
    const unsubscribe = navigation.addListener('focus', () => {
      download();
      userCheck();
      setTooltipControl(true);
    });
    return unsubscribe;
  }, [navigation]);

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
        blurRadius={1}
        style={styles.imageBackground}
        imageStyle={{ opacity: 0.3 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar style='light' />
            <View style={styles.statusAvoid}></View>
            <View style={styles.mainHeader}>
              <View style={styles.headerLComp}>
                <Ionicons
                  onPress={() => {
                    navigation.goBack();
                  }}
                  name={'chevron-back'}
                  size={27}
                  color={'white'}
                />
              </View>
              <View style={styles.headerCComp}></View>
              <View style={styles.headerRComp}>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons
                    name={'open-outline'}
                    size={27}
                    color={'white'}
                    style={{ marginHorizontal: 10 }}
                    onPress={share}
                  />
                  {tooltipControl ? (
                    <>
                      {detailData.user.email == myEmail ? (
                        <Tooltip
                          withOverlay={false}
                          containerStyle={{
                            height: 130,
                            backgroundColor: '#438732',
                          }}
                          pointerColor={'#438732'}
                          popover={
                            <>
                              <Pressable
                                style={styles.tooltipBtn}
                                onPress={() => {
                                  setTooltipControl(false);
                                  navigation.navigate(
                                    'PostFixPage',
                                    detailData
                                  );
                                }}>
                                <Text style={styles.tooltipText}>수정</Text>
                              </Pressable>
                              <Pressable
                                style={styles.tooltipBtn}
                                onPress={() => {
                                  deletePost(detailData.id, navigation);
                                  alert('게시글을 삭제했습니다!');
                                }}>
                                <Text style={styles.tooltipText}>삭제</Text>
                              </Pressable>
                              {data.townBook.finish === 1 ? null : (
                                <Pressable
                                  style={styles.tooltipBtn}
                                  onPress={() => {
                                    if (bubbles == '') {
                                      Alert.alert('교환할 상대가 없습니다');
                                      return;
                                    } else {
                                      setTooltipControl(false);
                                      navigation.navigate('TradeSelectPage', [
                                        detailData,
                                        bubbles,
                                      ]);
                                    }
                                  }}>
                                  <Text style={styles.tooltipText}>
                                    거래완료
                                  </Text>
                                </Pressable>
                              )}
                            </>
                          }>
                          <Ionicons
                            name={'ellipsis-vertical'}
                            color={'white'}
                            size={27}
                          />
                        </Tooltip>
                      ) : null}
                    </>
                  ) : null}
                </View>
              </View>
            </View>
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
                  PlaceholderContent={<ActivityIndicator />}
                  source={
                    detailData.image
                      ? { uri: detailData.image }
                      : require('../../assets/splash.png')
                  }
                />
              </View>
              <Grid style={styles.bookImageBox}>
                {detailData.captureImages.map((photo, i) => {
                  return (
                    <Pressable
                      key={i}
                      onPress={() => {
                        toggleOverlay();
                        setInnerImg(photo);
                      }}>
                      <ImageBlurLoading
                        style={styles.InnerBookImage}
                        resizeMode='cover'
                        source={{ uri: photo }}
                        thumbnailSource={{ uri: photo }}
                        withIndicator
                      />
                      <Overlay
                        isVisible={visible}
                        onBackdropPress={toggleOverlay}>
                        <ImageBlurLoading
                          style={styles.overlayImage}
                          resizeMode='contain'
                          source={{ uri: innerImg }}
                          thumbnailSource={{ uri: photo }}
                          withIndicator
                        />
                      </Overlay>
                    </Pressable>
                  );
                })}
              </Grid>
            </Swiper>
            <View style={styles.container}>
              <Overlay isVisible={delVisible} onBackdropPress={delToggle}>
                <Text>Hello from Overlay!</Text>
              </Overlay>
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
                    source={
                      data.townBook.user.image
                        ? { uri: data.townBook.user.image }
                        : require('../../assets/userimg.png')
                    }
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: 'SansExtra',
                        marginBottom: 5,
                      }}>
                      {data.townBook.user.username}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'SansMedium',
                        color: '#828282',
                      }}>
                      {data.townBook.user.town}
                    </Text>
                  </View>
                </View>
                {detailData.user.email == myEmail ? null : (
                  <>
                    {scrapList.includes(detailData.id) ? (
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
              </View>
              <View style={styles.descMiddleBorder}></View>
              <Text style={styles.bookCate}>#{detailData.category}</Text>
              <Text style={styles.bookTitle} numberOfLines={2}>
                {detailData.title}
              </Text>
              <Text style={styles.bookAuthor}>
                {detailData.publisher} | {detailData.author}
              </Text>
              <View style={styles.descMiddleBorder}></View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.subTitle}>상태 |</Text>
                <View style={styles.bookStatusBadge}>
                  <Text style={styles.statusBadge}>{detailData.status}</Text>
                </View>
              </View>
              <Text style={styles.bookDesc}>{description}</Text>
              <View style={styles.descMiddleBorder}></View>
              <Text style={styles.subTitle}>작품소개</Text>
              <Text style={styles.bookDesc}>{detailData.description}</Text>
              <Text
                style={styles.hyperLink}
                onPress={() => hyperLink(detailData.webUrl)}>
                Daum 책 자세히보기
              </Text>
              <View style={styles.descMiddleBorder}></View>
              <Text style={styles.subTitle}>가치 나누기</Text>
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
        </KeyboardAvoidingView>
        {detailData.user.email == myEmail ? null : (
          <Pressable
            style={
              data.townBook.finish === 1
                ? styles.chatBox
                : [styles.chatBox, { backgroundColor: '#4CB73B' }]
            }
            onPress={() => {
              {
                data.townBook.finish === 1 ? null : makeChat();
              }
            }}>
            <Text style={styles.chatBtnText}>가치 교환하기</Text>
          </Pressable>
        )}
        {onPageLoader ? (
          <ActivityIndicator
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '50%',
            }}
            size='large'
            color='grey'
          />
        ) : null}
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
    flexWrap: 'wrap',
  },
  bookImage: {
    height: 300,
    width: 210,
    borderRadius: 5,
    alignSelf: 'center',
  },
  InnerBookImage: {
    height: 105,
    width: 105,
    borderWidth: 1,
  },
  overlayImage: {
    height: diviceWidth,
    width: diviceWidth,
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
  chatBox: {
    width: diviceWidth,
    height: 70,
    backgroundColor: '#ADADAD',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  chatBtnText: {
    fontSize: 18,
    fontFamily: 'SansBold',
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
  bookCate: {
    fontFamily: 'SansMedium',
    fontSize: 12,
    marginBottom: 5,
    color: '#4CB73B',
  },
  bookTitle: { fontFamily: 'SansExtra', fontSize: 20, marginBottom: 5 },
  bookAuthor: { fontFamily: 'SansThin', fontSize: 12, color: '#828282' },
  bookDesc: {
    fontFamily: 'SansRegular',
    fontSize: 13,
    lineHeight: 20,
    marginVertical: 15,
  },
  hyperLink: {
    textAlign: 'right',
    fontFamily: 'SansThin',
    fontSize: 12,
  },
  subTitle: { fontSize: 16, fontFamily: 'SansBold', color: '#4CB73B' },
  bookStatusBadge: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 100,
    borderColor: '#54b65e',
    backgroundColor: 'white',
    borderWidth: 3,
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
  statusBadge: {
    fontFamily: 'SansBold',
    fontSize: 18,
    color: '#54b65e',
    position: 'absolute',
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
    backgroundColor: '#4CB73B',
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
    height: 40,
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
  doneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 80,
    borderRadius: 15,
    backgroundColor: '#54B65E',
    top: 5,
    alignSelf: 'flex-end',
  },
  done: {
    fontFamily: 'SansMedium',
    fontSize: 12,
    color: 'white',
  },
  statusAvoid: {
    height: getStatusBarHeight(),
  },
  mainHeader: {
    width: diviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
  },
  headerLComp: {
    height: 45,
    width: diviceWidth / 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerCComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
  },
  headerRComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});
