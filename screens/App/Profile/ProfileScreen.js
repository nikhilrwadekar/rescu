import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import ProfileOption from "../../../components/AssignedVolunteerings";
const profilePicture = require("../../../assets/images/young-lady.jpg");
export default class ProfileScreen extends Component {
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

        {/* Logout */}
        <Button
          title="Logout"
          onPress={() => {
            navigation.navigate("SignIn");
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
