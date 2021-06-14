import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import StatusBarPlaceHolder from '../../components/AddPage/StatusBarPlaceHolder';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomNavigator from '../../components/AddPage/CustomTopNavigator';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function MultiAddPage({ navigation, route }) {
  const func = route.params;

  const onDone = (data) => {
    func(data);
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBarPlaceHolder />
        <View style={styles.container}>
          <AssetsSelector
            options={{
              manipulate: {
                compress: 0.1,
              },
              assetsType: ['photo'],
              maxSelections: 3,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: 'white',
              videoIcon: {
                Component: Ionicons,
                iconName: 'videocam',
                color: 'tomato',
                size: 20,
              },
              selectedIcon: {
                Component: Ionicons,
                iconName: 'checkmark-circle-outline',
                color: 'white',
                bg: '#0eb14970',
                size: 26,
              },
              spinnerColor: 'grey',
              onError: () => {},
              noAssets: () => <View></View>,
              defaultTopNavigator: {
                continueText: '선택완료',
                goBackText: '뒤로',
                selectedText: 'Selected',
                midTextColor: 'blue',
                buttonTextStyle: styles.textStyle,
                backFunction: goBack,
                doneFunction: (data) => {
                  onDone(data);
                  navigation.pop();
                },
              },
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    bottom: getStatusBarHeight() / 2,
    marginTop: Platform.OS === 'ios' ? 0 : 30,
  },
  textStyle: {
    color: 'black',
    fontFamily: 'SCDream5',
  },
});
