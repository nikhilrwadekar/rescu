import React from "react";

import { View, Text, StyleSheet } from "react-native";

import RNPickerSelect from "react-native-picker-select";
import styles from "react-native-card-animated-modal/src/styles";

export class ProvinceSelector extends React.Component {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      provinceValue: undefined,
      items: [
        {
          label: "British Columbia",
          value: "British Columbia"
        },
        {
          label: "Alberta",
          value: "Alberta"
        },
        {
          label: "Manitoba",
          value: "Manitoba"
        },
        {
          label: "New Brunswick",
          value: "New Brunswick"
        },
        {
          label: "Newfoundland and Labrador",
          value: "Newfoundland and Labrador"
        },
        {
          label: "Northwest Territories",
          value: "Northwest Territories"
        },
        {
          label: "Nova Scotia",
          value: "Nova Scotia"
        },
        {
          label: "Ontario",
          value: "Ontario"
        },
        {
          label: "Prince Edward Island",
          value: "Prince Edward Island"
        },
        {
          label: "Quebec",
          value: "Quebec"
        },
        {
          label: "Saskatchewan",
          value: "Saskatchewan"
        },
        {
          label: "Yukon",
          value: "Yukon"
        }
      ]
    };
  }

  render() {
    // Values
    const { province } = this.props;

    // Handlers
    const { onProvinceChange } = this.props;
    return (
      <View
        style={{
          marginTop: 35,
          justifyContent: "center",
          // alignItems: "center",
          height: 50
        }}
      >
        <Text
          style={{
            fontFamily: "OpenSans-Regular",
            fontSize: 17,
            textAlign: "left"
          }}
        >
          Province
        </Text>
        <RNPickerSelect
          placeholder={{
            label: "Select Province"
          }}
          items={this.state.items}
          onValueChange={onProvinceChange}
          onUpArrow={() => {
            this.inputRefs.name.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
          }}
          style={{ ...pickerSelectStyles }}
          value={province}
          ref={el => {
            this.inputRefs.picker = el;
          }}
          useNativeAndroidPickerStyle={false} //android only
          hideIcon={true}
        />

        <View style={{ paddingVertical: 5 }} />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    backgroundColor: "white",
    color: "black"
  },
  provinceLabel: {
    fontFamily: "OpenSans-Light",
    fontSize: 30
  }
});

export default ProvinceSelector;
