import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://13.124.182.223'
// const host = 'http://3.34.178.136'
// const host = 'http://3.37.61.239'
// const host = 'http://3.34.190.10'


export async function searchBook(book) {
    try {
        const response = await axios({
            method: "get",
            url: host + '/api/townbooks/search?keyword=' + book,
        });
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        alert('검색 오류 :(')
    }
}

export async function searchByCate(cate) {
    try {
        // console.log(cate)
        const token = await AsyncStorage.getItem("session")
        const response = await axios({
            method: "post",
            url: host + '/api/townbooks/category',
            headers: {
                'Content-Type': 'application/json',
                token: token,
            },
            data: cate,
        });
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        alert('검색을 할 수 없습니다:(')
    }
}