import React, { Component } from "react";
import { Text, View } from "react-native";

export class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text> This is Profile Screen </Text>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Profile Screen"
};

export default ProfileScreen;

