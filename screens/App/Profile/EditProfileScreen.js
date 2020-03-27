import React, { Component } from "react";

// React Native
import { Text, StyleSheet, View, Alert, ScrollView } from "react-native";

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
      <ScrollView>
        <View style={{ marginLeft: 20, marginRight: 20, paddingTop: 30 }}>
          {/* Profile Photo */}
          <View style={{ marginBottom: 30 }}>
            <ProfileHeader
              imageUrl={{ uri: "https://i.pravatar.cc/300" }}
              // onPressEditProfile={this.handleEditProfile}
              key="1"
              fName={this.state.fullName}
            />
          </View>

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
            customStyle={{ marginTop: 10, marginBottom: 40 }}
            onPressUpdate={() =>
              Alert.alert("Profile information was updated!")
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appInputStyle: { marginBottom: 20 }
});
