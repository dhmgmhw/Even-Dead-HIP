import React, { useState, useEffect } from "react"
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
  Button,
} from "react-native"
import { Overlay } from "react-native-elements"

import ItemInput from "../../components/Login/ItemInput"

import { Form } from "native-base"

import * as Google from "expo-google-app-auth"
import { FontAwesome } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { login } from "../../config/BackData"

import { StatusBar } from "expo-status-bar"
import { ScrollView } from "react-native-gesture-handler"

const diviceWidth = Dimensions.get("window").width
const diviceHeight = Dimensions.get("window").height

const logo = require("../../assets/mainlogo.png")

export default function SignInPage({ navigation }) {
  const [ready, setReady] = useState(true)

  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    navigation.addListener("beforeRemove", e => {
      e.preventDefault()
    })

    setTimeout(() => {
      AsyncStorage.getItem("session", (err, result) => {
        if (result) {
          navigation.push("TabNavigator")
        } else {
          setReady(false)
        }
      })
    })
  }, [])

  _onAuthGoogle = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId:
        "446184458188-320sh9t5aja02fkp6mnc980q1hvr4o3t.apps.googleusercontent.com",
      expoClientId:
        "747037265612-5o4lk93m2n098dhirk4gshnqlugi86nv.apps.googleusercontent.com",
      iosStandaloneAppClientId:
        "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",
      androidStandaloneAppClientId:
        "446184458188-320sh9t5aja02fkp6mnc980q1hvr4o3t.apps.googleusercontent.com",
      iosClientId:
        "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",
      expoClientId:
        "161728779966-7ddu3obi2cnrplbtgtoqvc7pi6f7oage.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      behavior: "web",
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
    })
    if (type === "success") {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const json_rep = await response.json()
      setJsonObject(json_rep)
    } else {
      console.log("cancel")
    }
    // await login(user.name, user.email, user.photoUrl, navigation);
    Alert.alert(user.name, user.email)
    // await AsyncStorage.setItem('accessToken', accessToken);
    // console.log(accessToken);
    // navigation.push('SignPlusPage');
  }

  const doSignIn = () => {
    if (email == "") {
      setEmailError("이메일을 입력해주세요")
    } else {
      setEmailError("")
    }

    if (password == "") {
      setPasswordError("비밀번호를 입력해주세요")
    } else {
      setPasswordError("")
    }
    login(email, password, navigation)
  }
  const setidFunc = itemInputid => {
    setusername(itemInputid)
  }
  const setPasswordFunc = itemInputPassword => {
    setPassword(itemInputPassword)
  }

  const goSignUp = () => {
    navigation.navigate("SignUpPage")
  }

  return ready ? (
    <ActivityIndicator
      style={{ position: "absolute", alignSelf: "center", top: "10%" }}
      size="large"
      color="grey"
    />
  ) : (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={{ height: 50, width: 80, margin: 30, marginTop: 100 }}
        resizeMode="contain"
        source={require("../../assets/mainlogo.png")}
      />
      <Text style={[styles.loginText, { marginBottom: 50 }]}>
        같이하는 가치나눔
      </Text>
      <View style={styles.loginbox}>
        <Form style={styles.form}>
          <ItemInput
            style={styles.idform}
            title={"아이디를 입력해주세요"}
            type={"username"}
            setFunc={setidFunc}
            error={emailError}
          />
          <ItemInput
            style={styles.pwform}
            title={"비밀번호를 입력해주세요"}
            type={"password"}
            setFunc={setPasswordFunc}
            error={passwordError}
          />
        </Form>
      </View>
      <TouchableOpacity full style={styles.emailSignIn} onPress={doSignIn}>
        <Text
          style={{
            color: "#FFFFFF",
            fontsize: 8,
            alignSelf: "center",
            marginTop: 5,
          }}>
          로그인
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
        }}>
        <TouchableOpacity full style={styles.e}>
          <Text style={{ color: "#333", fontsize: 8 }}>ID찾기 |</Text>
        </TouchableOpacity>
        <TouchableOpacity full style={styles.e}>
          <Text style={{ color: "#333", fontsize: 8 }}> 비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity full style={styles.emailSignUp} onPress={goSignUp}>
        <Text
          style={{
            color: "#4CB73B",
            fontsize: 8,
            alignSelf: "center",
            marginTop: 5,
          }}>
          회원가입
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: { alignSelf: "center" },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#c5beb6",
    textAlign: "center",
  },
  highlite: {
    fontSize: 25,
    fontWeight: "700",
    color: "#df3f32",
    textAlign: "center",
  },
  loginText: { fontFamily: "SCDream6", color: "#4CB73B" },
  label: {
    color: "#fff",
  },
  input: {
    color: "#fff",
  },

  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: "row",
  },
  text: {
    fontFamily: "SCDream5",
    color: "white",
    marginHorizontal: 15,
  },
  logoutbtn: {
    width: 300,
    height: 50,
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: "row",
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
    backgroundColor: "#EEF5ED",
  },
  pwform: {
    backgroundColor: "#EEF5ED",
  },

  emailSignIn: {
    alignSelf: "center",
    width: 250,
    height: 40,

    marginTop: 5,
    marginBottom: 5,

    borderRadius: 5,
    backgroundColor: "#4CB73B",
  },
  emailSignUp: {
    alignSelf: "center",
    width: 250,
    height: 40,
    marginTop: 15,
    borderRadius: 5,
    borderColor: "#4CB73B",
    borderWidth: 1,

    // backgroundColor: "#E5E5E5",
  },
  loginbox: {
    // marginBottom: 250,
  },
})
