import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  baseInput: {
    // paddingBottom: 10,
    // height: 30
  },
  textLabel: {
    fontFamily: "OpenSans-Regular",
    fontSize: 17,
    fontWeight: "100"
  }
});

const BaseInput = ({ children, label, baseInputCustomStyle }) => (
  <View style={[styles.baseInput, baseInputCustomStyle]}>
    <Text style={styles.textLabel}>{label}</Text>
    {children}
  </View>
);
export default BaseInput;
