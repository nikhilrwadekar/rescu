import React, { Component } from "react";
import { Text, View } from "react-native";

export class DonateScreen extends Component {
  render() {
    return (
      <View>
        <Text> Donate Screen </Text>
      </View>
    );
  }
}

DonateScreen.navigationOptions = {
  title: "Donate"
};

export default DonateScreen;
