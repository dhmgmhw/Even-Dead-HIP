import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { Overlay } from 'react-native-elements';

import * as Google from 'expo-google-app-auth';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../../config/BackData';

import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

const logo = require('../../assets/mainlogo.png');

export default function SignInPage({ navigation }) {
  const [ready, setReady] = useState(true);

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // const checkEmail = (email) => {
  //   let reg_email =
  //     /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  //   if (!reg_email.test(email)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

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
        '446184458188-320sh9t5aja02fkp6mnc980q1hvr4o3t.apps.googleusercontent.com',
      expoClientId:
        '747037265612-5o4lk93m2n098dhirk4gshnqlugi86nv.apps.googleusercontent.com',
      iosStandaloneAppClientId:
        '161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com',
      androidStandaloneAppClientId:
        '446184458188-320sh9t5aja02fkp6mnc980q1hvr4o3t.apps.googleusercontent.com',
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
    // await login(user.name, user.email, user.photoUrl, navigation);
    Alert.alert(user.name, user.email);
    // await AsyncStorage.setItem('accessToken', accessToken);
    // console.log(accessToken);
    // navigation.push('SignPlusPage');
  };

  // const loglog = async () => {
  //   if (name == '') {
  //     Alert.alert('이름을 입력해주세요');
  //     return;
  //   }
  //   if (email == '') {
  //     Alert.alert('이메일을 입력해주세요');
  //     return;
  //   }
  //   if (checkEmail(email) === false) {
  //     Alert.alert('이메일을 올바르게 입력해주세요');
  //     return;
  //   }
  //   await login(
  //     name,
  //     email,
  //     'https://sanggubk2.s3.ap-northeast-2.amazonaws.com/1cc47651-6e3b-481d-ba0e-cc2604efce9e.jpg',
  //     navigation
  //   );
  //   setName('');
  //   setEmail('');
  //   setVisible(false);
  // };

  const loglog = async () => {
    if (email == '') {
      Alert.alert('이메일을 입력해주세요');
      return;
    }
    if (password == '') {
      Alert.alert('비밀번호를 입력해주세요');
      return;
    }
    await login(email, password, navigation);
    setEmail('');
    setPassword('');
    setVisible(false);
  };

  return ready ? (
    <ActivityIndicator
      style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
      size='large'
      color='grey'
    />
  ) : (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <StatusBar style='auto' />
      <Image
        style={{ height: 50, width: 80, margin: 30, marginTop: 100 }}
        resizeMode='contain'
        source={require('../../assets/mainlogo.png')}
      />
      <Text style={[styles.loginText, { marginBottom: 200 }]}>
        같이하는 가치나눔
      </Text>
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
        <Text style={styles.loginText}>간편한 로그인</Text>
        <View
          style={{ height: 2, width: 50, backgroundColor: '#4CB73B' }}></View>
      </View>
      {/* <TouchableOpacity
        onPress={_onAuthGoogle}
        style={[styles.button, { backgroundColor: '#4285F4' }]}>
        <FontAwesome name='google' size={17} color='#ffffff' />
        <Text style={styles.text}>구글로 시작하기</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={toggleOverlay}
        style={[styles.button, { backgroundColor: 'green' }]}>
        <FontAwesome
          name='envelope-open-o'
          size={17}
          color='#ffffff'
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.text}>이메일로 시작하기</Text>
      </TouchableOpacity>
      <View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View
            style={{
              width: diviceWidth * 0.8,
              height: diviceHeight / 2,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{ height: 50, width: 80, marginBottom: 30 }}
              resizeMode='contain'
              source={require('../../assets/mainlogo.png')}
            />
            <Text
              style={[
                styles.text,
                { color: 'black', fontSize: 18, marginBottom: 30 },
              ]}>
              이메일로 시작하기
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                width: '70%',
                height: 30,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}
              onChangeText={setEmail}
              value={email}
              placeholder='email'
              placeholderTextColor={'grey'}
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                width: '70%',
                height: 30,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
                marginBottom: 10,
              }}
              onChangeText={setPassword}
              value={password}
              type={'password'}
              placeholder='비밀번호'
              placeholderTextColor={'grey'}
            />
            <Text
              style={[
                styles.text,
                {
                  fontFamily: 'SansRegular',
                  fontSize: 12,
                  color: 'black',
                  marginBottom: 10,
                },
              ]}>
              이메일을 정확히 입력해주세요!
            </Text>

            <TouchableOpacity
              onPress={loglog}
              style={[styles.button, { backgroundColor: 'green' }]}>
              <FontAwesome
                name='send'
                size={17}
                color='#ffffff'
                style={{ alignSelf: 'center' }}
              />
              <Text style={styles.text}>이메일로 시작하기</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </View>
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
