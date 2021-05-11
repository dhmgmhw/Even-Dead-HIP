import React, { useState, useEffet } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

// import CheckBox from "../../components/login/CheckBox"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Searchbar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import { Container, ScrollView } from 'native-base';

import { getUserProfile, signdetail } from '../../config/BackData';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

const data = require('../../interestcategory.json');

const numcolumns = '3';

// let checkList = []

export default function SignPlusPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState('');
  const [regionInfo, setRegionInfo] = useState('');
  const [checkList, setcheckList] = useState('');
  const [profile, setprofile] = useState('');

  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const userData = await getUserProfile();
    if (userData.results.town == null) {
      setLoading(false);
    } else {
      navigation.push('TabNavigator');
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    checkUser();
  }, []);

  const submitRegion = async () => {
    if (searchQuery === '') {
      Alert.alert('우리동네를 입력해 주세요!');
      return;
    } else if (
      searchQuery === '종로구' ||
      '중구' ||
      '용산구' ||
      '성동구' ||
      '광진구' ||
      '동대문구' ||
      '중랑구' ||
      '성북구' ||
      '북구' ||
      '도봉구' ||
      '노원구' ||
      '은평구' ||
      '서대문구' ||
      '마포구' ||
      '양천구' ||
      '강서구' ||
      '구로구' ||
      '금천구' ||
      '영등포구' ||
      '동작구' ||
      '관악구' ||
      '서초구' ||
      '강남구' ||
      '송파구'
    ) {
      await signdetail(searchQuery);
      navigation.push('TabNavigator');
    } else {
      Alert.alert('아직은 서울 안에서만 가능해요 ;( 예) 송파구');
      return;
    }
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  return loading ? (
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
      <Container style={styles.container}>
        <Text style={styles.setarea}>지역을 설정해주세요</Text>
        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            margin: 20,
          }}>
          <TextInput
            style={{
              borderWidth: 2,
              width: '90%',
              height: 40,
              borderRadius: 15,
              borderColor: '#4CB73B',
              alignSelf: 'center',
              paddingHorizontal: 10,
            }}
            placeholder='지역명 입력 예) 강남구'
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <Pressable
          style={{
            width: 130,
            height: 50,
            backgroundColor: searchQuery == '' ? '#E0E0E0' : '#1EA608',
            borderRadius: 15,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            top: '30%',
          }}
          onPress={submitRegion}>
          <Text
            style={{ color: 'white', fontFamily: 'SansMedium', fontSize: 20 }}>
            확인
          </Text>
        </Pressable>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    marginLeft: 20,
    marginTop: 50,
  },
  setarea: {
    marginTop: 100,
    marginLeft: 100,
    marginTop: 150,
    marginBottom: 50,
    fontSize: 18,
    fontFamily: 'SCDream6',
    color: '#23A40E',
    alignSelf: 'center',
  },
  ment: {
    marginTop: 100,
    marginLeft: 100,
  },
  bookcate: {
    // flexDirection: "row",
    marginTop: 30,
  },
  ListBox: {
    padding: 5,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bookCard: {
    height: 40,
    padding: 10,
    margin: 10,
    borderWidth: 0.1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dropBox: { height: 50, width: diviceWidth },
});
