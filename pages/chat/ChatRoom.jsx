import React, { useState, useCallback, useEffect } from "react"
import { StyleSheet, Text, View, Dimensions, Keyboard } from "react-native"
import { GiftedChat } from "react-native-gifted-chat"
import ChatHeader from "../../components/chat/ChatHeader"
import SockJS from "sockjs-client"
import SockJsClient from "react-stomp"

const diviceWidth = Dimensions.get("window").width
const diviceHeight = Dimensions.get("window").height

const chats = [
  {
    _id: 1,
    text: "돌림노래야이야",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "아이유",
      avatar:
        "https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/01/57f00c7a-6fb6-49b1-905f-2438e4f7897a.jpg",
    },
  },
]

export default function ChatRoom({ navigation }) {
  const [messages, setMessages] = useState(chats)

  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: "/api/ws",
      connectHeaders: {
        login: "user",
        passcode: "password",
      },
      debug: function (str) {
        console.log(str)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
  }, [])

  useEffect(() => {
    const options = {
      url: `/api/chat/enter/${5}`,
      method: "GET",
    }
  })

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
    Keyboard.dismiss()
  }, [])

  return (
    <>
      <ChatHeader navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <GiftedChat
          placeholder={"메시지를 입력해 주세요."}
          renderAvatarOnTop={true}
          textInputStyle={styles.input}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 15,
    marginHorizontal: 10,
    paddingLeft: 20,
    paddingTop: 7,
  },
})
