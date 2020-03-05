import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainTabNavigator from "./MainTabNavigator";

// Auth Screens
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import PreferencesScreenOne from "../screens/Auth/PreferencesScreenOne";
import PreferencesScreenTwo from "../screens/Auth/PreferencesScreenTwo";

// Donate Screens
import DisasterListScreen from "../screens/App/Donate/DisasterListScreen";
import SingleDisasterScreen from "../screens/App/Donate/SingleDisasterScreen";
import DonateScreen from "../screens/App/Donate/DonateScreen";
import DonationSuccessScreen from "../screens/App/Donate/DonateSuccessScreen";

// The Auth Screen/Component Stack
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  PreferencesScreenOne: PreferencesScreenOne,
  PreferencesScreenTwo: PreferencesScreenTwo
});
// The Anonymous Stack
const DonateStack = createStackNavigator({
  DisasterList: DisasterListScreen,
  SingleDisaster: SingleDisasterScreen,
  Donate: DonateScreen,
  // DonationConfirmation: DonationConfirmationScreen
  DonationSuccess: DonationSuccessScreen
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
