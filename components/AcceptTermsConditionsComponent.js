import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

const AcceptTermsConditionsComponent = ({
  textAcceptTermsConditions,
  checkboxValue,
  onCheckboxValueChange
}) => (
  <View style={styles.container}>
    <CheckBox checked={checkboxValue} onPress={onCheckboxValueChange} />
    <Text style={styles.textLabel}>{textAcceptTermsConditions}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center"
    // marginRight: 40,
    // marginLeft: 40
  },
  textLabel: {
    fontSize: 20
  }
});

export default AcceptTermsConditionsComponent;
