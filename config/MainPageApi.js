import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://3.35.216.159'
const mockhost = 'https://607434bc066e7e0017e794f9.mockapi.io/'


export async function getPostedBook(page) {
    try {
        const token = await AsyncStorage.getItem("session")
        const response = await axios({
            method: "get",
            url: host + "/api/townbooks?page=" + page,
            headers: {
                token: token,
            },
        });
        // console.log(response.data.results.content)
        if (response.data.results.content == null) {
            console.log('데이터 없음')
        } else {
            return response.data.results.content
        }
    } catch (err) {
        console.log(err)
    }
}