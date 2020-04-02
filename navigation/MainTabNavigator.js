import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { TabBarIcon, TabBarFontAwesomeIcon } from "../components/TabBarIcon";

// Our Tabs for the App - HomeScreen, ProfileScreen, TasksScreen, NotificationScreen
import HomeScreen from "../screens/App/Home/HomeScreen";
import TasksScreen from "../screens/App/Tasks/TasksScreen";
import NotificationScreen from "../screens/App/Notifications/NotificationScreen";

// Profile & Following Screens + Donate Screens
import ProfileScreen from "../screens/App/Profile/ProfileScreen";
import EditProfileScreen from "../screens/App/Profile/EditProfileScreen";
import EditPreferencesScreen from "../screens/App/Profile/EditPreferencesScreen";
import TermsScreen from "../screens/App/Profile/TermsScreen";
import DisasterListScreen from "../screens/App/Donate/DisasterListScreen";
import SingleDisasterScreen from "../screens/App/Donate/SingleDisasterScreen";
import DonateScreen from "../screens/App/Donate/DonateScreen";
import DonationSuccessScreen from "../screens/App/Donate/DonateSuccessScreen";

// Config for something
const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

// First TAB : Home
// The Stack of Screens for 'Home' TAB
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
    // Add more screens here!
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

// Last TAB: Profile
const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    EditPreferences: EditPreferencesScreen,
    // Donation with ID
    DonateSelectCauseWithID: DisasterListScreen,
    DonateSingleViewWithID: SingleDisasterScreen,
    DonatePaymentWithID: DonateScreen,
    DonateSuccessWithID: DonationSuccessScreen,
    Terms: TermsScreen
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

// Second TAB: Tasks
const TaskStack = createStackNavigator(
  {
    Tasks: TasksScreen
  },
  config
);

TaskStack.navigationOptions = {
  tabBarLabel: "Tasks",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list" : "md-contact"}
    />
  )
};

TaskStack.path = "";

// Third TAB: Notifications
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
  TaskStack,
  NotificationStack,
  ProfileStack
});

tabNavigator.path = "";

export default tabNavigator;
