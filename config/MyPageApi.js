import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://13.124.182.223'

export async function getMyPost() {
    const token = await AsyncStorage.getItem("session")
    try {
        const response = await axios({
            method: "get",
            url: host + '/api/users/townbooks',
            headers: {
                token: token,
            },
        });
        // console.log(response.data.results)
        return response.data.results
    } catch (err) {
        console.log(err)
        alert('내 작성글을 조회할 수 없습니다.')
    }
}

export async function tradeConfirm(masterUserId, otherUserId, townBookId, navigation) {
    const token = await AsyncStorage.getItem("session")
    try {
        const response = await axios({
            method: "put",
            url: host + '/api/townbooks/finish/' + townBookId,
            headers: {
                token: token,
            },
            data: {
                masterUserId: masterUserId,
                otherUserId, otherUserId
            },
        });
        // return response.data
        console.log(response.data)
        navigation.replace('TradeConfirmPage')
        // console.log(response.data.msg)
    } catch (err) {
        console.log(err)
        alert('교환완료를 할 수 없어요:(')
    }
}

export async function postScrapBook(townBookId) {
    const token = await AsyncStorage.getItem("session")
    try {
        const response = await axios({
            method: "post",
            url: host + '/api/townbooks/scraps/' + townBookId,
            headers: {
                token: token,
            },
        });
        // return response.data
        console.log(response.data)
        // navigation.replace('TradeConfirmPage')
        alert('스크랩 완료, 마이페이지에서 확인해주세요!')
    } catch (err) {
        console.log(err)
        alert('스크랩 할 수 없습니다 :(')
    }
}

export async function delScrapBook(townBookId) {
    const token = await AsyncStorage.getItem("session")
    try {
        const response = await axios({
            method: "delete",
            url: host + '/api/users/scraps/' + townBookId,
            headers: {
                token: token,
            },
        });
        console.log(response.data)
        alert('스크랩을 취소했습니다')
    } catch (err) {
        console.log(err)
        alert('스크랩을 삭제 할 수 없습니다 :(')
    }
}


export async function getMyScrap() {
    const token = await AsyncStorage.getItem("session")
    try {
        const response = await axios({
            method: "get",
            url: host + '/api/users/scraps',
            headers: {
                token: token,
            },
        });
        // console.log(response.data.results)
        return response.data.results
    } catch (err) {
        console.log(err)
        alert('내 스크랩을 조회할 수 없습니다.')
    }
}
