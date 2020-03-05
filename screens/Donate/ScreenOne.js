import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class ScreenOne extends Component {
  render() {
    return (
      <View>
        <Text> Screen One in Anonymous Donate </Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.navigate("SignIn")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
