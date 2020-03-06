import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import AppInput from "../AppInput";

export default class CardHolderNameComponent extends Component {
  state = {
    cardHolderName: ""
  };

  render() {
    const { cardHolderName } = this.state;
    return (
      <View style={{ flex: 1, paddingRight: 40, paddingLeft: 40 }}>
        <AppInput
          label="Card Holder Name"
          value={cardHolderName}
          onChange={cardHolderName => this.setState({ cardHolderName })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
