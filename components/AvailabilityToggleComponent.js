import React from "react";
import { Text, View, Switch, StyleSheet } from "react-native";

const AvailabilityToggleComponent = ({
  switchValue,
  availabilityText,
  onToggleChange
}) => (
  <View style={styles.container}>
    <Text style={styles.availabilityTextLabel}>{availabilityText}</Text>

    <Switch
      value={switchValue}
      onValueChange={onToggleChange}
      trackColor={{ true: "#F27821", false: "grey" }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 40,
    marginLeft: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.4
  },
  availabilityTextLabel: {
    fontSize: 20,
    fontFamily: "OpenSans-Regular",
    color: "#383940"
  }
});

export default AvailabilityToggleComponent;
