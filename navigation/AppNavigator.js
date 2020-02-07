import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import MainTabNavigator from "./MainTabNavigator";
import AnonymousDonateScreen from "../screens/AnonymousDonate/ScreenOne";

// The Auth Screen/Component Stack
const AuthStack = createStackNavigator({
  SignIn: SignInScreen
});
// The Anonymous Stack
const AnonymousDonateStack = createStackNavigator({
  AnonymousDonate: AnonymousDonateScreen
  // Add more screens here..
});

export default createAppContainer(
  createSwitchNavigator({
    // LoginSample: { screen: LoginScreen },
    // ProfileSample: { screen: ProfileScreen },

    // App Entry Point
    Auth: AuthStack,

    // App after sign-in
    Main: MainTabNavigator,

    // Anonymous Donate Flow
    AnonymousDonate: AnonymousDonateStack
  })
);
