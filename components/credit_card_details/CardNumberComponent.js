import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import AppInput from "../AppInput";

export default class CardNumberComponent extends Component {
  state = {
    creditCardNumber: ""
  };

  render() {
    const { creditCardNumber } = this.state;
    return (
      <View style={{ flex: 1, paddingRight: 40, paddingLeft: 40 }}>
        <AppInput
          label="Credit Card Number"
          value={creditCardNumber}
          onChange={creditCardNumber => this.setState({ creditCardNumber })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
