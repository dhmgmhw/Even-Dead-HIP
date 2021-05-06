import React, { useState } from "react"
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
  const [email, setemail] = useState("")
  // const [id, setid] = useState("")

  const [username, setusername] = useState("")

  const [image, setimage] = useState("")

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
      setJsonObject(json_rep)
      alert(`Hi ${user.email}, your id is ${user.id}`)
      // navigation.push("TabNavigator")
    } else {
      alert(`Cancel`)
    }
    login(user.name, user.email, user.photoUrl)
    // console.log(user)
    // navigation.push("TabNavigator")
  }

  _onAuthFacebook = async () => {
    try {
      await Facebook.initializeAsync("3939632819489550")
      //   원래 39~대신에 facebook_app_id(env)
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
        alert(`Hi ${json_rep.email}, your id is ${json_rep.id}!`)
      } else {
        alert(`Cancel`)
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
      await login(email, username, image)
    }
    await login(email, username, image)
    navigation.push("TabNavigator")
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={_onAuthGoogle}
        style={[styles.button, { backgroundColor: "#4285F4" }]}>
        <FontAwesome name="google" size={17} color="#ffffff" />
        <Text style={styles.text}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_onAuthFacebook}
        style={[styles.button, { backgroundColor: "#3b5998" }]}>
        <FontAwesome name="facebook" size={17} color="#ffffff" />
        <Text style={styles.text}>Sign in with Facebook</Text>
      </TouchableOpacity>
      <View style={styles.tree}>
        <JSONTree data={jsonObject} />
      </View>
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
})
