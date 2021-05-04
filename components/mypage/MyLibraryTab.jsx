import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MyBookComponent from './MyBookComponent';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function MyLibraryTab({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabTitleBox}>
        <Feather name='book' size={28} color='black' />
        <Text
          style={{
            fontFamily: 'SCDream5',
            fontSize: 18,
            marginHorizontal: 10,
          }}>
          내 서재
        </Text>
      </View>
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
      <MyBookComponent navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  tabTitleBox: {
    width: diviceWidth,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
