import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Item } from 'native-base';

import { Ionicons } from '@expo/vector-icons';
import { getSearchBook } from '../../config/KakaoApi';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function AddPage({ navigation }) {
  const [text, setText] = useState();
  const [books, setBooks] = useState([]);

  const bookTitleSearch = async () => {
    const result = await getSearchBook(text);
    // console.log(result.documents);
    setBooks(result.documents);
    console.log(books);
  };

  return (
    <View>
      <Header
        containerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          borderBottomWidth: 1,
        }}
        leftComponent={
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name={'chevron-back'}
            size={27}
            color={'black'}
          />
        }
        centerComponent={'새로운 글'}
        rightComponent={
          <Ionicons
            name={'search'}
            size={27}
            style={{ marginHorizontal: 10 }}
          />
        }
      />
      <Pressable
        onPress={() => {
          console.log('WTF');
        }}
        style={styles.chatInfoBox}>
        <View style={styles.bookBox}></View>
        <View style={styles.userBox}></View>
        <View style={styles.descBox}></View>
      </Pressable>
      <Item style={styles.messageBox}>
        <TextInput
          style={{
            paddingLeft: 20,
            backgroundColor: '#eeeeee',
            margin: 7,
            height: 40,
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 100,
            width: diviceWidth * 0.8,
          }}
          onChangeText={setText}
          value={text}
          placeholder='메시지를 입력하세요'
        />
        <Ionicons
          active
          onPress={bookTitleSearch}
          name='search'
          size={27}
          style={{ marginHorizontal: 10, color: '#202540' }}
        />
      </Item>
      <ScrollView>
        {books.thumbnail == undefined ? <Text>없음</Text> : <Text>있음</Text>}

        {books.map((book, i) => {
          return (
            <View key={i}>
              <Text>{book.title}</Text>
              <Text>{book.authors}</Text>
              <Image
                style={{ width: 100, height: 100 }}
                resizeMode='contain'
                source={{ uri: book.thumbnail }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white' },
  chatInfoBox: {
    width: diviceWidth,
    height: 80,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  descBox: {
    width: '60%',
    height: 70,
    backgroundColor: 'lightgrey',
  },
  bookBox: {
    width: 60,
    height: 70,
    backgroundColor: 'grey',
  },
  oppositeChatBox: {
    width: diviceWidth,
    height: 80,
    borderWidth: 2,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  myChatBox: {
    width: diviceWidth,
    height: 80,
    borderWidth: 2,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  oppositeUserBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  oppositeTextBox: {
    width: '60%',
    height: 70,
    backgroundColor: 'lightgrey',
  },
  myTextBox: { width: '60%', height: 70, backgroundColor: 'lightgrey' },
});
