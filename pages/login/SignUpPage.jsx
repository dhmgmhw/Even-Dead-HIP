import React, { useState } from "react"
import { StyleSheet, ImageBackground, Alert } from "react-native"
import {
  Container,
  Content,
  Text,
  Form,
  Button,
  Header,
  Left,
  Icon,
  Body,
  View,
  Right,
} from "native-base"
import ItemInput from "../../components/Login/ItemInput"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { register } from "../../config/BackData"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function SignUpPage({ navigation }) {
  // const [nickName, setNickName] = useState('');
  // const [nickNameError, setNickNameError] = useState('');

  const [nickName, setNickName] = useState("")
  const [nickNameError, setNickNameError] = useState("")

  const [username, setusername] = useState("")
  const [usernameError, setusernameError] = useState("")

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const [image, setImage] = useState("")
  const [imagerror, setImagelError] = useState("")

  const [town, setTown] = useState("")
  const [townError, setTownError] = useState("")

  const [comment, setComment] = useState("")
  const [commentError, setCommentError] = useState("")

  const [confirmPasswordError, setconfirmPasswordError] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  // const [confirmPassword, setconfirmPassword] = useState('');
  // const [confirmPasswordError, setconfirmPasswordError] = useState('');

  const doSignUp = () => {
    if (email == "") {
      setEmailError("아이디를 입력해주세요")
      return false
    } else {
      setEmailError("")
    }

    if (password == "") {
      setPasswordError("비밀번호를 입력해주세요")
      return false
    } else {
      setPasswordError("")
    }

    if (username == "") {
      setusernameError("닉네임을 입력해주세요")
      return false
    } else {
      setusernameError("")
    }

    if (confirmPassword == "") {
      setconfirmPasswordError("비밀번호 확인을 입력해주세요")
      return false
    } else {
      setconfirmPasswordError("")
    }

    if (password !== confirmPassword) {
      setconfirmPasswordError("비밀번호가 서로 일치 하지 않습니다.")
      return false
    } else {
      setconfirmPasswordError("")
    }

    register(username, password, email, image, town, comment, navigation)
    navigation.navigate("SignInPage")
  }

  return (
    <Container style={styles.container}>
      <Header transparent style={styles.head}>
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.goBack()
            }}>
            <Icon name="arrow-left-l" style={{ color: "#434343" }} />
          </Button>
        </Left>
        <Text style={styles.signintext}>회원가입</Text>
        <Body />
        <Right />
      </Header>
      <View
        style={{
          borderColor: "#F3F3F3",
          borderBottomWidth: 2,
        }}
      />
      <Content contentContainerStyle={styles.content} scrollEnabled={false}>
        <Text style={styles.title}>
          {/* <Text style={styles.highlite}>책과 콩나무</Text>SIGNUP */}
        </Text>
        <Form style={styles.form}>
          <Text style={styles.highlite1}>닉네임</Text>
          <View style={styles.box}>
            <ItemInput
              style={styles.userbox}
              title={"닉네임"}
              type={"nickName"}
              error={nickNameError}
              setFunc={setNickName}
            />
          </View>
          <Text style={styles.highlite}>아이디</Text>

          <View style={styles.box}>
            <ItemInput
              title={"아이디"}
              // title={'이메일'}
              type={"username"}
              error={usernameError}
              setFunc={setusername}
            />
          </View>
          <Text style={styles.highlite}>비밀번호</Text>

          <View style={styles.box}>
            <ItemInput
              title={"비밀번호를 입력해주세요"}
              // title={'비밀번호'}
              type={"password"}
              error={passwordError}
              setFunc={setPassword}
            />
          </View>
          <Text style={styles.highlite}>비밀번호 확인</Text>

          <View style={styles.box}>
            <ItemInput
              title={"비밀번호를 한번 더 입력해주세요"}
              type={"confirmPassword"}
              error={confirmPasswordError}
              setFunc={setconfirmPassword}
            />
          </View>
        </Form>

        <Button full style={styles.emailSignUp} onPress={doSignUp}>
          <Text>가입하기</Text>
        </Button>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {},
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#c5beb6",
    textAlign: "center",
  },
  highlite: {
    fontSize: 15,
    fontWeight: "100",
    // color: "#4CB73B",
    // textAlign: "left",
    // alignItems: "left",

    marginRight: 10,
    marginTop: 10,
  },
  highlite1: {
    fontSize: 15,
    fontWeight: "100",
    textAlign: "left",
  },
  form: {
    width: 250,
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    // paddingLeft: 20,
    // marginTop: 10,
  },
  emailSignUp: {
    alignSelf: "center",
    width: 350,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: "#4CB73B",
  },
  box: {
    alignSelf: "center",
    width: 300,
    height: 50,
    marginTop: 15,
    borderRadius: 10,
    borderColor: "#4CB73B",
    borderWidth: 2,
  },
  userbox: {
    // position: "absolute",
  },
  head: {
    marginTop: 30,
  },
  signintext: {
    alignSelf: "center",
    fontWeight: "100",
    textAlign: "center",
  },
})
