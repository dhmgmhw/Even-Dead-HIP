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
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { Item } from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons } from '@expo/vector-icons';
import { getSearchBook } from '../../config/KakaoApi';
import KakaoResultCardComponent from '../../components/home/KakaoResultCardComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function AddPage({ navigation }) {
  const [text, setText] = useState();
  const [bookTitle, setBookTitle] = useState('도서명 검색하기');

  // 보낼거
  const [title, setTitle] = useState('제목');
  const [author, setAuthor] = useState('작가');
  const [bookImg, setBookImg] = useState();
  const [story, setStory] = useState();
  const [publisher, setPublisher] = useState('출판사');
  const [imageUri, setImageUri] = useState('');
  const [genreInfo, setGenreInfo] = useState();
  const [stateInfo, setStateInfo] = useState();
  const [contentInfo, setContentInfo] = useState();

  const [finderOpen, setFinderOpen] = useState(false);

  const [books, setBooks] = useState([]);

  const toggleFinder = () => {
    setFinderOpen(!finderOpen);
  };

  const submitInfo = () => {
    console.log(
      title,
      bookImg,
      author,
      story,
      genreInfo,
      stateInfo,
      contentInfo
    );
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

  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };

  const pickImage = async () => {
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });
    if (imageData.cancelled == false) {
      getImageUrl(imageData);
      console.log(imageData);
    } else {
      console.log('cancelled!');
    }
  };

  // const upload = async () => {
  //   console.log('업로드 준비중!');
  //   let data = {
  //     title: title,
  //     author: author,
  //     bookImg: bookImg,
  //     story: story,
  //     genreInfo: genreInfo,
  //     stateInfo: stateInfo,
  //     contentInfo: contentInfo,
  //   };
  //   const response = await fetch(imageUri);
  //   const blob = await response.blob();
  //   const imageUrl = await imageUpload(blob);
  //   data.image = imageUrl;
  //   let result = await addDiary(data);
  //   // 만약 올린게 정상적으로 true라는 값을 내려준다면!
  //   if (result) {
  //     Alert.alert('글이 성공적으로 등록되었습니다!');
  //   }
  // };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <View style={{ backgroundColor: 'white' }}>
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
            style={styles.headerBtns}>
            취소
          </Text>
        }
        centerComponent={<Text style={styles.headerTitle}>도서등록</Text>}
        rightComponent={
          <Text
            onPress={submitInfo}
            style={[styles.headerBtns, { color: '#6864FF' }]}>
            등록
          </Text>
        }
      />
      <View style={styles.addPicsBox}>
        {imageUri == '' ? (
          <Pressable style={styles.bookPicBox} onPress={pickImage}>
            <Text>+</Text>
          </Pressable>
        ) : (
          <Pressable onPress={pickImage}>
            <Image source={{ uri: imageUri }} style={styles.bookPicBox} />
          </Pressable>
        )}
        <View>
          <View style={styles.descBox}>
            <Text>0/10</Text>
          </View>
          <View style={styles.descBox}>
            <Text>도서의 상태가 잘 보이게 찍어주세요</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          padding: 15,
          paddingVertical: 10,
        }}>
        도서 제목
      </Text>
      <Pressable style={styles.bookSearchOpener} onPress={toggleFinder}>
        <Text>{bookTitle}</Text>
        <Ionicons
          active
          onPress={bookTitleSearch}
          name='search'
          size={20}
          style={{ marginHorizontal: 10, color: 'grey' }}
        />
      </Pressable>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            padding: 15,
            paddingVertical: 10,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            padding: 15,
            paddingVertical: 10,
          }}>
          {author}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            padding: 15,
            paddingVertical: 10,
          }}>
          {publisher}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            padding: 15,
            paddingVertical: 10,
          }}>
          {genreInfo}
        </Text>
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode='contain'
          source={
            bookImg ? { uri: bookImg } : require('../../assets/nodata.png')
          }
        />
        <View style={{ flexDirection: 'row' }}>
          <DropDownPicker
            items={[
              { label: '수필', value: '수필' },
              { label: '문학', value: '문학' },
              { label: '언어', value: '언어' },
              { label: '철학', value: '철학' },
              { label: '만화', value: '만화' },
              { label: '예술', value: '예술' },
              { label: '종교', value: '종교' },
              { label: '역사', value: '역사' },
              { label: '만화', value: '만화' },
              { label: '기타', value: '기타' },
            ]}
            labelStyle={{ fontFamily: 'SCDream3' }}
            placeholder='카테고리를 선택해주세요'
            containerStyle={{ height: 40, width: '50%' }}
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
            labelStyle={{ fontFamily: 'SCDream3' }}
            placeholder='상태를 선택해주세요'
            containerStyle={{ height: 40, width: '50%' }}
            onChangeItem={(item) => {
              setStateInfo(item.value);
            }}
          />
        </View>
        <TextInput
          style={styles.bookTitleBox}
          onChangeText={setContentInfo}
          value={contentInfo}
          placeholder='책 간단 소개'
        />
      </View>

      <Overlay
        overlayStyle={styles.overlayBox}
        isVisible={finderOpen}
        onBackdropPress={toggleFinder}>
        <View
          style={{ borderWidth: 2, borderColor: '#6864FF', marginBottom: 20 }}>
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
                style={{ alignSelf: 'center', color: 'grey' }}
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
                      setFinderOpen(false);
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
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
  },
  headerBtns: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  container: { backgroundColor: 'white' },
  addPicsBox: {
    width: diviceWidth,
    height: 130,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  bookPicBox: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descBox: {
    width: 240,
    height: '50%',
    backgroundColor: 'lightgrey',
  },
  bookSearchOpener: {
    backgroundColor: '#e3e3e3',
    width: diviceWidth,
    height: 55,
    marginBottom: 10,
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
  bookSearchBtn: {
    width: '15%',
  },
});
