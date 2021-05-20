import { Alert } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const host = "http://13.124.182.223"

export async function register(
  username,
  email,
  password,
  navigation
) {
  try {
    const result = await axios({
      method: "post",
      url: host + "/api/signup",
      data: {
        username: username,
        password: password,
        email: email,
      },
    })
    console.log(result.data)
    navigation.pop()
    Alert.alert("회원가입이 완료되었습니다.")
  } catch (err) {
    console.log(err)
    Alert.alert("회원가입 할 수 없습니다.")
  }
}


export async function login(email, password, navigation) {
  try {
    const result = await axios({
      method: "post",
      url: host + "/api/login",
      data: {
        email: email,
        password: password,
      },
    })
    console.log(result.data)
    await AsyncStorage.setItem("session", result.data.token)
    await AsyncStorage.setItem("email", result.data.email)
    navigation.push("SignPlusPage")
  } catch (err) {
    console.log(err)
    Alert.alert("로그인 할 수 없습니다.")
  }
}

export async function signdetail(town) {
  try {
    const token = await AsyncStorage.getItem("session")
    const result = await axios({
      method: "Put",
      url: host + "/api/profile",
      headers: {
        token: token,
      },
      data: {
        town: town,
      },
    })
    console.log(result)
  } catch (err) {
    console.log(err)
    Alert.alert("동네를 설정할 수 없어요:(")
  }
}

export async function getUserProfile() {
  try {
    const token = await AsyncStorage.getItem("session")
    const result = await axios({
      method: "Get",
      url: host + "/api/usercheck",
      headers: {
        token: token,
      },
    })
    console.log("조회 완료")
    return result.data
  } catch (err) {
    console.log(err)
    Alert.alert("유저 정보를 받아올 수 없어요 :(")
  }
}

export async function changeUserProfile(username, image) {
  try {
    console.log(username, image)
    const token = await AsyncStorage.getItem("session")
    const result = await axios({
      method: "put",
      url: host + "/api/profile",
      headers: {
        token: token,
      },
      data: {
        image: image,
        username: username,
      },
    })
    console.log(result.data)
    Alert.alert("변경 완료")
    return result.data
  } catch (err) {
    console.log(err)
    Alert.alert("다시 시도해 보세요.")
  }
}

export async function signOut(navigation) {
  try {
    await AsyncStorage.clear()
    Alert.alert("로그아웃합니다")
    navigation.push("SignInPage")
  } catch (err) {
    Alert.alert("로그아웃 오류가 발생했습니다")
    console.log(err)
  }
}

