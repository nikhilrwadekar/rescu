import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Divider } from "react-native-elements";
import UpdateButtonProfileComponent from "../../components/UpdateButtonProfileComponent";

// Google Sign-In Imports
import * as Google from "expo-google-app-auth";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        {/* Top Container for Logo */}
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
            <View style={styles.textWithNameIconPlaceholder}>
              <Icon
                style={styles.iconPlaceHolder}
                size={20}
                name="user"
                color="#383940"
              />
              <TextInput
                style={{
                  height: 40,
                  width: 320,
                  fontFamily: "OpenSans-Regular",
                  fontSize: 15,
                  alignSelf: "center",
                  paddingLeft: 10,
                  color: "#383940"
                }}
                placeholder="Monica Geller"
                autoCompleteType="name"
                onChangeText={text => this.setState({ name })}
                value={this.state.text}
              />
            </View>

            <View style={styles.textWithEmailIconPlaceholder}>
              <Icon
                style={styles.iconPlaceHolder}
                size={20}
                name="envelope"
                color="#383940"
              />
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
              <Icon
                style={styles.iconPlaceHolder}
                size={20}
                name="lock"
                color="#383940"
              />
              <TextInput
                style={{
                  height: 40,
                  width: 320,
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

            {/* Button for Sign Up */}
            <UpdateButtonProfileComponent
              buttonText="Sign Up"
              customStyle={{ marginTop: 40, marginBottom: 30 }}
              onPressUpdate={() => {
                navigation.navigate("PreferencesScreenOne");
              }}
            />
          </View>

          <View style={styles.continueTextContainer}>
            <Text style={styles.continueText}>or login with</Text>
          </View>
          {/* Social Sign Up Buttons - Start */}
          <View style={styles.socialButtonContainer}>
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
              navigation.navigate("SignIn");
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
                Already have an account?{" "}
              </Text>
              <Text style={styles.underLineText}>Login</Text>
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
  title: "Sign Up for Outreach"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },

  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
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
  },

  socialSignInButton: {
    width: 75,
    height: 40,
    backgroundColor: "red",
    borderRadius: 10
  },
  middleContainer: {
    flex: 1,
    marginTop: 25
  },
  bottomContainer: {
    height: 200
  },
  topContainer: {
    alignItems: "center"
  },

  continueText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    marginBottom: 8
  },
  underLineText: {
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
    color: "#383940",
    fontFamily: "Quicksand-Bold",
    color: "#F27821"
  },

  underLineTextContainer: {
    flexDirection: "row",
    marginTop: 40
  },

  textWithIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F27821"
  },

  textWithNameIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50
  },

  textWithEmailIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginTop: 18
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
  }
});

// Exporting
export default SignInScreen;
