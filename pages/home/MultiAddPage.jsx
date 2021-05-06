import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import StatusBarPlaceHolder from '../../components/AddPage/StatusBarPlaceHolder';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomNavigator from '../../components/AddPage/CustomTopNavigator';

const ForceInset = {
  top: 'never',
  bottom: 'never',
};

export default function MultiAddPage({ navigation, route }) {
  const func = route.params;

  useEffect(() => {}, []);

  const onDone = (data) => {
    func(data);
    // console.log(data);
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
                // width: 200,
                // height: 200,
                compress: 0.5,
              },
              assetsType: ['photo'],
              maxSelections: 5,
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
                buttonTextStyle: _textStyle,
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

const _textStyle = {
  color: 'black',
  fontFamily: 'SCDream5',
};
const _buttonStyle = {
  backgroundColor: 'black',
  borderRadius: 18,
};

// if you want to use defaultTopNavigator you must send in basic style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
