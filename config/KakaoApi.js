import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APIkey = '5a1df72433fbadf7adddb2ee65dc6a33'

export async function getSearchBook(searchTitle) {
    try {
        const response = await axios({
            method: "get",
            url: 'https://dapi.kakao.com/v3/search/book?target=title',
            params: {
                query: searchTitle
            },
            headers: {
                Authorization: `KakaoAK ${APIkey}`,
            },
        });
        // console.log(response.data)
        return response.data;
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}