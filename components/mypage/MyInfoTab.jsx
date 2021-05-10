import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  TouchableHighlight,
  SafeAreaView,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import * as Google from "expo-google-app-auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Load from "../../components/Load/Load"

import { Overlay } from "react-native-elements"

import { getuserProfile } from "../../config/BackData"

c
export default function MyLibraryTab({ navigation }) {
  const [profile, setprofile] = useState("")
  const [username, setusername] = useState([])
  const [ready, setReady] = useState(false)
  const [accessToken, setAccessToken] = useState("")
  const [visible, setVisible] = useState(false)
  // const toggleOverlay = () => {
  //   setVisible(!visible)
  // }
  useEffect(() => {
    download()
  }, [])

  const download = async () => {
    const result = await getuserProfile()
    setprofile(result.results)
    console.log(profile)
    console.log(accessToken)
    setReady(true)
  }

  // const signoutWithGoogleAsync = async () => {
  //   const { accessToken } = await getAuthenticationTokens()
  //   await Google.logOutAsync({
  //     accessToken,
  //     ...config,
  //   })
  //   await storeAuthenticationTokens("", "")

  // await Google.logInAsync(config)

  // if (type === "success") {
  /* Log-Out */
  // await Google.logOutAsync({ accessToken, ...config })
  /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
  // }
  // try {
  //   console.log("token in delete", accessToken)
  //   await Google.logOutAsync({
  //     accessToken,
  //     iosClientId:
  //       "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",
  //     androidClientId:
  //       "161728779966-m3u3d79dtk3f1eac5922csif029sokdd.apps.googleusercontent.com",
  //   })
  //   // 클리어
  // } catch (err) {
  //   throw new Error(err)
  // }
  // }
  const logOut = async () => {
    const logOutConfig = {
      iosClientId:
        "161728779966-berb0fukqq2aidubgq4v5o04h56b9hvr.apps.googleusercontent.com",

      androidClientId:
        "161728779966-m3u3d79dtk3f1eac5922csif029sokdd.apps.googleusercontent.com",
    }

    await Google.logOutAsync({ accessToken, ...logOutConfig })
    setAccessToken("")
    // setIsUserLoggedIn(false);
    // setIsTruckOwnerLoggedIn(false);
    console.log("you have been logged out")
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.myprofile}>
        <View
          style={{
            flexDirection: "row",
          }}>
          <Image
            style={styles.profileimg}
            resizeMode="contain"
            source={{
              uri: profile.image,
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginLeft: 20,
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.nickname}>
              {profile.username}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}>
              <Text style={styles.likenum}>좋아요</Text>
              <Text style={styles.num}>6 |</Text>
              <Text style={styles.follownum}>팔로잉</Text>
              <Text style={styles.num}>9</Text>
            </View>
            {/* <View>
              <Button title="Open Overlay" onPress={toggleOverlay} />

              <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text>Hello from Overlay!</Text>
              </Overlay>
            </View> */}
            <Button
              style={styles.profileedit}
              title="프로필 수정"
              color="#6864FF"></Button>
            <TouchableOpacity style={styles.logoutbtn} onPress={logOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}>
          <View style={styles.textBox}>
            <TouchableHighlight
              style={styles.circle}
              underlayColor="#C6C5FF"
              onPress={() => alert("Yaay!")}>
              <>
                <Feather name="align-left" size={28} color="white" />
              </>
            </TouchableHighlight>
            <Text style={styles.lists1} color="white">
              댓글
            </Text>
          </View>

          <View style={styles.recommendlist}>
            <TouchableHighlight
              style={styles.circle}
              underlayColor="#C6C5FF"
              onPress={() => console.log(profile)}>
              <>
                <Feather name="thumbs-up" size={28} color="white" />
              </>
            </TouchableHighlight>
            <Text style={styles.lists}>추천목록</Text>
          </View>
          <View style={styles.likelist}>
            <TouchableHighlight
              style={styles.circle}
              underlayColor="#C6C5FF"
              onPress={() => {
                console.log("ya")
              }}>
              <>
                <Feather name="heart" size={28} color="white" />
              </>
            </TouchableHighlight>
            <Text style={styles.lists}>관심목록</Text>
          </View>
        </View>
      </View>
      <View style={styles.bigborder}></View>

      <TouchableOpacity
        style={styles.deal}
        onpress={() => console.log(profile)}>
        <Text style={styles.downcompo}>거래내역</Text>
        <Feather
          style={styles.rarrow}
          name="chevron-right"
          size={28}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.border}></View>
      <TouchableOpacity
        style={styles.logoutbtn}
        // onPress={signoutWithGoogleAsync}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.myliketext}>
        <Text style={styles.downcompo}>내가 좋아한 글</Text>

        <Feather
          style={styles.rarrow1}
          name='chevron-right'
          size={28}
          color='black'
        />
      </TouchableOpacity>

      <View style={styles.border}></View>
      <TouchableOpacity style={styles.mycomment}>
        <Text style={styles.downcompo}>내가 쓴 댓글</Text>
        <Feather
          style={styles.rarrow2}
          name='chevron-right'
          size={28}
          color='black'
        />
      </TouchableOpacity>

      <View style={styles.border}></View>
      <TouchableOpacity style={styles.invitefriend}>
        <Text style={styles.downcompo}>친구초대</Text>
        <Feather
          style={styles.rarrow3}
          name='chevron-right'
          size={28}
          color='black'
        />
      </TouchableOpacity>
      <View style={styles.border}></View> */}
    </ScrollView>
  )
  // : (
  //   <Load />
  // )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  bigborder: {
    height: 10,
    backgroundColor: "#f2f2f2",
  },
  border: {
    height: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
  },
  deal: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  mycomment: {
    flex: 1,
    height: 60,
    flexDirection: "row",
  },
  invitefriend: {
    height: 60,
    flexDirection: "row",
  },
  myliketext: {
    height: 60,
    flexDirection: "row",
  },
  myprofile: {
    height: 250,
  },
  profileimg: {
    marginLeft: 20,
    marginTop: 40,
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  nickname: {
    marginTop: 50,
    fontWeight: "bold",
  },
  likenum: {
    marginTop: 5,
  },
  follownum: {
    marginTop: 5,
    marginLeft: 5,
  },
  profileedit: {
    height: "50%",
    width: "100%",
    borderRadius: 100,
    marginTop: 50,
  },
  textBox: {
    marginLeft: 40,
    marginTop: 20,
    flexDirection: "column",
  },
  recommendlist: {
    marginLeft: 70,
    marginTop: 20,
    flexDirection: "column",
  },
  likelist: {
    marginLeft: 70,
    marginTop: 20,
    flexDirection: "column",
  },
  lists: {
    marginTop: 10,
  },
  lists1: {
    marginTop: 10,
    marginLeft: 15,
  },
  downcompo: {
    fontWeight: "bold",
  },
  rarrow: {},
  rarrow1: {
    marginLeft: 240,
    marginTop: 10,
  },
  rarrow2: {
    marginLeft: 250,
    marginTop: 10,
  },
  rarrow3: {
    marginLeft: 270,
    marginTop: 10,
  },
  num: {
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
  },
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "#C6C5FF",
    justifyContent: "center",
    alignItems: "center",
  },
})
