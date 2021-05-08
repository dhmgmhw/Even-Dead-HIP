import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  ImageBackground,
  Container,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import JSONTree from "react-native-json-tree"
import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"
import { FontAwesome } from "@expo/vector-icons"

import { login } from "../../config/BackData"

import { StatusBar } from "expo-status-bar"
import { ScrollView } from "react-native-gesture-handler"

const bImage = require("../../assets/back.png")
const logo = require("../../assets/logo.png")

export default function SignInPage({ navigation }) {
  const [jsonObject, setJsonObject] = useState({})

  useEffect(() => {
    navigation.addListener("beforeRemove", e => {
      e.preventDefault()
    })

    setTimeout(() => {
      AsyncStorage.getItem("session", (err, result) => {
        if (result) {
          navigation.push("TabNavigator")
        } else {
          setReady(true)
        }
      })
      setReady(true)
    })
  }, [])

  _onAuthGoogle = async () => {
    const { type, accessToken, user, idToken } = await Google.logInAsync({
      androidClientId:
        "161728779966-m3u3d79dtk3f1eac5922csif029sokdd.apps.googleusercontent.com",
      expoClientId:
        "747037265612-5o4lk93m2n098dhirk4gshnqlugi86nv.apps.googleusercontent.com",
      //    GOOGLE_ANDROID_ID,
      iosClientId:
        "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })

    if (type === "success") {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const json_rep = await response.json()
      navigation.push("SignPlusPage")

      setJsonObject(json_rep)
    } else {
      alert(`Cancel`)
    }
    await login(user.name, user.email, user.photoUrl, navigation)
    navigation.push("SignPluspage")
  }

  const signoutWithGoogleAsync = async () => {
    try {
      console.log("token in delete", accessToken)
      await Google.logOutAsync({
        accessToken,
        iosClientId:
          "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",
        androidClientId:
          "161728779966-m3u3d79dtk3f1eac5922csif029sokdd.apps.googleusercontent.com",
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  _onAuthFacebook = async () => {
    try {
      await Facebook.initializeAsync("3939632819489550")
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      })
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
        const json_rep = await response.json()
        setJsonObject(json_rep)
        console.log(json_rep)
      } else {
        console.log("Facebook Login cancelled")
      }
    } catch ({ message }) {
      alert(`페이스북 로그인 에러: ${message}`)
    }
    await login(email, username, image, navigation)
  }

  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.loginText}>간편한 SNS 회원가입</Text>
      <TouchableOpacity
        onPress={_onAuthGoogle}
        style={[styles.button, { backgroundColor: "#4285F4" }]}>
        <FontAwesome name="google" size={17} color="#ffffff" />
        <Text style={styles.text}>구글로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutbtn}
        onPress={signoutWithGoogleAsync}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_onAuthFacebook}
        style={[styles.button, { backgroundColor: "#3b5998" }]}>
        <FontAwesome
          name="facebook"
          size={17}
          color="#ffffff"
          style={{ alignSelf: "center" }}
        />
        <Text style={styles.text}>페이스북으로 시작하기</Text>
      </TouchableOpacity>
      {/* <View style={styles.tree}>
        <JSONTree data={jsonObject} />
      </View> */}
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
  loginText: { fontFamily: "SCDream5", marginBottom: 20 },
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
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
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
})
