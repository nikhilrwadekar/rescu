import React, { Component } from "react";

// React Native
import { Text, StyleSheet, View, Alert } from "react-native";

// Custom Components
import AppInput from "../../../components/AppInput";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";
import ProfileHeader from "../../../components/ProfileHeader";

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "Angel Augustine",
      email: "angelaugustine@example.com",
      phoneNumber: "1237892233"
    };
  }

  // Handle Change - Full Name
  handleFullNameChange = fullName => {
    this.setState({ fullName });
  };

  // Handle Change - Phone Number
  handlePhoneNumberChange = phoneNumber => {
    this.setState({ phoneNumber });
  };

  render() {
    return (
      <View style={{ padding: 25 }}>
        {/* Profile Photo */}
        <ProfileHeader
          imageUrl={{ uri: "https://i.pravatar.cc/300" }}
          // onPressEditProfile={this.handleEditProfile}
          key="1"
          fName={this.state.fullName}
        />

        {/* Full Name */}
        <AppInput
          baseInputCustomStyle={styles.appInputStyle}
          label="Full Name"
          placeholderValue="John Doe"
          value={this.state.fullName}
          onChange={this.handleFullNameChange}
        />

        {/* Email */}
        <AppInput
          baseInputCustomStyle={styles.appInputStyle}
          label="Email Address"
          value={this.state.email}
          placeholderValue="johndoe@example.com"
        />

        {/* Phone Number */}
        <AppInput
          baseInputCustomStyle={styles.appInputStyle}
          label="Phone Number"
          value={this.state.phoneNumber}
          placeholderValue="1236127388"
          onChange={this.handleFullNameChange}
        />

        {/* Update Profile Settings */}
        <UpdateButtonProfileComponent
          buttonText="Update"
          onPressUpdate={() => Alert.alert("Profile information was updated!")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appInputStyle: { marginBottom: 20 }
});
