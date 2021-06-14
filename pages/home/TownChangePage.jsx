import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

import { Container } from 'native-base';

import { signdetail } from '../../config/BackData';
import { getTown } from '../../config/KakaoApi';

const seoul = [
  '종로구',
  '중구',
  '용산구',
  '성동구',
  '광진구',
  '동대문구',
  '중랑구',
  '성북구',
  '북구',
  '도봉구',
  '노원구',
  '은평구',
  '서대문구',
  '마포구',
  '양천구',
  '강서구',
  '구로구',
  '금천구',
  '영등포구',
  '동작구',
  '관악구',
  '서초구',
  '강남구',
  '송파구',
  '강동구',
];

export default function TownChangePage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [update, setUpdate] = useState(false);

  const getLocation = async () => {
    setUpdate(true);
    try {
      await Location.requestForegroundPermissionsAsync();
      const locationData = await Location.getCurrentPositionAsync();
      const x = locationData['coords']['longitude'];
      const y = locationData['coords']['latitude'];
      const res = await getTown(x, y);
      setSearchQuery(res.documents[0].region_2depth_name);
      setUpdate(false);
    } catch (error) {
      Alert.alert('위치를 찾을 수가 없습니다.');
      setUpdate(false);
    }
  };

  const submitRegion = async () => {
    if (searchQuery === '') {
      Alert.alert('우리동네를 입력해 주세요!');
      return;
    } else if (seoul.includes(searchQuery)) {
      await signdetail(searchQuery);
      navigation.pop();
    } else {
      Alert.alert('아직은 서울에서만 가능해요 예) 송파구');
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
        <Text style={styles.setArea}>지역을 설정해주세요</Text>
        <Text style={styles.textInfo}>
          책과 콩나무는 서울특별시를 한정으로 운영중입니다.
        </Text>
        {update ? (
          <ActivityIndicator
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '50%',
              zIndex: 4001,
            }}
            size='large'
            color='grey'
          />
        ) : null}
        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            marginHorizontal: 20,
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
            placeholder='직접 입력하기 예) 강남구'
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <Pressable onPress={getLocation} style={styles.setTownBtn}>
          <Text style={styles.setTown}>우리동네 찾기</Text>
          <Ionicons name={'map-sharp'} color={'#438732'} size={24} />
        </Pressable>
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
  setArea: {
    marginTop: 150,
    marginBottom: 15,
    fontSize: 18,
    fontFamily: 'SCDream6',
    color: '#23A40E',
    alignSelf: 'center',
  },
  textInfo: {
    fontFamily: 'SCDream6',
    fontSize: 12,
    alignSelf: 'center',
    paddingHorizontal: 10,
    color: '#e0e0e0',
    marginBottom: 20,
  },
  setTown: {
    fontSize: 13,
    fontFamily: 'SCDream6',
    color: '#23A40E',
    marginHorizontal: 5,
  },
  setTownBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: '#23A40E',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
