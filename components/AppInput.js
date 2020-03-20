import React from "react";
import { TextInput, StyleSheet } from "react-native";
import BaseInput from "./BaseInput";
// ...

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  }
});

const AppInput = ({ children, value, onChange, ...props }) => (
  <BaseInput {...props}>
    <TextInput
      value={value}
      onChangeText={onChange}
      style={styles.inputStyle}
    />
  </BaseInput>
);
export default AppInput;
