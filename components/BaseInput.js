import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  baseInput: {
    // paddingBottom: 10,
    // height: 30
  },
  textLabel: {
    fontFamily: "OpenSans-Light",
    fontSize: 17,
    fontWeight: "100"
  }
});

const BaseInput = ({ children, label }) => (
  <View style={styles.baseInput}>
    <Text style={styles.textLabel}>{label}</Text>
    {children}
  </View>
);
export default BaseInput;
