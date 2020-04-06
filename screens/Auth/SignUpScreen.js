import React, { Component } from "react";

// Get API URL
import { API_URL, apiCall } from "../../API";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  AsyncStorage,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Divider } from "react-native-elements";
import UpdateButtonProfileComponent from "../../components/UpdateButtonProfileComponent";

// Google Sign-In Imports
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import { TouchableOpacity } from "react-native-gesture-handler";
import Axios from "axios";

const GOOGLE_IOS_CLIENT_ID =
  "411984942253-8gki5rs2dovqh87j3mhj5auvoheenpv7.apps.googleusercontent.com";
const GOOGLE_ANDROID_CLIENT_ID =
  "411984942253-ibe8053cbtb0oqhbgj1rjlkgc39u9juf.apps.googleusercontent.com";

const FACEBOOK_APP_ID = "504695810471192";
export class SignUpScreen extends Component {
  // Sign In Screen
  state = {
    name: "",
    email: "",
    password: "",
    isPasswordHidden: true,
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
      // const {
      //   type,
      //   token,
      //   expires,
      //   permissions,
      //   declinedPermissions,
      // } = await Facebook.logInWithReadPermissionsAsync({
      //   permissions: ["public_profile", "email"],
      // });

      const test = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      console.log(test);

      // console.log(type);
      // if (type === "success") {
      //   // Get the user's name using Facebook's Graph API + Email
      //   let axiosFBData = {};
      //   let axiosFBEmail = {};
      //   let axiosFBPicture = {};
      // Get Name and ID
      // await Axios.get(`https://graph.facebook.com/me?access_token=${token}`)
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .then((data) => {
      //     axiosFBData = data;
      //   });

      // Get Email
      // await Axios.get(
      //   `https://graph.facebook.com/${axiosFBData.id}?fields=email&access_token=${token}`
      // )
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .then((data) => {
      //     axiosFBEmail = data;
      //   });

      // Get Picture
      // await Axios.get(
      //   `https://graph.facebook.com/${axiosFBData.id}/picture?redirect=false&width=400`
      // )
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .then((data) => {
      //     axiosFBPicture = data.data.url;
      //   });

      // console.log(axiosFBPicture);
      // const userDetails = {
      //   facebook_id: axiosFBData.id,
      //   name: axiosFBData.name,
      //   email: axiosFBEmail.email,
      //   profile_picture_url: axiosFBPicture,
      //   token: token,
      // };

      // If does exist.. update DB and log him/her in! Set stuff in AsyncStorage
      // Axios.get(`${API_URL}/user/${userDetails.email}`).then(async (res) => {
      //   const user = res.data;

      //   if (user) {
      //     // Proceed with the login!
      //     AsyncStorage.setItem("userDetails", JSON.stringify(user));
      //     AsyncStorage.setItem("loginType", "facebook");
      //     this.props.navigation.navigate("Home", { loginType: "facebook" });
      //   } else {
      //     // Take the user to the sign up screen! with details
      //     await AsyncStorage.setItem("signUpType", "facebook");
      //     this.props.navigation.navigate("PreferencesScreenOne", {
      //       ...userDetails,
      //     });
      //   }
      // });
      // } else {
      //   // type === 'cancel'
      // }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  // Chromium Validation
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Initiate Registration
  handleRegistration = () => {
    const { name, email, password } = this.state;

    // Basic Validation
    if (name.length < 2) {
      Alert.alert("Name too short", "Please provide a valid name.");
    } else if (!this.validateEmail(email)) {
      Alert.alert("Invalid Email", "Please provide a valid email.");
    } else if (password.length < 5) {
      Alert.alert(
        "Password short",
        "Password should be at least 5 characters long."
      );
    } else if (
      this.validateEmail(email) &&
      password.length > 5 &&
      name.length > 2
    ) {
      // Check with DB if email is taken, or else proceed if fields are valid (Password: Strong; Name: Legible Enough)
      Axios.get(`${API_URL}/user/${email}`)
        .then(async (res) => {
          if (res.data.userExists) {
            Alert.alert("Account Exists", `Please sign in.`, [
              {
                text: "Sign In",
                onPress: () => this.props.navigation.navigate("SignIn"),
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ]);
          } else {
            // Okay to Sign Up, Proceed with Sign Up
            await AsyncStorage.setItem("signUpType", "email");
            this.props.navigation.navigate("PreferencesScreenOne", {
              name: name,
              email: email,
              password: password,
            });
          }
        })
        .catch((err) => console.log("Error:", err));
    } else {
      Alert.alert("Something went wrong", "Please try again.");
    }

    // Navigate with Data to next screen
    // this.props.navigation.navigate("PreferencesScreenOne");
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
              resizeMode: "contain",
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
                  color: "#383940",
                }}
                placeholder="Monica Geller"
                autoCompleteType="name"
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
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
                  fontSize: 15,
                }}
                placeholder="monicageller@example.com"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
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
                  fontSize: 15,
                }}
                placeholder="Y0urS3cur3p@ssw0rd"
                autoCompleteType="password"
                secureTextEntry={isPasswordHidden}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              />
            </View>

            {/* Button for Sign Up */}
            <UpdateButtonProfileComponent
              buttonText="Sign Up"
              customStyle={{ marginTop: 40, marginBottom: 30 }}
              onPressUpdate={this.handleRegistration}
            />
          </View>

          <View style={styles.continueTextContainer}>
            <Text style={styles.continueText}>or contine with</Text>
          </View>
          {/* Social Sign Up Buttons - Start */}
          <View style={styles.socialButtonContainer}>
            {/* Google social button */}
            <TouchableOpacity onPress={this.signInWithGoogle}>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("../../assets/images/google.png")}
              />
            </TouchableOpacity>

            {/* Facebook social button */}
            <TouchableOpacity onPress={this.signInWithFacebook}>
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/images/facebook.png")}
              />
            </TouchableOpacity>

            {/* Twitter social button */}
            <TouchableOpacity onPress={this.signInWithGoogle}>
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/images/twitter.png")}
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
              navigation.navigate("SignIn");
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
                Already have an account?{" "}
              </Text>
              <Text style={styles.underLineText}>Login</Text>
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
                marginTop: 25,
              }}
            >
              <Text style={styles.underLineText}>Skip to Donate</Text>
            </View>
          </TouchableOpacity>
          {/* <Image
            style={{ width: 70, height: 70 }}
            source={require("../../assets/images/fb.png")}
          /> */}
        </View>
        {/* Bottom Container - Ends */}
        {/* <img
          src={FacebookIcon}
          // className="choose-preference-svg"
          height={50}
          width={50}
          viewBox="0 0 60 100"
        /> */}
      </View>
      // <- Main Container
    );
  }
}

SignUpScreen.navigationOptions = {
  title: "Sign Up for Outreach",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },

  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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

  socialSignInButton: {
    width: 75,
    height: 40,
    backgroundColor: "red",
    borderRadius: 10,
  },
  middleContainer: {
    flex: 1,
    marginTop: 25,
  },
  bottomContainer: {
    height: 200,
  },
  topContainer: {
    alignItems: "center",
  },

  continueText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    marginBottom: 8,
  },
  underLineText: {
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
    color: "#383940",
    fontFamily: "Quicksand-Bold",
    color: "#F27821",
  },

  underLineTextContainer: {
    flexDirection: "row",
    marginTop: 40,
  },

  textWithIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F27821",
  },

  textWithNameIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
  },

  textWithEmailIconPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F27821",
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginTop: 18,
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
});

// Exporting
export default SignUpScreen;
