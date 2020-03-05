import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import pic from "../../../assets/images/profile.png";
import ConfirmDeclineNotificationComponent from "../../../components/ConfirmDeclineNotificationComponent";

import ProfileOption from "../../../components/AssignedVolunteerings";
const profilePicture = require("../../../assets/images/young-lady.jpg");
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: pic,
      buttonText: "Edit Profile"
    };
  }
  // Edit Profile Function
  onPressEditProfile = () => {
    this.setState({
      buttonText: "Text Changed"
    });
  };

  // Assigned Volunteerings
  handleAssignedVolunteeringsPress = () => {
    console.log("Assigned Volunteerings!");
  };

  //Edit Preferences
  handleEditPreferencesPress = () => {
    console.log("Edit Preferences!");
  };

  //Donate
  handleDonatePress = () => {
    console.log("Donate!");
  };

  //Terms & Conditions
  handleTermsAndConditionsPress = () => {
    console.log("T&C!");
  };
  render() {
    return (
      <View>
        <ProfileHeader
          buttonText="Edit Profile"
          imageUrl={profilePicture}
          onPressEditProfile={this.handleEditProfile}
          key="1"
          fName="Someone Here"
        />

        <ProfileOption
          buttonText="Assigned Volunteerings"
          onOptionPressed={this.handleAssignedVolunteeringsPress}
        />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({});
