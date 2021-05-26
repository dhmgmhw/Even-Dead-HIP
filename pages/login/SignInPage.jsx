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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../../config/BackData';

import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

const logo = require('../../assets/mainlogo.png');

export default function SignInPage({ navigation }) {
  const [ready, setReady] = useState(true);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

  const doSignIn = async () => {
    if (email == '') {
      setEmailError('이메일을 입력해주세요');
      return;
    }
    if (password == '') {
      setPasswordError('비밀번호를 입력해주세요');
      return;
    }
    await login(email, password, navigation);
  };

  const goSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  return ready ? (
    <ActivityIndicator
      style={{ position: 'absolute', alignSelf: 'center', top: '10%' }}
      size='large'
      color='grey'
    />
  ) : (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <StatusBar style='auto' />
      <Image
        style={{ height: 50, width: 80, marginBottom: 30, marginTop: 10 }}
        resizeMode='contain'
        source={require('../../assets/mainlogo.png')}
      />
      <Text style={[styles.loginText, { marginBottom: 90 }]}>
        같이하는 가치나눔
      </Text>
      <View style={styles.loginbox}>
        <TextInput
          style={{
            paddingHorizontal: 15,
            backgroundColor: '#EEF5ED',
            width: 250,
            height: 40,
            borderRadius: 5,
            marginBottom: 10,
          }}
          onChangeText={setEmail}
          value={email}
          placeholder='이메일을 입력해주세요'
          placeholderTextColor={'#B6B6B6'}
        />
        <TextInput
          style={{
            paddingHorizontal: 15,
            backgroundColor: '#EEF5ED',
            width: 250,
            height: 40,
            borderRadius: 5,
            marginBottom: 15,
          }}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholder='비밀번호를 입력해주세요'
          placeholderTextColor={'#B6B6B6'}
        />
      </View>
      <TouchableOpacity full style={styles.emailSignIn} onPress={doSignIn}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 13,
            alignSelf: 'center',
            fontFamily: 'SansBold',
          }}>
          로그인
        </Text>
      </TouchableOpacity>
      <TouchableOpacity full style={styles.emailSignUp} onPress={goSignUp}>
        <Text
          style={{
            color: '#4CB73B',
            fontSize: 13,
            alignSelf: 'center',
            fontFamily: 'SansBold',
          }}>
          회원가입
        </Text>
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
  header: {
    fontSize: 25,
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
  form: {
    width: 250,
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },
  idform: {
    backgroundColor: '#EEF5ED',
  },
  pwform: {
    backgroundColor: '#EEF5ED',
  },

  emailSignIn: {
    alignSelf: 'center',
    width: 250,
    height: 40,
    marginTop: 5,
    marginBottom: 35,
    borderRadius: 5,
    backgroundColor: '#4CB73B',
    justifyContent: 'center',
  },
  emailSignUp: {
    alignSelf: 'center',
    width: 250,
    height: 40,
    marginTop: 15,
    borderRadius: 5,
    borderColor: '#4CB73B',
    borderWidth: 1,
    justifyContent: 'center',
  },
  loginbox: {
    // marginBottom: 250,
  },
});
