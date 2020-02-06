import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class HomeTwoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> HomeTwoScreen </Text>
        <Button
          title="Go Back"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

HomeTwoScreen.navigationOptions = {
  title: "Home Two"
};
