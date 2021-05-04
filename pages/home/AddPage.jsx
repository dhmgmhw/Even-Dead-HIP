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

import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons } from '@expo/vector-icons';
import { getSearchBook } from '../../config/KakaoApi';
import KakaoResultCardComponent from '../../components/home/KakaoResultCardComponent';
import { imageUpload, postBook, testUpload } from '../../config/PostingApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function AddPage({ navigation }) {
  const [text, setText] = useState();

  // upload datas
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState();
  const [bookImg, setBookImg] = useState();
  const [story, setStory] = useState();
  const [publisher, setPublisher] = useState();
  const [imageUri, setImageUri] = useState('');
  const [genreInfo, setGenreInfo] = useState('');
  const [stateInfo, setStateInfo] = useState('');
  const [publishedInfo, setPublishedInfo] = useState();
  const [contentInfo, setContentInfo] = useState('');
  const [priceInfo, setPriceInfo] = useState();

  const [switcher, setSwitcher] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);

  const [books, setBooks] = useState([]);

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
    Keyboard.dismiss();
    console.log(books);
  };

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('사진을 업로드하려면 사진첩 권한이 필요합니다.');
      }
    }
  };

  const pickImage = async () => {
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });
    if (imageData.cancelled) {
      console.log('cancelled!');
      return;
    }
    console.log(imageData);
    await testUpload(imageData);
    setImageUri(imageData);
  };

  const upload = async () => {
    console.log('업로드 준비중!');
    if (title == '') {
      Alert.alert('등록할 책을 선택해 주세요');
      return;
    } else if (genreInfo == '') {
      Alert.alert('해쉬태그를 선택해 주세요');
      return;
    } else if (stateInfo == '') {
      Alert.alert('책의 상태를 선택해 주세요');
      return;
    } else if (imageUri == '') {
      Alert.alert('사진을 최소 한 장 선택해 주세요');
      return;
    } else if (contentInfo == '') {
      Alert.alert('책을 간단히 소개해 주세요');
      return;
    } else {
      let data = {
        title: title,
        author: author,
        image: bookImg,
        description: story,
        category: genreInfo,
        state: stateInfo,
        content: contentInfo,
        price: priceInfo,
      };
      const form = new FormData();
      form.append('image', {
        uri: imageUri.uri,
        type: imageUri.type,
        name: imageUri.uri.substr(imageUri.uri.lastIndexOf('/') + 1),
      });

      console.log(form);
      const response = await imageUpload(form);
      data.capture_images = response;
      await postBook(data, navigation);
    }
  };

  useEffect(() => {
    getPermission();
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
                navigation.goBack();
              }}
              style={styles.headerTitle}>
              취소
            </Text>
          }
          centerComponent={<Text style={styles.headerTitle}>도서등록</Text>}
          rightComponent={
            <Text
              onPress={upload}
              style={[styles.headerTitle, { color: '#6864FF' }]}>
              등록
            </Text>
          }
        />
        {switcher ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowOpacity: 0.25,
                shadowRadius: 5,
              }}>
              <Image
                style={{
                  width: 80,
                  height: 110,
                  margin: 20,
                  borderRadius: 5,
                }}
                resizeMode='cover'
                source={
                  bookImg
                    ? { uri: bookImg }
                    : require('../../assets/nodata.png')
                }
              />
            </View>
            <View style={{ width: diviceWidth * 0.65 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F2F2F2',
                  borderRadius: 5,
                  paddingLeft: 10,
                  paddingVertical: 2,
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    width: diviceWidth * 0.55,
                    fontSize: 13,
                    fontFamily: 'SCDream5',
                    color: 'grey',
                  }}>
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
              <View
                style={{
                  backgroundColor: '#F2F2F2',
                  height: 2,
                  marginVertical: 5,
                }}></View>
              <View
                style={{
                  backgroundColor: '#F2F2F2',
                  borderRadius: 5,
                  paddingLeft: 10,
                  paddingVertical: 3,
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    width: diviceWidth * 0.55,
                    fontSize: 13,
                    fontFamily: 'SCDream5',
                    color: 'grey',
                  }}>
                  {author} 저 | {publisher} | {dateChagner(publishedInfo)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'SCDream6',
                padding: 15,
                paddingVertical: 10,
                marginTop: 30,
              }}>
              도서 제목
            </Text>
            <Pressable style={styles.bookSearchOpener} onPress={toggleFinder}>
              <Text style={{ fontFamily: 'SCDream5', color: 'grey' }}>
                도서명 검색하기
              </Text>
              <Ionicons
                active
                onPress={bookTitleSearch}
                name='search'
                size={20}
                style={{ marginHorizontal: 10, color: 'grey' }}
              />
            </Pressable>
          </>
        )}

        <DropDownPicker
          items={[
            { label: '#수필', value: '수필' },
            { label: '#문학', value: '문학' },
            { label: '#언어', value: '언어' },
            { label: '#철학', value: '철학' },
            { label: '#예술', value: '예술' },
            { label: '#종교', value: '종교' },
            { label: '#역사', value: '역사' },
            { label: '#만화', value: '만화' },
            { label: '#기타', value: '기타' },
          ]}
          labelStyle={{ fontFamily: 'SCDream5' }}
          placeholder='해쉬태그'
          containerStyle={{ height: 50, width: diviceWidth }}
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
          zIndex={4000}
          labelStyle={{ fontFamily: 'SCDream5' }}
          placeholder='상품상태'
          containerStyle={{ height: 50, width: diviceWidth }}
          onChangeItem={(item) => {
            setStateInfo(item.value);
          }}
        />

        <View style={styles.addPicsBox}>
          {imageUri == '' ? (
            <Pressable style={styles.bookPicBox} onPress={pickImage}>
              <Text style={{ fontFamily: 'SCDream4' }}>카메라</Text>
            </Pressable>
          ) : (
            <Pressable onPress={pickImage}>
              <Image source={{ uri: imageUri.uri }} style={styles.bookPicBox} />
            </Pressable>
          )}
          <View style={{ justifyContent: 'center' }}>
            <View style={styles.descBox}>
              <Text
                style={{ fontFamily: 'SCDream5', fontSize: 13, color: 'grey' }}>
                상품의 상태가 잘 보이게 찍어주세요
              </Text>
            </View>
          </View>
        </View>
        <TextInput
          multiline
          style={styles.bookDescBox}
          onChangeText={setContentInfo}
          value={contentInfo}
          placeholder='책 간단 소개'
        />

        <Overlay
          overlayStyle={styles.overlayBox}
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
                  style={{ width: 200, height: 200, top: 120, opacity: 0.2 }}
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
                        setAuthor(book.authors);
                        setBookImg(book.thumbnail);
                        setStory(book.contents);
                        setPublisher(book.publisher);
                        setPublishedInfo(book.datetime);
                        setPriceInfo(book.price);
                        setFinderOpen(false);
                        setSwitcher(true);
                        console.log(book);
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
    fontSize: 16,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'SCDream5',
  },
  container: { backgroundColor: 'white' },
  addPicsBox: {
    width: diviceWidth,
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  bookPicBox: {
    width: 80,
    height: 80,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descBox: {
    backgroundColor: 'white',
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
  overlayBox: {
    width: diviceWidth * 0.9,
    height: diviceHeight * 0.7,
    padding: 30,
  },
  bookTitleBox: {
    paddingLeft: 20,
    height: 50,
    width: '85%',
  },
  bookDescBox: {
    width: diviceWidth,
    height: 150,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  bookSearchBtn: {
    width: '15%',
  },
});
