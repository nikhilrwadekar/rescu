import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Divider, SocialIcon, Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Google Sign-In Imports
import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
  "458548322242-e39hntvdf192d6n9d34eei2p6lror4gl.apps.googleusercontent.co";
const ANDROID_CLIENT_ID =
  "458548322242-ul355ju06tuq252kfnk5endjor0lala5.apps.googleusercontent.com";

export class SignInScreen extends Component {
  // Sign In Screen
  state = {
    email: "",
    password: "",
    isPasswordHidden: true
  };

  // Google + Expo - OAuth
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        // Get Profile Information and Email from Google
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        // If success, Navigate to Home Screen with user's information
        this.props.navigation.navigate("Home", {
          username: result.user.givenName,
          user: result.user
        });

        // Return the Access Token
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("Error! - ", e);
      return { error: true };
    }
  };

  render() {
    const { navigation } = this.props;
    const { isPasswordHidden, email, password } = this.state;
    return (
      // Main Container ->
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain"
            }}
            source={require("../../assets/images/outreach_logo.png")}
          ></Image>
        </View>

        {/* Vertically Centered Container - Starts */}
        <View style={styles.middleContainer}>
          <View>
            <View style={styles.textWithIconPlaceholder}>
              <Icon style={styles.iconPlaceHolder} size={20} name="envelope" />
              <TextInput
                style={{ height: 40 }}
                placeholder="Email"
                autoCompleteType="username"
                keyboardType="email-address"
                onChangeText={text => this.setState({ email })}
                value={this.state.text}
              />
            </View>
            <View style={styles.textWithIconPlaceholder}>
              <Icon
                style={styles.iconPlaceHolder}
                size={25}
                name="unlock-alt"
              />

              <TextInput
                style={{ height: 40 }}
                placeholder="Password"
                autoCompleteType="password"
                secureTextEntry={isPasswordHidden}
                onChangeText={text => this.setState({ password })}
                value={this.state.text}
              />
            </View>
            <Button
              title="Login with Email"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <Divider style={{ backgroundColor: "blue" }} />
          </View>
          {/* Social Login Buttons - Start */}

          <View style={styles.continueTextContainer}>
            <Text style={styles.continueText}>or login with</Text>
          </View>

          <View style={styles.socialButtonContainer}>
            {/* <SocialIcon onPress={this.signInWithGoogle} raised type="google" />
            <SocialIcon raised type="facebook" /> */}
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
            {/* <Button
              icon={<Icon name="twitter" size={25} color="#3a3a3a" />}
              style={styles.socialSignInButton}
              onPress={this.signInWithGoogle}
              type="outline"
            /> */}
          </View>
          {/* Social Login Buttons - End */}
        </View>
        {/* Vertically Centered Container - Ends */}
        {/* Bottom Container - Starts */}
        <View style={styles.bottomContainer}>
          {/* Go Back to Login */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.underLineText}>Create account</Text>
            </View>
          </TouchableOpacity>

          {/* Skip to Donate */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DisasterList");
            }}
          >
            <View style={styles.underLineTextContainer}>
              <Text style={styles.underLineText}>Skip to Donate</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Bottom Container - Ends */}
      </View>
      // <- Main Container
    );
  }
}

SignInScreen.navigationOptions = {
  title: "Outreach"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  socialButtonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 25,
    marginBottom: 25
  },
  socialSignInButton: {
    // flex: 1,
    width: 75,
    height: 75
  },
  topContainer: {
    alignItems: "center"
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center"
  },
  bottomContainer: {
    marginBottom: 36,

    height: 200,
    justifyContent: "space-around"
  },
  underLineTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  underLineText: {
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center"
  },
  continueTextContainer: {
    marginTop: 30
  },
  continueText: {
    fontSize: 20,
    textAlign: "center"
  },
  textWithIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconPlaceHolder: {
    width: 30
  }
});

export default SignInScreen;
