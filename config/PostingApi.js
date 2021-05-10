import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = 'http://3.35.216.159'
const mockhost = 'https://607434bc066e7e0017e794f9.mockapi.io/'

export async function uploadImg(data) {
    try {
        const response = await axios({
            method: "post",
            url: host + '/api/images',
            data: data,
        });
        return response.data
        // console.log(data)
    } catch (err) {
        console.log(err)
        alert('이미지 업로드 오류')
    }
}

export async function postBook(data) {
    // console.log(data)
    try {
        const response = await axios({
            method: "post",
            // url: host + '/api/townbooks',
            url: mockhost + '/towndata',
            data: data,
        });
        // return response.data
        console.log(response.data.msg)
        alert('게시글을 올렸어요!')
    } catch (err) {
        console.log(err)
        alert('게시글을 올릴 수 없어요:(')
    }
}

export async function updatePost(data, id) {
    console.log(data)
    try {
        await axios({
            method: "put",
            // url: host + '/api/townbooks',
            url: mockhost + '/towndata/' + id,
            data: data,
        });
        alert('게시글 수정 완료!')
    } catch (err) {
        console.log(err)
        alert('게시글을 수정할 수 없어요:(')
    }
}

export async function deletePost(id) {
    try {
        await axios({
            method: "delete",
            url: mockhost + '/towndata/' + id,
        });
        alert('게시글 삭제 완료')
    } catch (err) {
        console.log(err)
        alert('게시글을 삭제할 수 없습니다.')
    }
}


export async function postComment(data, id) {
    try {
        const response = await axios({
            method: "post",
            // url: host + '/api/townbooks',
            url: mockhost + '/towndata/comments/' + id,
            data: data,
        });
        // return response.data
        console.log(response.data)
        console.log(response.data.msg)
    } catch (err) {
        console.log(err)
        alert('댓글을 남길 수 없어요:(')
    }
}

export async function deleteComment(id) {
    try {
        await axios({
            method: "delete",
            url: mockhost + '/towndata/comments/' + id,
        });
        alert('댓글 삭제 완료')
    } catch (err) {
        console.log(err)
        alert('댓글을 삭제할 수 없습니다.')
    }
}
