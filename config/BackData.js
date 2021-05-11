import { Alert } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const host = "http://3.35.216.159"

export async function login(username, email, image, navigation) {
  try {
    const result = await axios({
      method: "post",
      url: host + "/api/login",
      data: {
        username: username,
        email: email,
        image: image,
      },
    })
    if (result.data.ok == true) {
      await AsyncStorage.setItem("session", result.data.results)
      await AsyncStorage.setItem("email", email)
      navigation.push("SignPlusPage")
    } else if (result.data.ok == false) {
      Alert.alert(result.data.msg)
    }
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
    console.log("로그인완료")
  } catch (err) {
    console.log(err)
    Alert.alert("정확히 입력해 주세요.")
  }
}

export async function getuserProfile() {
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
    Alert.alert("다시 시도해 보세요.")
  }
}

// export async function getuserProfile(
//   nickname,
//   img,
//   comment,
//   star,
//   interested,
//   town
// ) {
//   try {
//     const token = await AsyncStorage.getItem("session")
//     const result = await axios({
//       method: "Get",
//       url: host + "/api/usercheck",
//       headers: {
//         token: token,
//       },

//       data: {
//         nickname: nickname,
//         img: img,
//         comment: comment,
//         star: star,
//         town: town,
//         interested: interested,
//       },
//     })
//     Alert.alert("조회 완료")
//     return result.data
//   } catch (err) {
//     console.log(err)
//     Alert.alert("다시 시도해 보세요.")
//   }
//   console.log(result)
// }

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
