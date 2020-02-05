import React, { Component } from "react";
import { Text, View } from "react-native";

export default class NotificationScreen extends Component {
  render() {
    return (
      <View>
        <Text> This is the Notification Screen </Text>
      </View>
    );
  }
}

// Navigator Options for the Screen, In this example we've set the Title
NotificationScreen.navigationOptions = {
  title: "Notifications"
};
