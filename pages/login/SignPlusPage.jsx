import React, { useState, useEffect } from 'react';
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
} from 'react-native';

import { signdetail } from '../../config/BackData';

import { Container } from 'native-base';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function SignPlusPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
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
      Alert.alert('아직은 서울 안의 자치구만 가능해요 ;(');
      return;
    }
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
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
    marginTop: 150,
    marginBottom: 50,
    fontSize: 18,
    fontFamily: 'SCDream6',
    color: '#23A40E',
    alignSelf: 'center',
  },
});
