import React, { Component } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export class SignInScreen extends Component {
  state = {
    email: "",
    password: "",
    isPasswordHidden: true
  };

  render() {
    const { navigation } = this.props;
    const { isPasswordHidden, email, password } = this.state;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Email"
            autoCompleteType="username"
            keyboardType="email-address"
            onChangeText={text => this.setState({ email })}
            value={this.state.text}
          />

          <TextInput
            style={{ height: 40 }}
            placeholder="Password"
            autoCompleteType="password"
            secureTextEntry={isPasswordHidden}
            onChangeText={text => this.setState({ password })}
            value={this.state.text}
          />

          <Button
            title="LOGIN"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <Button
            title="Donate Now"
            onPress={() => {
              navigation.navigate("AnonymousDonate");
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SignInScreen.navigationOptions = {
  title: "Sign In Screen"
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "flex-end"
  }
});

export default SignInScreen;
