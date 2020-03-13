import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ToastAndroid
} from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import ProfileOption from "../../../components/AssignedVolunteerings";
import AvailabilityToggleComponent from "../../../components/AvailabilityToggleComponent";
const profilePicture = require("../../../assets/images/young-lady.jpg");

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: true
    };
  }

  // Assigned Volunteerings
  handleAssignedVolunteeringsPress = () => {
    this.props.navigation.navigate("Tasks");
  };

  //Edit Preferences
  handleEditPreferencesPress = () => {
    this.props.navigation.navigate("EditPreferences");
  };

  //Donate
  handleDonatePress = () => {
    this.props.navigation.navigate("DisasterList");
  };

  //Terms & Conditions
  handleTermsAndConditionsPress = () => {
    this.props.navigation.navigate("Terms");
  };
  render() {
    const { isAvailable } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        <ProfileHeader
          buttonText="Edit Profile"
          imageUrl={profilePicture}
          onPressEditProfile={this.handleEditProfile}
          key="1"
          fName="Someone Here"
        />

        <AvailabilityToggleComponent
          availabilityText="Availability"
          onToggleChange={isAvailable => {
            ToastAndroid.showWithGravityAndOffset(
              "A wild toast appeared!",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
            this.setState({ isAvailable });
          }}
          switchValue={isAvailable}
        />
        {/* Removed after discussion as it is redundant */}
        {/* <ProfileOption
          buttonText="Assigned Volunteerings"
          onOptionPressed={this.handleAssignedVolunteeringsPress}
        /> */}
        <ProfileOption
          buttonText="Edit Preferences"
          onOptionPressed={this.handleEditPreferencesPress}
        />
        <ProfileOption
          buttonText="Donate"
          onOptionPressed={this.handleDonatePress}
        />
        <ProfileOption
          buttonText="Terms & Conditions"
          onOptionPressed={this.handleTermsAndConditionsPress}
        />
        {/* Logout */}
        <Button
          title="Logout"
          onPress={() => {
            Alert.alert(
              "Logout",
              "Do you really want to logout?",
              [
                {
                  text: "Yes, please.",
                  onPress: () => navigation.navigate("SignIn")
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                }
                // { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
          }}
        />
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Your Profile"
};

const styles = StyleSheet.create({});
