import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function MyLibraryTab({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text>Open up MyLibraryTab.jsx to start working on your app!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
