import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  baseInput: {
    height: 30,
    marginTop: 20,
    fontSize: 20
  }
});

const BaseInput = ({ children, label }) => (
  <View>
    <Text style={styles.baseInput}>{label}</Text>
    {children}
  </View>
);
export default BaseInput;
