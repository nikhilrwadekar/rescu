import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class TasksScreen extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

TasksScreen.navigationOptions = {
  title: "Your Tasks"
};

const styles = StyleSheet.create({});
