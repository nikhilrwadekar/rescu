import React from "react";
import {View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    baseInput: {
      paddingBottom:10
    }
  });
  
  const BaseInput = ({ children, label }) => (
    <View>
      <Text style={styles.baseInput}>{label}</Text>
      {children}
    </View>
  );
  export default BaseInput;