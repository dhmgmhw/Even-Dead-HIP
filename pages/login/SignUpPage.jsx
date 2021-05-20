import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { register } from '../../config/BackData';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function SignUpPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const checkEmail = (email) => {
    let reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(email)) {
      return false;
    } else {
      return true;
    }
  };

  const checkPassword = (testCase) => {
    let checkPass =
      /^(?=.*[a-zA-Z])(?=.*[\~\․\!\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\|\\\;\:\\'\"\<\>\,\.\?\/])(?=.*[0-9]).{6,12}$/;
    if (checkPass.test(testCase)) {
      return true;
    } else {
      return false;
    }
  };

  const doSignUp = async () => {
    if (username == '') {
      Alert.alert('닉네임을 입력해주세요');
      return;
    }
    if (email == '') {
      Alert.alert('이메일을 입력해주세요');
      return;
    }
    if (checkEmail(email) == false) {
      Alert.alert('올바른 이메일 형식이 아닙니다');
      return;
    }
    if (password == '') {
      Alert.alert('비밀번호를 입력해주세요');
      return;
    }
    if (password != passwordConfirm) {
      Alert.alert('비밀번호 확인을 다시해주세요');
      return;
    }
    await register(username, email, password, navigation);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder='닉네임을 입력해주세요'
            placeholderTextColor={'#828282'}
          />
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder='이메일을 입력해주세요'
            placeholderTextColor={'#828282'}
          />
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={[styles.input, { marginBottom: 3 }]}
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            placeholder='비밀번호를 입력해주세요'
            placeholderTextColor={'#828282'}
          />
          {checkPassword(password) ? null : (
            <Text style={styles.info}>
              영문자, 특수문자, 숫자 포함 6~12자리
            </Text>
          )}
          <Text style={styles.label}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
            placeholder='비밀번호를 입력해주세요'
            placeholderTextColor={'#828282'}
          />
        </KeyboardAvoidingView>

        <Pressable onPress={doSignUp} style={styles.btn}>
          <Text
            style={{ fontSize: 18, fontFamily: 'SansBold', color: 'white' }}>
            가입하기
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  statusAvoid: {
    height: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  mainHeader: {
    width: diviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 45,
    borderBottomWidth: 4,
    borderColor: '#F3F3F3',
  },
  headerLComp: {
    height: 45,
    width: diviceWidth / 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerCComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
  },
  headerRComp: {
    width: diviceWidth / 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  headerCText: {
    fontFamily: 'SansBold',
    fontSize: 18,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'SansBold',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    width: diviceWidth * 0.6,
  },
  input: {
    paddingHorizontal: 15,
    width: diviceWidth * 0.6,
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#4CB73B',
  },
  info: {
    fontFamily: 'SansRegular',
    fontSize: 10,
    color: 'grey',
  },
  btn: {
    width: diviceWidth * 0.8,
    backgroundColor: '#4CB73B',
    height: 50,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
  },
});
