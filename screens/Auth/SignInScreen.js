import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Divider } from "react-native-elements";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Google Sign-In Imports
import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
  "458548322242-e39hntvdf192d6n9d34eei2p6lror4gl.apps.googleusercontent.co";
const ANDROID_CLIENT_ID =
  "458548322242-ul355ju06tuq252kfnk5endjor0lala5.apps.googleusercontent.com";

export class SignInScreen extends Component {
  state = {
    email: "",
    password: "",
    isPasswordHidden: true
  };

  // Google OAuth
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        this.props.navigation.navigate("Home", {
          username: result.user.givenName,
          user: result.user
        }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  render() {
    const { navigation } = this.props;
    const { isPasswordHidden, email, password } = this.state;
    return (
      // Main Container ->
      <View style={styles.container}>
        {/* Vertically Centered Container - Starts */}
        <View style={styles.middleContainer}>
          <View>
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
              title="Login with Email"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <Divider style={{ backgroundColor: "blue" }} />
          </View>
          {/* Social Login Buttons - Start */}
          <View style={styles.socialButtonContainer}>
            <Button
              icon={<Icon name="google" size={25} color="#3a3a3a" />}
              style={styles.socialSignInButton}
              onPress={this.signInWithGoogle}
              type="outline"
            />
            <Button
              icon={<Icon name="facebook" size={25} color="#3a3a3a" />}
              style={styles.socialSignInButton}
              onPress={this.signInWithGoogle}
              type="outline"
            />
            <Button
              icon={<Icon name="twitter" size={25} color="#3a3a3a" />}
              style={styles.socialSignInButton}
              onPress={this.signInWithGoogle}
              type="outline"
            />
          </View>
          {/* Social Login Buttons - End */}
        </View>
        {/* Vertically Centered Container - Ends */}
        {/* Bottom Container - Starts */}
        <View style={styles.bottomContainer}>
          <Button
            style={styles.donateButton}
            title="Sign Up"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
          <Button
            style={styles.donateButton}
            title="Donate Now"
            onPress={() => {
              navigation.navigate("DisasterList");
            }}
          />
        </View>
        {/* Bottom Container - Ends */}
      </View>
      // <- Main Container
    );
  }
}

SignInScreen.navigationOptions = {
  title: "Rescu"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
    // backgroundColor: "#f00"
  },
  socialButtonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    marginBottom: 25
  },
  socialSignInButton: {
    // flex: 1,
    width: 75,
    height: 75
  },
  middleContainer: {
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "center"
  },
  bottomContainer: {
    // flex: 1,
    // justifyContent: "flex-end",
    marginBottom: 36
    // backgroundColor: "#0f0"
    // alignSelf: "flex-end"
    // height: 200
  }
});

export default SignInScreen;
