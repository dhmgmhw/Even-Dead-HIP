import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://3.35.216.159'
const mockhost = 'https://607434bc066e7e0017e794f9.mockapi.io/'


export async function searchBook(book) {
    try {
        const response = await axios({
            method: "post",
            url: host + `/api/townbooks?q=` + book,
        });
        return response.data
    } catch (err) {
        console.log(err)
        alert('검색을 할 수 없습니다:(')
    }
}