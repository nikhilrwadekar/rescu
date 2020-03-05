import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class DonationConfirmationScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text> Donation Confirmation </Text>
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
