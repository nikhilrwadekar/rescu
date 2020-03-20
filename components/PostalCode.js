import React from "react";

import { View, StyleSheet, TextInput, Text } from "react-native";

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 45
  }
});

function UselessTextInput(props) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      autoCompleteType="postal-code"
      textContentType="postalCode"
      maxLength={8}
    />
  );
}

export class PostalCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={{ paddingRight: 40, paddingLeft: 40, marginTop: 24 }}>
        <Text
          style={{
            fontFamily: "OpenSans-Light",
            fontSize: 17
          }}
        >
          Postal Code
        </Text>
        <UselessTextInput
          placeholder={this.state.placeholderPostalCode}
          onChangeText={value => {
            this.setState({
              PostalCode: value
            });
          }}
          value={this.state.PostalCode}
          style={styles.inputStyle}
        />
      </View>
    );
  }
}

export default PostalCode;
