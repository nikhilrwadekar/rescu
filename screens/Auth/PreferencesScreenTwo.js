import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class PreferencesScreenTwo extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text> Preferences - Type + Additional Skill </Text>
        <Button
          title="Save"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
