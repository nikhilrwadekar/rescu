import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class PreferencesScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text> Preferences - Address + Avalability </Text>
        <Button
          title="Next"
          onPress={() => {
            navigation.navigate("PreferencesScreenTwo");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
