import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://3.35.216.159'
const mockhost = 'https://607434bc066e7e0017e794f9.mockapi.io/filetest'

export async function postBook(data) {
    try {
        const response = await axios({
            method: "post",
            url: host + '/api/test/string',
            headers: {
                // 'Accept': 'application/json',
                "Content-Type": "multipart/form-data;"
                // "Content-Type": "application/json;"
            },
            data: data,
        });
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        alert('데이터를 불러올 수 없습니다:(')
    }
}

export async function getPostedBook() {
    try {
        const response = await axios({
            method: "get",
            url: host + '/api/test',
        });
        console.log(response.data)
    } catch (err) {
        const error = err.response.data.err || err.message;
        Alert.alert(error);
    }
}