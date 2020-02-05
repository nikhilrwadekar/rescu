import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export class SignInScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text> Sign In Screen! </Text>
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Button
          title="Forgot Password"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}

SignInScreen.navigationOptions = {
  title: "Sign In Screen"
};

export default SignInScreen;
