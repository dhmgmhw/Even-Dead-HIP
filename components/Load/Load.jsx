import React from "react"
import { View, Text, StyleSheet } from "react-native"
// import { color } from 'react-native-reanimated';

export default function Load() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로딩중...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c5beb6",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
})
