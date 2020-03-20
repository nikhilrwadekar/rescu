import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

const AcceptTermsConditionsComponent = ({
  textAcceptTermsConditions,
  checkboxValue,
  onCheckboxValueChange
}) => (
  <View style={styles.container}>
    <CheckBox
      checked={checkboxValue}
      onPress={onCheckboxValueChange}
      checkedColor="#F27821"
      uncheckedColor="#F27821"
    />
    <Text style={styles.textLabel}>{textAcceptTermsConditions}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 0
  },
  textLabel: {
    fontSize: 15,
    fontFamily: "OpenSans-Light"
  }
});

export default AcceptTermsConditionsComponent;
