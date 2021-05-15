import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function KakaoResultCardComponent({ book }) {
  const bookCover =
    book.thumbnail == ''
      ? require('../../assets/splash.png')
      : { uri: book.thumbnail };
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 90, height: 130 }}
        resizeMode='contain'
        source={bookCover}
      />
      <View style={{ padding: 15 }}>
        <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>
          {book.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.publisher}>
          {book.publisher}
        </Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.authors}>
          {book.authors}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  title: { fontSize: 15, width: 200, fontFamily: 'SCDream6', marginBottom: 15 },
  publisher: { fontFamily: 'SCDream3', marginBottom: 15 },
  authors: { fontFamily: 'SCDream5' },
});
