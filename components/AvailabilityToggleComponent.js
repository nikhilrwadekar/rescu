import React from "react";
import { Text, View, Switch, StyleSheet } from "react-native";

const AvailabilityToggleComponent = ({ switchValue, availabilityText, onToggleChange }) => (
  <View style={styles.container}>
    <Text>{availabilityText}</Text>

    <Switch value={switchValue} onValueChange={onToggleChange}/>
    
  </View>
);

const styles = StyleSheet.create({
  
});

export default AvailabilityToggleComponent;
