import * as React from "react"
import { Text, View, StyleSheet, SafeAreaView, Alert } from "react-native"
import { AssetsSelector } from "expo-images-picker"
import { Ionicons } from "@expo/vector-icons"
import StatusBarPlaceHolder from "../../components/AddPage/StatusBarPlaceHolder"
import { SafeAreaProvider } from "react-native-safe-area-context"
import CustomNavigator from "../../components/AddPage/CustomTopNavigator"

const ForceInset = {
  top: "never",
  bottom: "never",
}

export default function MultiAddPage() {
  const onDone = data => {
    Alert.alert("Selected items are", JSON.stringify(data))
  }

  const goBack = () => {
    console.log("Going back use Navigator goBack() hook")
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <StatusBarPlaceHolder />
        <View style={styles.container}>
          <AssetsSelector
            options={{
              assetsType: ["photo", "video"],
              maxSelections: 3,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: "white",
              videoIcon: {
                Component: Ionicons,
                iconName: "ios-videocam",
                color: "tomato",
                size: 20,
              },
              selectedIcon: {
                Component: Ionicons,
                iconName: "ios-checkmark-circle-outline",
                color: "white",
                bg: "#0eb14970",
                size: 26,
              },
              spinnerColor: "black",
              onError: () => {},
              noAssets: () => <View></View>,
              defaultTopNavigator: {
                continueText: "Finish",
                goBackText: "Back",
                selectedText: "Selected",
                midTextColor: "tomato",
                buttonStyle: _buttonStyle,
                buttonTextStyle: _textStyle,
                backFunction: goBack,
                doneFunction: data => onDone(data),
              },
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const _textStyle = {
  color: "white",
}
const _buttonStyle = {
  backgroundColor: "black",
  borderRadius: 18,
}

// if you want to use defaultTopNavigator you must send in basic style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
