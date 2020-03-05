import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text> Sign Up Screen </Text>
        <Button
          title="Next"
          onPress={() => {
            navigation.navigate("PreferencesScreenOne");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
