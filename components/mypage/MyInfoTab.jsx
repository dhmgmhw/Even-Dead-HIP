import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  TouchableHighlight,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native"
import * as ImagePicker from "expo-image-picker"

import { Item, Input, Label, Form } from "native-base"

import DelayInput from "react-native-debounce-input"

import { Feather } from "@expo/vector-icons"
import { ProgressBar, Colors } from "react-native-paper"
import * as Google from "expo-google-app-auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { uploadImg } from "../../config/PostingApi"

// import ProgressBar from "react-native-air-progress-bar"

import Load from "../../components/Load/Load"

import { getuserProfile } from "../../config/BackData"
import { changeUserProfile } from "../../config/BackData"

import { Overlay } from "react-native-elements"

export default function MyInfoTab({ navigation }) {
  const [profile, setprofile] = useState("")
  const [changedprofile, setchangedprofile] = useState("")
  const [uploader, setUploader] = useState(false)

  const [ready, setReady] = useState(false)
  const [accessToken, setAccessToken] = useState("")
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState(null)
  const [name, setName] = useState()
  const [imageUri, setImageUri] = useState()
  const [nickName, setNickName] = useState()

  useEffect(() => {
    download()
  }, [])
  // if (!result.cancelled) {
  //   setImage(result.uri)
  // }
  // }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])

  const download = async () => {
    const result = await getuserProfile()

    setprofile(result.results)

    setNickName(result.results.username)
    setImageUri(result.results.image)
    setReady(true)
  }

  const upload = async () => {
    const formData = new FormData()
    formData.append("files", {
      uri: imageUri,
      name: "image.jpg",
    })
    await uploadImg(formData)
    let getUri = await uploadImg(formData)

    await changeUserProfile(name, getUri)
  }
  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    })
    setImageUri(result.uri)
    console.log(imageUri)
    console.log(result.uri)
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.myprofile}>
        <View
          style={{
            flexDirection: "row",
          }}>
          <View
            style={{
              flexDirection: "column",
            }}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}>
              <Image
                style={styles.profileimg}
                resizeMode="contain"
                source={{
                  uri: imageUri,
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={styles.nickname}>
                  {nickName}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={styles.email}>
                  {profile.email}
                </Text>
              </View>
            </View>

            {/* <View style={styles.editbox}> */}
            <Pressable style={styles.editbutton} onPress={toggleOverlay}>
              <Text style={styles.text}> 프로필 수정</Text>
            </Pressable>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={styles.box}>
                <Text style={styles.profiletitle}>프로필 수정</Text>
                {/* <Pressable style={styles.completebtn}>완료</Pressable> */}
                <TouchableOpacity>
                  <Text style={styles.completetext} onPress={upload}>
                    완료
                  </Text>
                </TouchableOpacity>
                <Pressable style={styles.pickpic} onPress={pickImage}>
                  <Image
                    style={styles.editprofileimg}
                    resizeMode="contain"
                    source={{
                      uri: imageUri,
                    }}
                  />
                </Pressable>

                {/* <Text style={styles.nicknamefix}>{profile.username}</Text> */}
                <Form style={styles.form}>
                  {/* <Item floatingLabel last> */}
                  {/* <Label style={styles.label}>{profile.username}</Label> */}
                  {/* <Input /> */}
                  <TextInput
                    style={styles.textInput}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder={nickName}
                  />
                  {/* </Item> */}
                </Form>
                <Text style={styles.emailfix}>{profile.email}</Text>
              </View>
            </Overlay>
            {/* </View> */}
            {/* <TouchableOpacity style={styles.logoutbtn} onPress={logOut}>
              <Text>Logout</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}>
          <View style={styles.textBox}>
            <TouchableHighlight
              style={styles.circle}
              underlayColor="#4CB73B"
              onPress={() => alert("Yaay!", console.log(profile))}>
              <>
                <Feather name="align-left" size={28} color="white" />
              </>
            </TouchableHighlight>
            <Text style={styles.lists1} color="white">
              알림
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
            <Text style={styles.lists}>댓글</Text>
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
            <Text style={styles.lists}>스크랩</Text>
          </View>
        </View>
      </View>
      <View style={styles.mystatus}>
        <Text style={styles.title}>
          콩나무 <Text style={styles.highlite}>새싹 단계</Text>
        </Text>
        <ProgressBar
          style={styles.seed}
          progress={0.6}
          color={Colors.green800}
        />
      </View>

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
    // height: 150,
    flexDirection: "column",
  },
  profileimg: {
    marginLeft: 40,
    marginTop: 10,
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  editprofileimg: {
    marginLeft: 140,
    marginTop: 10,
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  nickname: {
    marginTop: 50,
    fontWeight: "bold",
  },
  email: {
    marginTop: 5,
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
    marginLeft: 15,
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
    backgroundColor: "#4CB73B",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 350,
    height: 350,
  },
  nicknamefix: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 145,
    marginTop: 10,
    fontWeight: "700",
  },
  profileimgfix: {
    marginLeft: 45,
    marginTop: 40,
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  emailfix: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 85,
    marginTop: 5,
  },
  mystatus: {
    height: 120,
    marginTop: 30,
    backgroundColor: "#F4F4F4",
  },
  highlite: {
    fontSize: 25,
    fontWeight: "700",
    color: "#4CB73B",
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: "700",
    color: "#434343",
    textAlign: "center",
  },
  editbox: {},
  editbutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginLeft: 15,
    paddingHorizontal: 132,
    borderRadius: 4,
    elevation: 3,
  },
  pickpic: {
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 3,
    // borderRadius: 4,
    // elevation: 3,
  },
  editId: {
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingHorizontal: 5,
    elevation: 3,
  },
  // complete: {
  //   borderRadius: 4,
  //   paddingVertical: 5,
  //   paddingHorizontal: 5,
  //   elevation: 3,
  // },
  seed: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profiletitle: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    textAlign: "center",
  },
  completetext: {
    marginLeft: 300,
    color: "#4CB73B",
  },
  form: {
    width: 250,
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },
})
