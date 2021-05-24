import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://13.124.182.223'
// const host = 'http://3.34.161.181'
// const host = 'http://3.37.61.239'
// const host = 'http://3.34.190.10'


export async function getPostedBook(page) {
    console.log('Page is ' + page)
    try {
        const token = await AsyncStorage.getItem("session")
        const response = await axios({
            method: "get",
            url: host + "/api/townbooks?page=" + page,
            headers: {
                token: token,
            },
        });
        if (response.data.results == null) {
            console.log('데이터 없음')
        } else {
            return response.data.results.content
        }
    } catch (err) {
        console.log(err)
    }
}
