import React from "react";
import { TextInput, StyleSheet } from "react-native";
import BaseInput from "./BaseInput";
// ...

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // height: 40,
    paddingLeft: 10,
    marginTop: 5,
    fontFamily: "OpenSans-Regular",
    backgroundColor: "white"
  }
});

const AppInput = ({
  children,
  value,
  onChange,
  baseInputCustomStyle,
  placeholderValue,

  ...props
}) => (
  <BaseInput {...props} baseInputCustomStyle={baseInputCustomStyle}>
    <TextInput
      placeholder={placeholderValue}
      value={value}
      onChangeText={onChange}
      style={styles.inputStyle}
    />
  </BaseInput>
);
export default AppInput;
