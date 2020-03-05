import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainTabNavigator from "./MainTabNavigator";
import DonateScreen from "../screens/Donate/ScreenOne";

// Auth Screens
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import PreferencesScreenOne from "../screens/Auth/PreferencesScreenOne";
import PreferencesScreenTwo from "../screens/Auth/PreferencesScreenTwo";

// The Auth Screen/Component Stack
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  PreferencesScreenOne: PreferencesScreenOne,
  PreferencesScreenTwo: PreferencesScreenTwo
});
// The Anonymous Stack
const DonateStack = createStackNavigator({
  Donate: DonateScreen
  // Add more screens here..
});

export default createAppContainer(
  createSwitchNavigator({
    // App Entry Point
    Auth: AuthStack,

    // App after Successful Sign In
    Main: MainTabNavigator,

    // Anonymous Donate Flow
    Donate: DonateStack
  })
);
