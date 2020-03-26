import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Divider, SocialIcon, Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UpdateButtonProfileComponent from "../../components/UpdateButtonProfileComponent";

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
        await AsyncStorage.setItem(
          "googleSignInDetails",
          JSON.stringify(result)
        );

        this.props.navigation.navigate("Home");

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
            <View style={styles.textWithEmailIconPlaceholder}>
              <Icon style={styles.iconPlaceHolder} size={20} name="envelope" />
              <TextInput
                style={{
                  height: 40,
                  width: 320,
                  paddingLeft: 10,
                  alignSelf: "center",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 15
                }}
                placeholder="monicageller@example.com"
                autoCompleteType="username"
                keyboardType="email-address"
                onChangeText={text => this.setState({ email })}
                value={this.state.text}
              />
            </View>
            <View style={styles.textWithPasswordIconPlaceholder}>
              <Icon style={styles.iconPlaceHolder} size={25} name="lock" />

              <TextInput
                style={{
                  height: 40,
                  width: 320,
                  alignSelf: "center",
                  fontFamily: "OpenSans-Regular",
                  paddingLeft: 10,
                  fontSize: 15
                }}
                placeholder="Password"
                autoCompleteType="password"
                secureTextEntry={isPasswordHidden}
                onChangeText={text => this.setState({ password })}
                value={this.state.text}
              />
            </View>

            {/* Login button */}
            <UpdateButtonProfileComponent
              buttonText="Log In"
              customStyle={{ marginTop: 35, marginBottom: 40 }}
              onPressUpdate={() => {
                navigation.navigate("Home");
              }}
            />
          </View>
          {/* Social Login Buttons - Start */}

          <View style={styles.continueTextContainer}>
            <Text style={styles.continueText}>or login with</Text>
          </View>

          <View style={styles.socialButtonContainer}>
            {/* <SocialIcon onPress={this.signInWithGoogle} raised type="google" />
            <SocialIcon raised type="facebook" /> */}

            <Button
              icon={
                <Icon name="google" size={25} color="white" style={styles.b} />
              }
              style={styles.socialGoogleSignInButton}
              onPress={this.signInWithGoogle}
              type="filled"
            />
            <Button
              icon={<Icon name="facebook" size={25} color="white" />}
              style={styles.socialFacebookSignInButton}
              onPress={this.signInWithGoogle}
              type="filled"
            />
            <Button
              icon={<Icon name="twitter" size={25} color="white" />}
              style={styles.socialTwitterSignInButton}
              onPress={this.signInWithGoogle}
              type="filled"
            />
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
            <View style={styles.underLineTextContainer}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#383940",
                  fontFamily: "OpenSans-Regular"
                }}
              >
                Don't have an account?{" "}
              </Text>
              <Text style={styles.underLineText}>Sign Up</Text>
            </View>
          </TouchableOpacity>

          {/* Skip to Donate */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DisasterList");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 25
                // marginBottom: 45
              }}
            >
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
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  socialSignInButton: {
    width: 75,
    height: 75
  },
  topContainer: {
    alignItems: "center"
  },
  middleContainer: {
    flex: 1
  },
  bottomContainer: {
    height: 200
  },
  underLineTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 0
  },
  underLineText: {
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
    color: "#383940",
    fontFamily: "Quicksand-Bold",
    color: "#F27821"
  },

  continueText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    marginBottom: 8
  },
  textWithEmailIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginTop: 25
  },
  textWithPasswordIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginTop: 18
  },
  iconPlaceHolder: {
    width: 30
  },
  socialGoogleSignInButton: {
    width: 75,
    height: 45,
    backgroundColor: "#D0422A",
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 2
  },
  socialFacebookSignInButton: {
    width: 75,
    height: 45,
    backgroundColor: "#3B5998",
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 2
  },
  socialTwitterSignInButton: {
    width: 75,
    height: 45,
    backgroundColor: "#3995C6",
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 2
  }
});

// Exporting
export default SignInScreen;
