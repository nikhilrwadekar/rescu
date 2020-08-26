import React, { Component } from "react";

// Get API URL
import { API_URL, apiCall } from "../../API";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  AsyncStorage,
  Alert,
  SafeAreaView
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Divider, SocialIcon, Input } from "react-native-elements";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UpdateButtonProfileComponent from "../../components/UpdateButtonProfileComponent";

// OAuth Providers + Expo
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

// OAuth + Passport Strategy
import { AuthSession, Linking } from "expo";
import * as WebBrowser from "expo-web-browser";

import Axios from "axios";

const GOOGLE_IOS_CLIENT_ID =
  "411984942253-8gki5rs2dovqh87j3mhj5auvoheenpv7.apps.googleusercontent.com";
const GOOGLE_ANDROID_CLIENT_ID =
  "411984942253-ibe8053cbtb0oqhbgj1rjlkgc39u9juf.apps.googleusercontent.com";

const FACEBOOK_APP_ID = "504695810471192";
export class SignInScreen extends Component {
  // Sign In Screen
  state = {
    email: "davinder@test.com",
    password: "secret",
    isPasswordHidden: true,
    authResult: {},
  };

  // Google + Expo - OAuth (Please Implement Passport)
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        // Get Profile Information and Email from Google
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        // If does exist.. update DB and log him/her in! Set stuff in AsyncStorage
        apiCall("", `/auth/login/google`, "POST", { token: result.accessToken })
          .then((res) => res.data)
          .then(async (userDetails) => {
            // if User if found.. continue to login
            if (userDetails.email) {
              // Proceed with the login!
              await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify(userDetails)
              );
              await AsyncStorage.setItem(
                "accessToken",
                userDetails.accessToken
              );
              await AsyncStorage.setItem("loginType", "google");
              this.props.navigation.navigate("Home", { loginType: "google" });
            } else {
              // Take the user to the sign up screen! with details
              await AsyncStorage.setItem("signUpType", "google");
              this.props.navigation.navigate("PreferencesScreenOne", result);
            }
          })
          .catch((err) => console.log(err));
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

  // Facebook + Expo - OAuth (Please Implement Passport)
  signInWithFacebook = async () => {
    try {
      await Facebook.initializeAsync(FACEBOOK_APP_ID);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        apiCall("", "/auth/login/facebook/", "POST", { token: token })
          .then((res) => res.data)
          .then(async (userDetails) => {
            // if User if found.. continue to login
            if (userDetails.email) {
              // Proceed with the login!
              await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify(userDetails)
              );
              await AsyncStorage.setItem(
                "accessToken",
                userDetails.accessToken
              );
              await AsyncStorage.setItem("loginType", "facebook");
              this.props.navigation.navigate("Home", { loginType: "facebook" });
            } else {
              // User not found!
              // Get ID, Name, and Email!
              const meResponse = await Axios.get(
                `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
              );

              const profilePicResponse = await Axios.get(
                `https://graph.facebook.com/${meResponse.data.id}/picture?redirect=false&width=400&type=square`
              );

              // Make User Details ready for Preferences Screen One
              const userDetails = {
                facebook_id: meResponse.data.id,
                name: meResponse.data.name,
                email: meResponse.data.email,
                profile_picture_url: profilePicResponse.data.data.url, // Get this!
                token: token,
              };

              // Take the user to the sign up screen! with details
              await AsyncStorage.setItem("signUpType", "facebook");
              this.props.navigation.navigate(
                "PreferencesScreenOne",
                userDetails
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  // Handle Log In
  handleEmailLogin = async () => {
    // Get Email Password from the State
    const { email, password } = this.state;

    if (!!email && !!password)
      // Post a login request to the Backend
      await Axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      })
        .then((res) => res.data)
        .then(async (data) => {
          if (data.role === "admin")
            Alert.alert(
              "Admin Account",
              "This is an admin account. Please use a volunteer account to use the mobile application."
            );
          else if (data.role === "volunteer") {
            await AsyncStorage.setItem("userDetails", JSON.stringify(data));
            await AsyncStorage.setItem("loginType", "email");
            await AsyncStorage.setItem("accessToken", data.accessToken);
            this.props.navigation.navigate("Home", { loginType: "email" });
          } else if (data.status !== 200) {
            Alert.alert(
              "Could not login",
              "Please make sure credentials are correct."
            );
          }
        })
        .catch((err) => {
          Alert.alert("Could not login", "Something went wrong: " + err);
        });
    else {
      Alert.alert(
        "Invalid Details",
        "Please ensure the details entered are correct."
      );
    }
  };

  render() {
    const { navigation } = this.props;
    const { isPasswordHidden, email, password } = this.state;
    return (
      // Main Container ->
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.topContainer}>
            <Image
              style={{
                // width: 120,
                // height: 120,
                width: wp("35%"),
                height: hp("20%"),
                resizeMode: "contain",
              }}
              source={require("../../assets/images/outreach_logo.png")}
            ></Image>
          </View>

          {/* Vertically Centered Container - Starts */}
          <View style={styles.middleContainer}>
            <View>
              <View style={styles.textWithEmailIconPlaceholder}>
                <Icon
                  style={styles.iconPlaceHolder}
                  size={20}
                  name="envelope"
                />
                <TextInput
                  style={{
                    height: 40,
                    width: "80%",
                    paddingLeft: 10,
                    alignSelf: "center",
                    fontFamily: "OpenSans-Regular",
                    fontSize: 15,
                  }}
                  placeholder="monicageller@example.com"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                />
              </View>
              <View style={styles.textWithPasswordIconPlaceholder}>
                <Icon style={styles.iconPlaceHolder} size={25} name="lock" />

                <TextInput
                  style={{
                    height: 40,
                    width: "80%",
                    alignSelf: "center",
                    fontFamily: "OpenSans-Regular",
                    paddingLeft: 10,
                    fontSize: 15,
                  }}
                  placeholder="Password"
                  autoCompleteType="password"
                  secureTextEntry={isPasswordHidden}
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                />
              </View>

              {/* Login button */}
              <UpdateButtonProfileComponent
                buttonText="Log In"
                customStyle={{ marginTop: 35, marginBottom: "6%" }}
                onPressUpdate={this.handleEmailLogin}
              />
            </View>
            {/* Social Login Buttons - Start */}

            <View style={styles.continueTextContainer}>
              <Text style={styles.continueText}>or continue with</Text>
            </View>

            <View style={styles.socialButtonContainer}>
              {/* <SocialIcon onPress={this.signInWithGoogle} raised type="google" />
            <SocialIcon raised type="facebook" /> */}

              {/* Google social button */}
              <TouchableOpacity onPress={this.signInWithGoogle}>
                <Image
                  style={{ width: 60, height: 65 }}
                  source={require("../../assets/images/google.png")}
                />
              </TouchableOpacity>

              {/* Facebook social button */}
              <TouchableOpacity onPress={this.signInWithFacebook}>
                <Image
                  style={{ width: 70, height: 60 }}
                  source={require("../../assets/images/facebook.png")}
                />
              </TouchableOpacity>
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
                    fontFamily: "OpenSans-Regular",
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
                navigation.navigate("DonateSelectCauseWithoutID", {
                  type: "withoutID",
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 18,
                  // marginBottom: 45
                }}
              >
                <Text style={styles.underLineText}>Skip to Donate</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Bottom Container - Ends */}
        </ScrollView>
      </SafeAreaView>
      // <- Main Container
    );
  }
}

SignInScreen.navigationOptions = {
  title: "Outreach",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialSignInButton: {
    width: 75,
    height: 75,
  },
  topContainer: {
    alignItems: "center",
  },
  middleContainer: {
    flex: 1,
  },
  bottomContainer: {
    height: 200,
  },
  underLineTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%",
  },
  underLineText: {
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
    color: "#383940",
    fontFamily: "Quicksand-Bold",
    color: "#F27821",
  },

  continueText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    marginBottom: 8,
  },
  textWithEmailIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginTop: 25,
  },
  textWithPasswordIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginTop: 18,
  },
  iconPlaceHolder: {
    width: 30,
  },
  socialGoogleSignInButton: {
    width: 75,
    height: 45,
    backgroundColor: "#D0422A",
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  socialFacebookSignInButton: {
    width: 75,
    height: 45,
    backgroundColor: "#3B5998",
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  socialTwitterSignInButton: {
    width: 75,
    height: 45,
    backgroundColor: "#3995C6",
    borderRadius: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

// Exporting
export default SignInScreen;
