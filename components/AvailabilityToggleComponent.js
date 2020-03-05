import React from "react";
import { Text, View, Switch, StyleSheet } from "react-native";

const AvailabilityToggleComponent = ({
  switchValue,
  availabilityText,
  onToggleChange
}) => (
  <View style={styles.container}>
    <Text style={styles.availabilityTextLabel}>{availabilityText}</Text>

    <Switch value={switchValue} onValueChange={onToggleChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20
  },
  availabilityTextLabel: {
    fontSize: 20
  }
});

export default AvailabilityToggleComponent;
