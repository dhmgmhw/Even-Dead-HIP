import React from "react"
import { StyleSheet, Text } from "react-native"
import { Item, Input, Label } from "native-base"
export default function ItemInput({ title, type, setFunc, error }) {
  return (
    <>
      <Item floatingLabel last>
        <Label style={styles.label}>{title}</Label>
        <Input
          style={styles.input}
          secureTextEntry={type == "password" ? true : false}
          //태그에 값이 입력되는 동시에 어떤 값이 입력되는 지 바로바로 뱉는 속성함수
          onChangeText={text => {
            setFunc(text)
          }}
        />
      </Item>

      <Item style={{ borderColor: "transparent" }}>
        <Text style={{ color: "deeppink" }}>{error}</Text>
      </Item>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    color: "#959A9C",
  },
  input: {
    color: "#959A9C",
  },
})
