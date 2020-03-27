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

export class PostalCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postalCodePlaceholder: "V5Y2Z7"
    };
  }

  render() {
    const { postalCode, onPostalCodeChange } = this.props;
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
        <TextInput
          value={postalCode}
          onChangeText={onPostalCodeChange}
          placeholder={this.state.postalCodePlaceholder}
          style={styles.inputStyle}
          editable
          autoCompleteType="postal-code"
          textContentType="postalCode"
          maxLength={8}
        />
      </View>
    );
  }
}

export default PostalCode;
