import { Alert } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const host = "http://13.124.182.223"
// const host = "http://13.124.182.223"

let sock = new SockJS('http://13.124.182.223/ws-stomp');
let ws = Stomp.over(sock);

export async function getMyRoom() {
    const token = await AsyncStorage.getItem('session');
    try {
        const response = await axios({
            method: 'get',
            url: 'http://13.124.182.223/api/chat/rooms',
            headers: {
                token: token,
            },
        });
        return (response.data.results);
    } catch (err) {
        console.log(err);
    }
};

export async function sockConnect() {
    const token = await AsyncStorage.getItem('session');
    try {
        const response = await axios({
            method: 'get',
            url: 'http://13.124.182.223/ws-stomp',
            headers: {
                token: token,
            },
        });
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
};

export async function makingChatRoom(myEmail, youEmail, book) {
    const token = await AsyncStorage.getItem('session');
    try {
        const response = await axios({
            method: 'post',
            url: 'http://13.124.182.223/api/chat/create',
            data: {
                roomId: book.id + youEmail + myEmail,
                roomName: book.title,
                image: book.image,
                chatUser: [myEmail, youEmail],
                townBookId: book.id
            },
            headers: {
                token: token,
            },
        });
        return (response.data.results);
    } catch (err) {
        console.log(err);
    }
};
