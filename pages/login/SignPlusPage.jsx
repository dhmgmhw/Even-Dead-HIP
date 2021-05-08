import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"

import CheckBox from "../../components/Login/CheckBox"

import { Searchbar } from "react-native-paper"

import { Container } from "native-base"

const data = require("../../interestcategory.json")

export default function SignPlusPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")

  const onChangeSearch = query => setSearchQuery(query)
  return (
    <Container>
      <Text style={styles.setarea}>지역을 설정해주세요</Text>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <Text style={styles.ment}>관심있는 분야에 체크해주세요</Text>
      <View style={styles.bookcate}>
        {data.cateList.map((content, i) => {
          return (
            <View key={i}>
              <CheckBox style={styles.bookCard} book={content.title} />
            </View>
          )
        })}
      </View>
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
    marginTop: 30,
  },
})
