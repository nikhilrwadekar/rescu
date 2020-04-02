import React, { Component } from "react";

// React Native
import {
  Text,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  AsyncStorage
} from "react-native";

// Custom Components
import AppInput from "../../../components/AppInput";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";
import ProfileHeader from "../../../components/ProfileHeader";
import Axios from "axios";
import { API_URL } from "../../../API";

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      phoneNumber: ""
    };
  }

  componentDidMount = async () => {
    // Email Login Details
    await AsyncStorage.getItem("userDetails", (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        // Parse User Details
        const userDetails = JSON.parse(result);

        // Map it to the desired state key + save userDetails
        this.setState({
          userDetails,
          id: userDetails._id,
          fullName: userDetails.name,
          email: userDetails.email,
          photoURL: userDetails.profile_picture_url
        });
      }
    });
  };

  // Handle Change - Full Name
  handleFullNameChange = fullName => {
    this.setState({ fullName });
  };

  // Handle Change - Phone Number
  handlePhoneNumberChange = phoneNumber => {
    this.setState({ phoneNumber });
  };

  // Handle Update
  handleProfileInfoUpdate = () => {
    const { id, fullName, email, phoneNumber } = this.state;

    // Construct the Object to update user in DB
    const userEditedDetails = {
      name: fullName,
      email: email,
      phone_number: phoneNumber
    };

    let userDetails = { ...this.state.userDetails };
    userDetails.name = fullName;
    if (phoneNumber.length >= 10) userDetails.phone_number = phoneNumber;

    // Try to update..
    Axios.put(`${API_URL}/user/id/${id}`, userEditedDetails)
      .then(res => {
        if (res.status == 200) {
          // If udpated.. Alert user and update Async Storage!
          AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
          Alert.alert("Updated", "Profile information was updated!");

          this.props.navigation.state.params.onNavigateBack(userEditedDetails);

          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        // If not.. inform user
        Alert.alert("Something went wrong", "Please try again.");
      });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ marginLeft: 20, marginRight: 20, paddingTop: 30 }}>
          {/* Profile Photo */}
          <View style={{ marginBottom: 30 }}>
            <ProfileHeader
              imageUrl={{ uri: this.state.photoURL }}
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
            onChange={this.handlePhoneNumberChange}
          />

          {/* Update Profile Settings */}
          <UpdateButtonProfileComponent
            buttonText="Update"
            customStyle={{ marginTop: 10, marginBottom: 40 }}
            onPressUpdate={this.handleProfileInfoUpdate}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appInputStyle: { marginBottom: 20 }
});
