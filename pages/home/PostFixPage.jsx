import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { Item } from 'native-base';

import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons } from '@expo/vector-icons';
import { getSearchBook } from '../../config/KakaoApi';
import KakaoResultCardComponent from '../../components/home/KakaoResultCardComponent';
import { uploadImg, updatePost } from '../../config/PostingApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function PostFixPage({ navigation, route }) {
  const bookHerit = route.params;
  const [text, setText] = useState();

  // upload datas
  const [title, setTitle] = useState(bookHerit.title);
  const [author, setAuthor] = useState(bookHerit.author);
  const [bookImg, setBookImg] = useState(bookHerit.image);
  const [story, setStory] = useState(bookHerit.description);
  const [publisher, setPublisher] = useState(bookHerit.publisher);
  const [imageUri, setImageUri] = useState(bookHerit.captureImages);
  const [genreInfo, setGenreInfo] = useState(bookHerit.category);
  const [stateInfo, setStateInfo] = useState(bookHerit.status);
  const [publishedInfo, setPublishedInfo] = useState('');
  const [contentInfo, setContentInfo] = useState(bookHerit.contentInfo);
  const [priceInfo, setPriceInfo] = useState(bookHerit.price);
  const [webUrl, setWebUrl] = useState(bookHerit.webUrl);

  const [switcher, setSwitcher] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderHeight, setFinderHeight] = useState(false);

  const [books, setBooks] = useState(['blank']);

  const makePerfectSentence = (str = '') =>
    str.slice(0, str.lastIndexOf('.') + 1) || '작품 소개가 없습니다.';

  const toggleFinder = () => {
    setFinderOpen(!finderOpen);
  };

  const dateChagner = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    return `${year}년 ${month}월`;
  };

  const bookTitleSearch = async () => {
    const result = await getSearchBook(text);
    setBooks(result.documents);
    setFinderHeight(true);
    Keyboard.dismiss();
  };

  const update = async () => {
    console.log('수정 준비중!');
    if (title == '') {
      Alert.alert('수정할 책을 선택해 주세요');
      return;
    } else if (genreInfo == '') {
      Alert.alert('수정할 해쉬태그를 선택해 주세요');
      return;
    } else if (stateInfo == '') {
      Alert.alert('수정할 책의 상태를 선택해 주세요');
      return;
      // } else if (imageUri == '') {
      //   Alert.alert('수정할 사진을 최소 한 장 선택해 주세요');
      //   return;
    } else if (contentInfo == '') {
      Alert.alert('수정할 책을 간단히 소개해 주세요');
      return;
    } else {
      let data = {
        title: title,
        image: bookImg,
        publisher: publisher,
        webUrl: webUrl,
        author: author,
        description: story,
        category: genreInfo,
        status: stateInfo,
        price: priceInfo,
        contentInfo: contentInfo,
      };
      // const formData = new FormData();
      // for (let i = 0; i < imageUri.length; i++) {
      //   formData.append('files', {
      //     uri: imageUri[i].uri,
      //     name: 'image' + i + '.jpg',
      //   });
      // }
      // const imgList = await uploadImg(formData);
      // data.captureImages = imgList;
      data.captureImages = [
        'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F19422E4C50D99D0E16',
        'http://topclass.chosun.com/news_img/1807/1807_008.jpg',
      ];
      // console.log(data);
      await updatePost(data, bookHerit.id);
      navigation.pop();
    }
  };

  useEffect(() => {
    // console.log(bookHerit);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{ backgroundColor: 'white', height: diviceHeight }}>
        <Header
          containerStyle={{
            backgroundColor: 'white',
            alignSelf: 'center',
            borderBottomWidth: 1,
          }}
          leftComponent={
            <Text
              onPress={() => {
                navigation.pop();
              }}
              style={styles.headerTitle}>
              취소
            </Text>
          }
          centerComponent={<Text style={styles.headerTitle}>등록글 수정</Text>}
          rightComponent={
            <Text
              onPress={update}
              style={[styles.headerTitle, { color: '#6864FF' }]}>
              수정
            </Text>
          }
        />
        <View style={styles.bookResBox}>
          <View style={styles.bookResImgBox}>
            <Image
              style={styles.bookResImg}
              resizeMode='cover'
              source={
                bookImg ? { uri: bookImg } : require('../../assets/nodata.png')
              }
            />
          </View>
          <View style={{ width: diviceWidth * 0.65 }}>
            <View style={styles.bookResTitleBox}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.bookResText}>
                {title}
              </Text>
              <Ionicons
                active
                onPress={toggleFinder}
                name='close-circle-outline'
                size={20}
                style={{ paddingRight: 5, color: 'grey' }}
              />
            </View>
            <View style={styles.bookResBorder}></View>
            <View style={styles.bookResDescBox}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.bookResText}>
                {author} 저 | {publisher} | {dateChagner(publishedInfo)}
              </Text>
            </View>
          </View>
        </View>

        <DropDownPicker
          items={[
            { label: '#소설', value: '소설' },
            { label: '#문학', value: '문학' },
            { label: '#인문', value: '인문' },
            { label: '#경제/경영', value: '경제/경영' },
            { label: '#정치/사회', value: '정치/사회' },
            { label: '#과학', value: '과학' },
            { label: '#예술', value: '예술' },
            { label: '#역사', value: '역사' },
            { label: '#철학', value: '철학' },
            { label: '#종교', value: '종교' },
            { label: '#어린이', value: '어린이' },
            { label: '#청소년', value: '청소년' },
            { label: '#취업/수험서', value: '취업/수험서' },
            { label: '#언어', value: '언어' },
            { label: '#해외도서', value: '해외도서' },
            { label: '#기타', value: '기타' },
          ]}
          showArrow={false}
          labelStyle={{ fontFamily: 'SCDream5' }}
          placeholder='해쉬태그'
          containerStyle={styles.dropBox}
          onChangeItem={(item) => {
            setGenreInfo(item.value);
          }}
        />
        <DropDownPicker
          items={[
            { label: 'S', value: 'S' },
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
          ]}
          showArrow={false}
          zIndex={4000}
          labelStyle={{ fontFamily: 'SCDream5' }}
          placeholder='상품상태'
          containerStyle={styles.dropBox}
          onChangeItem={(item) => {
            setStateInfo(item.value);
          }}
        />
        <View style={styles.addPicsBox}>
          {imageUri == '' ? (
            <></>
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}>
              {imageUri.map((image, i) => {
                return (
                  <Pressable
                    key={i}
                    onPress={() => {
                      navigation.navigate('MultiAddPage', setImageUri);
                    }}>
                    <Image source={{ uri: image }} style={styles.userPicBox} />
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>
        <TextInput
          multiline
          style={styles.bookDescBox}
          onChangeText={setContentInfo}
          value={contentInfo}
          placeholder='| 도서내용과 상태를 작성해주세요'
          placeholderTextColor={'#757575'}
        />
        <Overlay
          overlayStyle={
            finderHeight ? styles.overlayBoxWith : styles.overlayBoxWithout
          }
          isVisible={finderOpen}
          onBackdropPress={toggleFinder}>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#6864FF',
              marginBottom: 20,
            }}>
            <Item>
              <TextInput
                style={styles.bookTitleBox}
                onChangeText={setText}
                value={text}
                placeholder='도서명 입력하기'
              />
              <View style={styles.bookSearchBtn}>
                <Ionicons
                  active
                  onPress={bookTitleSearch}
                  name='search'
                  size={20}
                  style={{ alignSelf: 'center' }}
                />
              </View>
            </Item>
          </View>
          <View style={{ height: '90%' }}>
            {books == '' ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  style={styles.foundImg}
                  resizeMode='contain'
                  source={require('../../assets/nodata.png')}
                />
              </View>
            ) : (
              <ScrollView>
                {books.map((book, i) => {
                  return (
                    <Pressable
                      key={i}
                      onPress={() => {
                        setTitle(book.title);
                        setAuthor(book.authors.join(' '));
                        setBookImg(book.thumbnail);
                        setStory(makePerfectSentence(book.contents));
                        setPublisher(book.publisher);
                        setPublishedInfo(book.datetime);
                        setPriceInfo(book.price);
                        setFinderOpen(false);
                        setSwitcher(true);
                        setWebUrl(book.url);
                      }}>
                      <KakaoResultCardComponent book={book} />
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </Overlay>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 14,
    paddingHorizontal: 10,
    fontFamily: 'SCDream5',
  },
  container: { backgroundColor: 'white' },
  addPicsBox: {
    width: diviceWidth,
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  bookResBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  bookResImgBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  bookResImg: {
    width: 80,
    height: 110,
    margin: 20,
    borderRadius: 5,
  },
  bookResTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 2,
  },
  bookResDescBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 3,
  },
  bookResText: {
    width: diviceWidth * 0.55,
    fontSize: 13,
    fontFamily: 'SCDream5',
    color: 'grey',
  },
  bookResBorder: {
    backgroundColor: '#F2F2F2',
    height: 2,
    marginVertical: 5,
  },
  userPicBox: {
    width: 80,
    height: 80,
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoGuidanceText: {
    fontFamily: 'SCDream5',
    fontSize: 13,
    color: 'grey',
  },
  bookSearchTitle: {
    fontSize: 14,
    fontFamily: 'SCDream6',
    padding: 15,
    paddingVertical: 10,
    marginTop: 20,
  },
  bookSearchOpener: {
    backgroundColor: '#efefef',
    width: diviceWidth,
    height: 45,
    paddingLeft: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayBoxWith: {
    width: diviceWidth * 0.9,
    height: diviceHeight * 0.7,
    padding: 30,
  },
  overlayBoxWithout: {
    width: diviceWidth * 0.9,
    height: diviceHeight * 0.4,
    padding: 30,
  },
  dropBox: { height: 50, width: diviceWidth },
  bookTitleBox: {
    paddingLeft: 20,
    height: 50,
    width: '85%',
  },
  bookDescBox: {
    padding: 10,
    height: 100,
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 14,
  },
  bookSearchBtn: {
    width: '15%',
  },
  foundImg: { width: 200, height: 200, top: 120, opacity: 0.2 },
});