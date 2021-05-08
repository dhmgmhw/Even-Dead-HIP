import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native"

import CheckBox from "../../components/Login/CheckBox"

import { signdetail } from "../../config/BackData"

import { Searchbar } from "react-native-paper"
import DropDownPicker from "react-native-dropdown-picker"

import { Container, ScrollView } from "native-base"

const diviceWidth = Dimensions.get("window").width
const diviceHeight = Dimensions.get("window").height

const data = require("../../interestcategory.json")

const numcolumns = "3"

// let checkList = []

export default function SignPlusPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [input, setInput] = useState("")
  const [regionInfo, setRegionInfo] = useState("")
  const [checkList, setcheckList] = useState("")

  const onChangeSearch = query => setSearchQuery(query)
  return (
    <Container style={styles.container}>
      <Text style={styles.setarea}>지역을 설정해주세요</Text>
      <DropDownPicker
        items={[
          { label: "종로구", value: "종로구" },
          { label: "중구", value: "중구" },
          { label: "용산구", value: "용산구" },
          { label: "성동구", value: "성동구" },
          { label: "서대문구", value: "서대문구" },
          { label: "마포구", value: "마포구" },
          { label: "양천구", value: "양천구" },
          { label: "강서구", value: "강서구" },
          { label: "구로구", value: "구로구" },
          { label: "금천구", value: "금천구" },
          { label: "영등포구", value: "영등포구" },
          { label: "동작구", value: "동작구" },
          { label: "관악구", value: "관악구" },
          { label: "서초구", value: "서초구" },
          { label: "강남구", value: "강남구" },
          { label: "송파구", value: "송파구" },
          { label: "강동구", value: "강동구" },
        ]}
        showArrow={false}
        labelStyle={{ fontFamily: "SCDream5" }}
        placeholder="사는 지역을 선택해 주세요"
        containerStyle={styles.dropBox}
        onChangeItem={item => {
          setRegionInfo(item.value)
        }}
      />
      <Pressable
        style={{ width: 100, height: 100, backgroundColor: "red" }}
        onPress={() => {
          console.log(checkList, setcheckList)
          // console.log(setRegionInfo(item.value))

          // signdetail(setRegionInfo(item.value), setcheckList(content.title))
          signdetail("상구", ["#문학", "#철학"])
        }}></Pressable>
      {/* <View style={styles.searchbox}>
        <Searchbar
          style={styles.searchbar}
          placeholder="지역명 검색 예) 강남구"
          onChangeText={onChangeSearch}
          value={searchQuery}.
        />
        <StatusBar style="auto" />
      </View> */}

      <View style={styles.interest}>
        <Text style={styles.ment}>관심있는 분야에 체크해주세요</Text>
      </View>
      <SafeAreaView>
        {/* <ScrollView> */}
        {/* <FlatList> */}
        <View style={styles.bookcate}>
          {data.cateList.map((content, i) => {
            return (
              <Pressable
                style={styles.ListBox}
                key={i}
                onpressIn={() => {
                  checkList.content.title
                  setcheckList(content.title)
                }}
                // onPress={() => {
                //   checkList.push(content.title)
                // }}
              >
                <CheckBox
                  style={styles.bookCard}
                  book={content.title}
                  numcolumns={3}
                />
              </Pressable>
            )
          })}
        </View>
        {/* </FlatList> */}
        {/* </ScrollView> */}
      </SafeAreaView>
    </Container>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    marginLeft: 20,
    marginTop: 50,
  },
  setarea: {
    marginTop: 100,
    marginLeft: 100,
  },
  ment: {
    marginTop: 100,
    marginLeft: 100,
  },
  bookcate: {
    // flexDirection: "row",
    marginTop: 30,
  },
  ListBox: {
    padding: 5,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bookCard: {
    height: 40,
    padding: 10,
    margin: 10,
    borderWidth: 0.1,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dropBox: { height: 50, width: diviceWidth },
})
