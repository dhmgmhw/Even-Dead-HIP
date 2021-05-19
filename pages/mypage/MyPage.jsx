import { Container } from "native-base"
import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native"

import MyCommentCard from "../../components/mypage/MyCommentCard"

import Load from "../../components/Load/Load"

import { getUserComment } from "../../config/BackData"

export default function MyPage({ navigation }) {
  const [CommentLists, setCommentLists] = useState()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    download()
  }, [])

  const download = async () => {
    const result = await getUserComment()
    setCommentLists(result)
    setReady(true)
  }

  return ready ? (
    <Container>
      <ScrollView>
        <Text>아아</Text>
        {/* <MyCommentCard

          CommentList={CommentList}
          key={i}
          navigation={navigation}
        /> */}
      </ScrollView>
    </Container>
  ) : (
    <Load />
  )
}
