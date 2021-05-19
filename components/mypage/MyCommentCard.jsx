import React from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"

export default function MyCommentCard({ navigation, DoctorList }) {
  return (
    <TouchableOpacity style={styles.CommentCard}>
      {/*  사진 */}
      {/* <Image source={{ uri: DoctorList.img }} style={styles.DoctorImage} /> */}
      {/* 이름 */}
      <View style={styles.TextBox}>
        {/* <Text style={styles.userName}>{CommentLists.username}</Text> */}
        {/* <Text style={styles.comment}>{CommentLists.comment}</Text> */}
        <Text>아아</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  CommentCard: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginTop: 50,
    margin: 20,
    borderWidth: 2,
    borderColor: "#09C5F9",
    borderRadius: 15,
  },
  // DoctorImage: {
  //   height: 160,
  //   width: 160,
  //   borderRadius: 240,
  //   resizeMode: 'cover',
  // },
  TextBox: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 30,
    paddingLeft: 30,
  },
  comment: { paddingLeft: 30 },
})
