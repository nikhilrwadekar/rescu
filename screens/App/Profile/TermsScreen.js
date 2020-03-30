import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";

export default class TermsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { userDetails: {} };
  }

  async componentDidMount() {}

  render() {
    return (
      <View>
        <Text>Terms & Conditions</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
