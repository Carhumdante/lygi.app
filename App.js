import React from "react";
import { NativeBaseProvider, Center } from 'native-base';
import LoginForm from './components/LoginForm';
import Cafe from './components/Cafe';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeTabigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import 'react-native-gesture-handler';

const BotTab = createBottomTabNavigator();

// function Tab () {
//   return (
//     <BotTab.Navigator initialRouteName = "LoginForm">
//       <BotTab.Screen name = "Login" component = {LoginForm} />
//       <BotTab.Screen name = "Cafe" component = {Cafe} />
//     </BotTab.Navigator>
//   )
// }

//const Tab = createNativeTabigator();

export default function app() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <BotTab.Navigator initialRouteName = "LoginForm">
          <BotTab.Screen name = "Login" component = {LoginForm} />
          <BotTab.Screen name = "Cafe" component = {Cafe} />
        </BotTab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

