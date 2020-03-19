import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";

export default class SelectDisaster extends Component {
  onValueChange = value => {
    console.log(`Selected value: ${value}`);
  };
  render() {
    let dropDownValues = [
      {
        value: "Alberta wildfires"
      },
      {
        value: "Quebec, Ontario and New Brunswick floods"
      },
      {
        value: "Westboro station bus crash"
      }
    ];
    return (
      <Dropdown
        label="Disaster List"
        data={dropDownValues}
        onChangeText={value => this.onValueChange(value)}
      />
    );
  }
}
export default SelectDisaster;
