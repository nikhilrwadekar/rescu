import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import MainTabNavigator from "./MainTabNavigator";

// The Auth Screen/Component Stack
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    // Here Auth would mean our 'Sign In' page
    Auth: AuthStack
  })
);
