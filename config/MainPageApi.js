import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://3.35.216.159'
const mockhost = 'https://607434bc066e7e0017e794f9.mockapi.io/'


export async function testGetPost(page, size) {
    try {
        const response = await axios({
            method: "get",
            url: host + `/api/townbooks/page?page=${page}&size=${size}&sortBy=CreatedAt&isAsc=False`,
        });
        console.log(response.data.content)
        return response.data.content
    } catch (err) {
        console.log(err)
        alert('데이터를 불러올 수 없습니다:(')
    }
}



export async function getPostedBook() {
    try {
        const response = await axios({
            method: "get",
            url: mockhost + '/towndata',
        });
        return response.data
    } catch (err) {
        const error = err.response.data.err || err.message;
        Alert.alert(error);
    }
}