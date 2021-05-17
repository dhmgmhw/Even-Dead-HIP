import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native"
import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"
import { FontAwesome } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { login } from "../../config/BackData"
import * as Linking from "expo-linking"

import { StatusBar } from "expo-status-bar"
import { ScrollView } from "react-native-gesture-handler"
import { getMyScrap } from "../../config/MyPageApi"

import color from "color"

const bImage = require("../../assets/back.png")
const logo = require("../../assets/mainlogo.png")

export default function SignInPage({ navigation }) {
  const [jsonObject, setJsonObject] = useState({})
  const [ready, setReady] = useState(true)

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
    // ready()
  }, [])

  _onAuthGoogle = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId:
        "161728779966-0ri5g755relh4d6fj45eq77gb5qhcs07.apps.googleusercontent.com",

      iosStandaloneAppClientId:
        "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",

      androidStandaloneAppClientId:
        "161728779966-k806srg4093uev2ltrcc0kf1qvcu87qi.apps.googleusercontent.com",
      iosClientId:
        "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",

      scopes: ["profile", "email"],
    })
    console.log(user)

    if (type === "success") {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      // console.log('token in accessible', accessToken);
      // const json_rep = await response.json()
      // navigation.push('SignPlusPage');
      console.log(userInfoResponse)
      // setJsonObject(json_rep)
    } else {
      console.log("cancel")
    }
    await login(user.name, user.email, user.photoUrl, navigation)
    await AsyncStorage.setItem("accessToken", accessToken)
    console.log(accessToken)
    navigation.push("SignPlusPage")
  }

  // const signoutWithGoogleAsync = async () => {
  //   try {
  //     console.log('token in delete', accessToken);
  //     await Google.logOutAsync({
  //       accessToken,
  //       iosClientId:
  //         '161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com',
  //       androidClientId:
  //         '161728779966-m3u3d79dtk3f1eac5922csif029sokdd.apps.googleusercontent.com',
  //     });
  //     await AsyncStorage.setItem('accessToken', accessToken);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };

  _onAuthFacebook = async () => {
    try {
      await Facebook.initializeAsync("3939632819489550")
      const { type, token, expires, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        })
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        )
        const json_rep = await response.json()
        // setJsonObject(json_rep);

        console.log(json_rep)
        // await login(
        //   json_rep.name,
        //   json_rep.email,
        //   'https://images.unsplash.com/photo-1508873787497-1b513a18217a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3300&q=80',
        //   navigation
        // );
      } else {
        console.log("Facebook Login cancelled")
      }
    } catch ({ message }) {
      alert(`페이스북 로그인 에러: ${message}`)
    }
  }

  return ready ? (
    <ActivityIndicator
      style={{ position: "absolute", alignSelf: "center", top: "50%" }}
      size="large"
      color="grey"
    />
  ) : (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <Image
        style={{ height: 50, width: 80, margin: 30, marginTop: 100 }}
        resizeMode="contain"
        source={require("../../assets/mainlogo.png")}
      />
      <Text style={[styles.loginText, { marginBottom: 200 }]}>
        같이하는 가치나눔
      </Text>
      <StatusBar style="auto" />
      <View
        style={{
          width: 300,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 50,
        }}>
        <View
          style={{ height: 2, width: 50, backgroundColor: "#4CB73B" }}></View>
        <Text style={styles.loginText}>간편한 SNS 회원가입</Text>
        <View
          style={{ height: 2, width: 50, backgroundColor: "#4CB73B" }}></View>
      </View>
      <TouchableOpacity
        onPress={_onAuthGoogle}
        style={[styles.button, { backgroundColor: "#4285F4" }]}>
        <FontAwesome name="google" size={17} color="#ffffff" />
        <Text style={styles.text}>구글로 시작하기</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.logoutbtn}
        onPress={signoutWithGoogleAsync}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        onPress={_onAuthFacebook}
        style={[styles.button, { backgroundColor: '#3b5998' }]}>
        <FontAwesome
          name='facebook'
          size={17}
          color='#ffffff'
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.text}>페이스북으로 시작하기</Text>
      </TouchableOpacity> */}
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
