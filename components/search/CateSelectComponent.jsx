import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Col, Row, Grid } from 'react-native-easy-grid';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CateSelectComponent({ navigation }) {
  useEffect(() => {}, []);

  const goCataPage = (category) => {
    navigation.navigate('CatePage', category);
  };

  return (
    <>
      <View style={styles.subHeaderBox}>
        <Ionicons name='menu' size={24} />
        <Text style={styles.subHeader}>카테고리</Text>
      </View>
      <View style={styles.row}>
        <Grid>
          <Col
            onPress={() => {
              goCataPage('소설');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>소설</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('시/에세이');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>시/에세이</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('인문');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>인문</Text>
          </Col>
        </Grid>
      </View>
      <View style={styles.row}>
        <Grid>
          <Col
            onPress={() => {
              goCataPage('경제/경영');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>경제/경영</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('정치/사회');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>정치/사회</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('언어');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>언어</Text>
          </Col>
        </Grid>
      </View>
      <View style={styles.row}>
        <Grid>
          <Col
            onPress={() => {
              goCataPage('과학');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>과학</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('예술');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>예술</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('역사');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>역사</Text>
          </Col>
        </Grid>
      </View>
      <View style={styles.row}>
        <Grid>
          <Col
            onPress={() => {
              goCataPage('철학');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>철학</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('종교');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>종교</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('해외도서');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>해외도서</Text>
          </Col>
        </Grid>
      </View>
      <View style={styles.row}>
        <Grid>
          <Col
            onPress={() => {
              goCataPage('어린이');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>어린이</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('청소년');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>청소년</Text>
          </Col>
          <Col
            onPress={() => {
              goCataPage('취업/수험서');
            }}
            style={styles.block}>
            <Text style={styles.cateHeader}>취업/수험서</Text>
          </Col>
        </Grid>
      </View>
      <View style={styles.row}>
        <Grid>
          <Col
            onPress={() => {
              goCataPage('기타');
            }}
            style={styles.blockLast}>
            <Text style={styles.cateHeader}>기타</Text>
          </Col>
          <Col style={[styles.blockLast, { backgroundColor: 'white' }]}></Col>
          <Col style={[styles.blockLast, { backgroundColor: 'white' }]}></Col>
        </Grid>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { height: 50, marginHorizontal: 20, marginBottom: 15 },
  subHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  subHeader: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'SansBold',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    marginVertical: 3,
    marginHorizontal: 7,
    borderRadius: 10,
  },
  blockLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    marginVertical: 3,
    marginHorizontal: 7,
    borderRadius: 10,
  },
  cateHeader: {
    color: '#4CB73B',
    fontSize: 13,
    fontFamily: 'SansBold',
  },
});
