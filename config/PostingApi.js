import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://3.35.216.159'
const mockhost = 'https://607434bc066e7e0017e794f9.mockapi.io'

export async function postBook(data, navigation) {
    try {
        await axios({
            method: 'post',
            url: mockhost + '/api',
            data: data
        });
        navigation.pop()
        Alert.alert('정상적으로 글을 올렸습니다!');
    } catch (err) {
        console.log(err)
    }
}

export async function imageUpload(data) {
    try {
        const response = await axios({
            method: 'post',
            url: mockhost + '/api/filetest',
            data: data
        });
        console.log('이미지 업로드 성공');
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function testUpload(imageData) {
    console.log(imageData)
    const formData = new FormData();
    formData.append('files', {
        "uri": imageData.uri,
        "type": imageData.type,
    });
    try {
        await axios.post({
            method: 'post',
            url: mockhost + '/filetest',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } catch (err) {
        Alert.alert('sers');
        console.log(err)
    }
}

// export async function testGet() {
//     try {
//         const result = await axios({
//             method: "get",
//             url: mockhost + '/filetest',
//         });
//         console.log(result.data)
//     } catch (err) {
//         alert('sers')
//         console.log(err)
//     }
// }
