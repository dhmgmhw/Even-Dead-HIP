import { Alert } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Stomp from "stompjs";
import SockJS from "sockjs-client";

let sock = new SockJS('http://3.34.178.136/ws-stomp');
let ws = Stomp.over(sock);


export async function getMyRoom() {
    const token = await AsyncStorage.getItem('session');
    try {
        const response = await axios({
            method: 'get',
            url: 'http://3.34.178.136/api/chat/rooms',
            headers: {
                token: token,
            },
        });
        return (response.data.results);
    } catch (err) {
        console.log(err);
    }
};

export async function connectServer() {
    const token = await AsyncStorage.getItem('session');
    ws.connect(
        {
            token: token,
        },
        function (frame) {
            console.log('소캣연결성공', frame);
        }
    );
};

export async function sockConnect() {
    const token = await AsyncStorage.getItem('session');
    try {
        const response = await axios({
            method: 'get',
            url: 'http://3.34.178.136/ws-stomp',
            headers: {
                token: token,
            },
        });
        console.log(response.data);
        // Welcome to SockJS!
    } catch (err) {
        console.log(err);
    }
};

export async function makingChatRoom(myEmail, youEmail) {
    const token = await AsyncStorage.getItem('session');
    try {
        const response = await axios({
            method: 'post',
            url: 'http://3.34.178.136/api/chat/create',
            data: {
                chatUser: [myEmail, youEmail],
            },
            headers: {
                token: token,
            },
        });
        return (response.data.results);
        // 여기에 방 정보가 담겨있어
    } catch (err) {
        console.log(err);
    }
};

export async function enterChatAndSub(roomId) {
    const token = AsyncStorage.getItem('session');
    try {
        const response = await axios({
            method: 'get',
            url: 'http://3.34.178.136/api/chat/enter/' + roomId,
            headers: {
                token: token,
            },
        });
        console.log(response.data);
        ws.subscribe(
            'http://3.34.178.136/sub/chat/room/' + roomId,
            function (res) {
                console.log(JSON.parse(res.body));
            }
        );
    } catch (err) {
        console.log(err);
    }
};


