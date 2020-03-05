import React from "react";
import { Text, View, CheckBox, StyleSheet } from "react-native";

const AcceptTermsConditionsComponent = ({
  textAcceptTermsConditions,
  checkboxValue,
  onCheckboxButton
}) => (
  <View style={styles.container}>
    <CheckBox value={checkboxValue} onChange={onCheckboxButton} />
    <Text style={styles.textLabel}>{textAcceptTermsConditions}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 40,
    marginLeft: 40
  },
  textLabel: {
    fontSize: 20
  }
});

export default AcceptTermsConditionsComponent;
