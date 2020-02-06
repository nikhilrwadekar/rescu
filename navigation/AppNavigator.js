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
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    // Here Auth would mean our 'Sign In' page
    Auth: AuthStack,
    AnonymousDonate: AnonymousDonateStack
  })
);
