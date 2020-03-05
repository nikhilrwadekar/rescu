import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class SingleDisasterScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text> Single Disaster Screen </Text>
        <Button
          title="Donate"
          onPress={() => {
            navigation.navigate("Donate");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
