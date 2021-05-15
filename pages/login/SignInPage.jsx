import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../../config/BackData';

import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';

const logo = require('../../assets/mainlogo.png');

export default function SignInPage({ navigation }) {
  const [jsonObject, setJsonObject] = useState({});
  const [ready, setReady] = useState(true);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });

    setTimeout(() => {
      AsyncStorage.getItem('session', (err, result) => {
        if (result) {
          navigation.push('TabNavigator');
        } else {
          setReady(false);
        }
      });
    });
  }, []);

  _onAuthGoogle = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId:
        '161728779966-9pjjn580gfj749pq88j8f9hnpmhpa4nm.apps.googleusercontent.com',
      expoClientId:
        '747037265612-5o4lk93m2n098dhirk4gshnqlugi86nv.apps.googleusercontent.com',
      iosStandaloneAppClientId:
        '161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com',
      androidStandaloneAppClientId:
        '161728779966-9pjjn580gfj749pq88j8f9hnpmhpa4nm.apps.googleusercontent.com',
      iosClientId:
        '161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com',
      expoClientId:
        '161728779966-7ddu3obi2cnrplbtgtoqvc7pi6f7oage.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const json_rep = await response.json();
      setJsonObject(json_rep);
    } else {
      console.log('cancel');
    }
    await login(user.name, user.email, user.photoUrl, navigation);
    await AsyncStorage.setItem('accessToken', accessToken);
    console.log(accessToken);
    navigation.push('SignPlusPage');
  };

  const loglog = async () => {
    await login(
      '문형원',
      'dhmgmhw@naver.com',
      'https://sanggubk2.s3.ap-northeast-2.amazonaws.com/1cc47651-6e3b-481d-ba0e-cc2604efce9e.jpg',
      navigation
    );
  };

  // 천재승
  // chunzasang@gmail.com

  return ready ? (
    <ActivityIndicator
      style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
      size='large'
      color='grey'
    />
  ) : (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <Image
        style={{ height: 50, width: 80, margin: 30, marginTop: 100 }}
        resizeMode='contain'
        source={require('../../assets/mainlogo.png')}
      />
      <Text style={[styles.loginText, { marginBottom: 200 }]}>
        같이하는 가치나눔
      </Text>
      <StatusBar style='auto' />
      <View
        style={{
          width: 300,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}>
        <View
          style={{ height: 2, width: 50, backgroundColor: '#4CB73B' }}></View>
        <Text style={styles.loginText}>간편한 SNS 회원가입</Text>
        <View
          style={{ height: 2, width: 50, backgroundColor: '#4CB73B' }}></View>
      </View>
      <TouchableOpacity
        onPress={_onAuthGoogle}
        style={[styles.button, { backgroundColor: '#4285F4' }]}>
        <FontAwesome name='google' size={17} color='#ffffff' />
        <Text style={styles.text}>구글로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={loglog}
        style={[styles.button, { backgroundColor: '#3b5998' }]}>
        <FontAwesome
          name='male'
          size={17}
          ㅠ
          color='#ffffff'
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.text}>임다희로 시작하기</Text>
        {/* <Text style={styles.text}>천재승으로 시작하기</Text> */}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: { alignSelf: 'center' },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#c5beb6',
    textAlign: 'center',
  },
  highlite: {
    fontSize: 25,
    fontWeight: '700',
    color: '#df3f32',
    textAlign: 'center',
  },
  loginText: { fontFamily: 'SCDream6', color: '#4CB73B' },
  label: {
    color: '#fff',
  },
  input: {
    color: '#fff',
  },

  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'SCDream5',
    color: 'white',
    marginHorizontal: 15,
  },
  logoutbtn: {
    width: 300,
    height: 50,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
  },
});
