import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import AppInput from "../AppInput";

export default class ExpirationCVVComponent extends Component {
  state = {
    expiryDate: "",
    cvv: ""
  };

  render() {
    const { expiryDate, cvv } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.expiryLabel}>
          <AppInput
            label="Expiry Date"
            placeholderValue="MM/YY"
            value={expiryDate}
            onChange={expiryDate => this.setState({ expiryDate })}
          />
        </View>

        <View style={styles.cvvLabel}>
          <AppInput
            label="CVV"
            placeholderValue="CVV"
            value={cvv}
            onChange={cvv => this.setState({ cvv })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingRight: 40,
    paddingLeft: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  expiryLabel: {
    width: 180
  },
  cvvLabel: {
    width: 80
  }
});
