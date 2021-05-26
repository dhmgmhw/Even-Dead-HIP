import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import StatusBarPlaceHolder from '../../components/AddPage/StatusBarPlaceHolder';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomNavigator from '../../components/AddPage/CustomTopNavigator';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const ForceInset = {
  top: 'never',
  bottom: 'never',
};

export default function MultiAddPage({ navigation, route }) {
  const func = route.params;

  const onDone = (data) => {
    func(data);
  };

  const goBack = () => {
    navigation.pop();
  };
  const [image, setimage] = useState();

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <StatusBarPlaceHolder />
        <View style={styles.container}>
          <AssetsSelector
            options={{
              manipulate: {
                compress: 0,
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
                buttonTextStyle: textStyle,
                backFunction: goBack,
                doneFunction: (data) => {
                  onDone(data);
                  navigation.pop();
                },
              },
            }}
          />
        </View>
        <Text>{image}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const textStyle = {
  color: 'black',
  fontFamily: 'SCDream5',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    bottom: getStatusBarHeight() / 2,
    marginTop: Platform.OS === 'ios' ? 0 : 30,
  },
});
