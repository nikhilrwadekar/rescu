import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";

export default class TermsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { userDetails: {} };
  }

  async componentDidMount() {
    // Email Login Details
    if ((await AsyncStorage.getItem("loginType")) == "email") {
      await AsyncStorage.getItem("userDetails", (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          this.setState({ userDetails: JSON.parse(result) });
        }
      });
    }
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state.userDetails)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
