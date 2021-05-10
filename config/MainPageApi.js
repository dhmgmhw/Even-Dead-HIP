import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://3.35.216.159'
const mockhost = 'https://607434bc066e7e0017e794f9.mockapi.io/'


export async function getPostedBook() {
    // const token = await AsyncStorage.getItem("session")
    try {
        const response = await axios({
            method: "get",
            url: host + `/api/townbooks`,
            // headers: {
            //     token: token,
            // },
        });
        // console.log(response.data)
        return response.data.results
    } catch (err) {
        console.log(err)
        alert('책장을 불러올 수 없어요:(')
    }
}



// export async function getPostedBook() {
//     try {
//         const response = await axios({
//             method: "get",
//             url: host + 'api/townbooks',
//         });
//         console.log(response)
//         // return response.data
//     } catch (err) {
//         const error = err.response.data.err || err.message;
//         Alert.alert(error);
//     }
// }