import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const AvailabilityTimePreferenceComponent = ({
  timeLabel,
  timeTextPlaceHolder,
  onPressTime
}) => (
  <View style={styles.container}>
    <Text>{timeLabel}</Text>
    <View style={styles.btn}>
      <Button title={timeTextPlaceHolder} onPress={onPressTime} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "40%"
  },
  btn: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 5
  }
});
export default AvailabilityTimePreferenceComponent;
