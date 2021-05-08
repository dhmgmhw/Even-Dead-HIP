import React, { useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';

import { Tooltip } from 'react-native-elements';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CommentBubbleComponent() {
  return (
    <View style={styles.bubbleBox}>
      <View style={styles.userImgBox}>
        <Image
          style={styles.userImg}
          resizeMode='cover'
          source={{
            uri:
              'http://c.files.bbci.co.uk/E866/production/_104449495_c32b76d3-5990-4bea-9304-ba818d87be15.jpg',
          }}
        />
      </View>
      <View style={styles.commentBox}>
        <Text style={styles.commentText}>
          ..다..🐬..다..🐬..다..🐬..다...🐬...다다다..🐬...다다다...🌀🌀또🌀물보라를🌀일으켜🌀🌀
          ..다..🐬..다..🐬..다..🐬..다...🐬...다다다..🐬...다다다...🌀🌀또🌀물보라를🌀일으켜🌀🌀
          ..다..🐬..다..🐬..다..🐬..다...🐬...다다다..🐬...다다다...🌀🌀또🌀물보라를🌀일으켜🌀🌀
          ..다..🐬..다..🐬..다..🐬..다...🐬...다다다..🐬...다다다...🌀🌀또🌀물보라를🌀일으켜🌀🌀
          ..다..🐬..다..🐬..다..🐬..다...🐬...다다다..🐬...다다다...🌀🌀또🌀물보라를🌀일으켜🌀🌀
          ..다..🐬..다..🐬..다..🐬..다...🐬...다다다..
        </Text>
        <View style={styles.optionBox}>
          <Text style={styles.commentText}>by. 내이름은 푸</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dataText}>2021.04.29 </Text>
            <Tooltip
              withOverlay={false}
              containerStyle={{
                height: 60,
                backgroundColor: '#438732',
              }}
              pointerColor={'#438732'}
              popover={
                <>
                  <Pressable
                    style={styles.tooltipBtn}
                    onPress={() => {
                      console.log('Fix');
                    }}>
                    <Text style={styles.tooltipText}>수정</Text>
                  </Pressable>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: 'white',
                      width: 100,
                    }}></View>
                  <Pressable
                    style={styles.tooltipBtn}
                    onPress={() => {
                      console.log('Delete');
                    }}>
                    <Text style={styles.tooltipText}>삭제</Text>
                  </Pressable>
                </>
              }>
              <Text style={styles.dataText}>| 수정 및 삭제</Text>
            </Tooltip>
          </View>
          {/* <Pressable
            style={{ flexDirection: 'row' }}
            onPress={() => {
              console.log('삭제');
            }}>
            <Text style={styles.dataText}>2021.04.29 </Text>
            <Text style={styles.dataText}>| 삭제하기</Text>
          </Pressable> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleBox: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  userImgBox: {},
  userImg: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  commentBox: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  commentText: {
    fontSize: 13,
    fontFamily: 'SCDream4',
  },
  optionBox: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataText: {
    fontSize: 12,
    fontFamily: 'SCDream4',
    color: '#898989',
  },
  tooltipBtn: {
    width: 100,
    height: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    fontFamily: 'SCDream5',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});
