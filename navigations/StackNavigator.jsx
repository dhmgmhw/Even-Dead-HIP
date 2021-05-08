import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import TabNavigator from "./TabNavigator"
import SignInPage from "../pages/login/SignInPage"
import SignPlusPage from "../pages/login/SignPlusPage"
import PostDetailPage from "../pages/home/PostDetailPage"
import ChatPage from "../pages/chat/ChatPage"
import AddPage from "../pages/home/AddPage"
import OurTownPage from "../pages/home/OurTownPage"
import MultiAddPage from "../pages/home/MultiAddPage"

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="SignInPage" component={SignInPage} /> */}
      {/* <Stack.Screen name="SignPlusPage" component={SignPlusPage} /> */}
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="OurTownPage" component={OurTownPage} />
      <Stack.Screen name="MultiAddPage" component={MultiAddPage} />
      <Stack.Screen name="PostDetailPage" component={PostDetailPage} />
      <Stack.Screen name="ChatPage" component={ChatPage} />
      <Stack.Screen name="AddPage" component={AddPage} />
    </Stack.Navigator>
  )
}

export default StackNavigator
