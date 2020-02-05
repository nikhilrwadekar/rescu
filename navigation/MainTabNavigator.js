import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";

// Our Tabs for the App - HomeScreen, ProfileScreen, DonateScreen, NotificationScreen
import HomeScreen from "../screens/App/Home/HomeScreen";
import ProfileScreen from "../screens/App/Profile/ProfileScreen";
import DonateScreen from "../screens/App/Donate/DonateScreen";
import NotificationScreen from "../screens/App/Notifications/NotificationScreen";
import HomeTwoScreen from "../screens/App/Home/HomeTwoScreen";

// Config for something
const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

// First TAB : Home
// The Stack of Screens for 'Home' TAB
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    // Add more screens here!
    HomeTwo: HomeTwoScreen
  },
  config
);

// The TAB
HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

HomeStack.path = "";

// Second TAB: Profile

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

ProfileStack.path = "";

// Third TAB: Donate
const DonateStack = createStackNavigator(
  {
    Donate: DonateScreen
  },
  config
);

DonateStack.navigationOptions = {
  tabBarLabel: "Donate",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-card" : "md-card"}
    />
  )
};

DonateStack.path = "";

// Fourth TAB: Notifications
const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen
  },
  config
);

NotificationStack.navigationOptions = {
  tabBarLabel: "Notifications",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-notifications" : "md-notifications"}
    />
  )
};

NotificationStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  DonateStack,
  NotificationStack
});

tabNavigator.path = "";

export default tabNavigator;
